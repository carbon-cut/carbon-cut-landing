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
  await waitForHttp(`${frontendUrl}/auth/sign-up`, frontend, "Next.js app");

  browser = await chromium.launch({ headless: true });
  await registrationRequiresConfirmationAndPreservesReturnPath(browser);
  await confirmationLinksPreserveReturnPath(browser);
  console.log(
    "Browser sign-up passed: registration, resend, invalid and valid confirmation, and safe return paths."
  );
} catch (error) {
  console.error("Browser sign-up runner failed.");
  console.error("Controlled backend output:\n" + (backend?.output.join("") ?? ""));
  console.error("Next.js output:\n" + (frontend?.output.join("") ?? ""));
  throw error;
} finally {
  await browser?.close();
  await stop(frontend);
  await stop(backend);
}

async function registrationRequiresConfirmationAndPreservesReturnPath(browser) {
  const context = await browser.newContext();
  try {
    const email = `browser-signup-${Date.now()}@example.com`;
    const returnTo = "/collectivity/projects/start?from=browser-sign-up";
    const page = await context.newPage();
    page.setDefaultTimeout(15_000);
    page.setDefaultNavigationTimeout(15_000);

    const sessionReady = page.waitForResponse(
      (response) =>
        new URL(response.url()).pathname === "/api/auth/session" &&
        response.request().method() === "GET"
    );
    await page.goto(`${frontendUrl}/auth/sign-up?${new URLSearchParams({ returnTo })}`);
    assert.equal((await sessionReady).status(), 200);
    await page.getByRole("heading", { name: "Creer un compte" }).waitFor();
    assert.equal(
      await page.getByRole("link", { name: "Se connecter" }).getAttribute("href"),
      `/auth/sign-in?${new URLSearchParams({ returnTo })}`
    );

    await page.getByLabel("Nom complet").fill("Browser Signup");
    await page.getByLabel("E-mail").fill(email);
    await page.getByLabel("Mot de passe", { exact: true }).fill("BrowserPassword123!");
    await page.getByLabel("Confirmez le mot de passe").fill("BrowserPassword123!");

    const registrationResponsePromise = page.waitForResponse(
      (response) =>
        new URL(response.url()).pathname === "/api/auth/sign-up" &&
        response.request().method() === "POST"
    );
    const [registrationResponse] = await Promise.all([
      registrationResponsePromise,
      page.getByRole("button", { name: "Créer un compte" }).click(),
    ]);
    assert.equal(registrationResponse.status(), 200);

    await page.waitForURL((url) => url.pathname === "/auth/confirm-email");
    let currentUrl = new URL(page.url());
    assert.equal(currentUrl.searchParams.get("email"), email);
    assert.equal(currentUrl.searchParams.get("returnTo"), returnTo);
    await page.getByRole("heading", { name: "Confirmer votre e-mail" }).waitFor();
    await page.getByText(`Nous avons envoyé un code de vérification à ${email}.`).waitFor();
    await page.getByLabel("Code de confirmation").fill("wrong-code");

    const invalidConfirmationResponsePromise = page.waitForResponse(
      (response) =>
        new URL(response.url()).pathname === "/api/auth/email-confirmation" &&
        response.request().method() === "POST"
    );
    const [invalidConfirmationResponse] = await Promise.all([
      invalidConfirmationResponsePromise,
      page.getByRole("button", { name: "Confirmer l'e-mail" }).click(),
    ]);
    assert.equal(invalidConfirmationResponse.status(), 400);
    await page.getByText("Le code de confirmation est invalide.", { exact: true }).waitFor();

    const resendResponsePromise = page.waitForResponse(
      (response) =>
        new URL(response.url()).pathname === "/api/auth/resend-confirmation" &&
        response.request().method() === "POST"
    );
    const [resendResponse] = await Promise.all([
      resendResponsePromise,
      page.getByRole("button", { name: "Renvoyer l'e-mail" }).click(),
    ]);
    assert.equal(resendResponse.status(), 200);
    await page
      .getByText("Si le compte existe et n'est pas confirme, un nouvel e-mail a ete envoye.", {
        exact: true,
      })
      .waitFor();

    await page.getByLabel("Code de confirmation").fill("123456");
    const confirmationResponsePromise = page.waitForResponse(
      (response) =>
        new URL(response.url()).pathname === "/api/auth/email-confirmation" &&
        response.request().method() === "POST"
    );
    const [confirmationResponse] = await Promise.all([
      confirmationResponsePromise,
      page.getByRole("button", { name: "Confirmer l'e-mail" }).click(),
    ]);
    assert.equal(confirmationResponse.status(), 200);

    await page.waitForURL((url) => url.pathname === "/collectivity/projects/start");
    currentUrl = new URL(page.url());
    assert.equal(currentUrl.searchParams.get("from"), "browser-sign-up");
    assert.ok(
      (await context.cookies(frontendUrl)).some((cookie) => cookie.name === "cc_access_token"),
      "email confirmation through the same-origin route should start a session"
    );
  } finally {
    await context.close();
  }
}

async function confirmationLinksPreserveReturnPath(browser) {
  const context = await browser.newContext();
  try {
    const returnTo = "/collectivity/projects/start?from=confirmation-link";
    const page = await context.newPage();
    page.setDefaultTimeout(15_000);
    await page.goto(
      `${frontendUrl}/auth/confirm-email?${new URLSearchParams({ email: "pending@example.com", returnTo })}`
    );
    await page.getByRole("heading", { name: "Confirmer votre e-mail" }).waitFor();
    assert.equal(
      await page.getByRole("link", { name: "Se connecter" }).getAttribute("href"),
      `/auth/sign-in?${new URLSearchParams({ returnTo })}`
    );
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
