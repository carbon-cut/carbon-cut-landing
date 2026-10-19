import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { setTimeout as delay } from "node:timers/promises";
import { chromium } from "playwright";

const repositoryRoot = process.cwd();
const backendPort = await reservePort();
const frontendPort = await reservePort();
const backendUrl = `http://localhost:${backendPort}`;
const frontendUrl = `http://localhost:${frontendPort}`;
const environment = {
  ...process.env,
  BACKEND_URL: backendUrl,
  FRONTEND_URL: frontendUrl,
  NEXT_PUBLIC_SERVER: backendUrl,
  NEXT_PUBLIC_APP_URL: frontendUrl,
  NEXT_PUBLIC_BASE_PATH: "",
  NEXT_PUBLIC_ENABLE_MSW: "false",
  NEXT_TELEMETRY_DISABLED: "1",
};

let backend;
let frontend;
let browser;

try {
  backend = start("npm", ["run", "mock:strapi"], environment);
  await waitForHttp(backendUrl, backend, "controlled mock backend");

  frontend = start(
    "npm",
    ["run", "dev:next", "--", "--hostname", "localhost", "--port", String(frontendPort)],
    environment
  );
  await waitForHttp(`${frontendUrl}/auth/forgot-password`, frontend, "Next.js app");

  browser = await chromium.launch({ headless: true });
  await forgotPasswordShowsNeutralSuccess(browser);
  await resetLinkChangesPasswordAndUsesSafeDestination(browser);

  await stop(backend);
  backend = null;
  await waitForUnavailable(backendUrl);
  await forgotPasswordShowsBackendUnavailable(browser);

  console.log(
    "Browser password recovery passed: neutral request success, reset link, safe navigation, and backend outage feedback."
  );
} catch (error) {
  console.error("Browser password recovery runner failed.");
  console.error("Controlled backend output:\n" + (backend?.output.join("") ?? ""));
  console.error("Next.js output:\n" + (frontend?.output.join("") ?? ""));
  throw error;
} finally {
  await browser?.close();
  await stop(frontend);
  await stop(backend);
}

async function forgotPasswordShowsNeutralSuccess(browser) {
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    page.setDefaultTimeout(15_000);
    page.setDefaultNavigationTimeout(15_000);
    await page.goto(`${frontendUrl}/auth/forgot-password`);
    await page.getByRole("heading", { name: "Recuperer votre compte" }).waitFor();
    await page.getByLabel("E-mail").fill("demo@example.com");

    const responsePromise = page.waitForResponse(
      (response) =>
        new URL(response.url()).pathname === "/api/auth/forgot-password" &&
        response.request().method() === "POST"
    );
    const [response] = await Promise.all([
      responsePromise,
      page.getByRole("button", { name: "Envoyer" }).click(),
    ]);

    assert.equal(response.status(), 200);
    assert.deepEqual(response.request().postDataJSON(), { email: "demo@example.com" });
    await page.getByText("Consultez votre messagerie", { exact: true }).waitFor();
    await page
      .getByText(
        "Si un compte existe pour cet e-mail, un message de reinitialisation a ete envoye.",
        { exact: true }
      )
      .waitFor();
  } finally {
    await context.close();
  }
}

async function resetLinkChangesPasswordAndUsesSafeDestination(browser) {
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    page.setDefaultTimeout(15_000);
    page.setDefaultNavigationTimeout(15_000);
    const returnTo = "/collectivity/projects/start?from=password-reset";
    const resetUrl = `${frontendUrl}/auth/reset-password?${new URLSearchParams({
      code: "654321",
      returnTo,
    })}`;

    await page.goto(resetUrl);
    await page.getByRole("heading", { name: "Definir un nouveau mot de passe" }).waitFor();
    await page.waitForFunction(() => !new URL(window.location.href).searchParams.has("code"));
    assert.equal(new URL(page.url()).searchParams.get("returnTo"), returnTo);
    assert.equal(page.url().includes("654321"), false, "reset token should leave the address bar");

    const password = "BrowserPassword456!";
    await page.getByLabel("Nouveau mot de passe", { exact: true }).fill(password);
    await page.getByLabel("Confirmez le mot de passe", { exact: true }).fill(password);
    const responsePromise = page.waitForResponse(
      (response) =>
        new URL(response.url()).pathname === "/api/auth/reset-password" &&
        response.request().method() === "POST"
    );
    const [response] = await Promise.all([
      responsePromise,
      page.getByRole("button", { name: "Mettre a jour le mot de passe" }).click(),
    ]);

    assert.equal(response.status(), 200);
    assert.deepEqual(response.request().postDataJSON(), {
      code: "654321",
      password,
      passwordConfirmation: password,
    });
    await page.waitForURL(
      (url) =>
        url.pathname === "/collectivity/projects/start" &&
        url.searchParams.get("from") === "password-reset"
    );
    assert.ok(
      (await context.cookies(frontendUrl)).some((cookie) => cookie.name === "cc_access_token"),
      "reset should establish a session through the same-origin route"
    );
    assert.equal(page.url().includes("654321"), false);
  } finally {
    await context.close();
  }
}

async function forgotPasswordShowsBackendUnavailable(browser) {
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    page.setDefaultTimeout(15_000);
    await page.goto(`${frontendUrl}/auth/forgot-password`);
    await page.getByRole("heading", { name: "Recuperer votre compte" }).waitFor();
    await page.getByLabel("E-mail").fill("demo@example.com");

    const responsePromise = page.waitForResponse(
      (response) =>
        new URL(response.url()).pathname === "/api/auth/forgot-password" &&
        response.request().method() === "POST"
    );
    const [response] = await Promise.all([
      responsePromise,
      page.getByRole("button", { name: "Envoyer" }).click(),
    ]);

    assert.equal(response.status(), 503);
    await page
      .getByText(
        "Le service d'authentification est indisponible pour le moment. Veuillez reessayer plus tard.",
        { exact: true }
      )
      .waitFor();
    assert.equal(await page.getByText("Consultez votre messagerie", { exact: true }).count(), 0);
  } finally {
    await context.close();
  }
}

async function reservePort() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Could not reserve a port");
  await new Promise((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve()))
  );
  return address.port;
}

function start(command, args, env) {
  const child = spawn(command, args, {
    cwd: repositoryRoot,
    env,
    detached: process.platform !== "win32",
    stdio: ["ignore", "pipe", "pipe"],
  });
  child.output = [];
  for (const stream of [child.stdout, child.stderr]) {
    stream.setEncoding("utf8");
    stream.on("data", (chunk) => {
      child.output.push(chunk);
      if (child.output.join("").length > 12_000) child.output.shift();
    });
  }
  return child;
}

async function waitForHttp(url, child, description) {
  const deadline = Date.now() + 120_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`${description} exited before becoming ready:\n${child.output.join("")}`);
    }
    try {
      await fetch(url, { signal: AbortSignal.timeout(2_000) });
      return;
    } catch {
      await delay(250);
    }
  }
  throw new Error(`${description} did not become ready:\n${child.output.join("")}`);
}

async function waitForUnavailable(url) {
  const deadline = Date.now() + 5_000;
  while (Date.now() < deadline) {
    try {
      await fetch(url, { signal: AbortSignal.timeout(500) });
      await delay(100);
    } catch {
      return;
    }
  }
  throw new Error(`Controlled backend is still reachable at ${url} after shutdown`);
}

async function stop(child) {
  if (!child || child.exitCode !== null) return;
  if (process.platform === "win32") child.kill("SIGTERM");
  else process.kill(-child.pid, "SIGTERM");
  await Promise.race([
    new Promise((resolve) => child.once("exit", resolve)),
    delay(5_000).then(() => {
      if (child.exitCode === null) {
        if (process.platform === "win32") child.kill("SIGKILL");
        else process.kill(-child.pid, "SIGKILL");
      }
    }),
  ]);
}
