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
const sharedEnvironment = {
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
  backend = start("npm", ["run", "mock:strapi"], {
    ...sharedEnvironment,
    NEXT_PUBLIC_ENABLE_MSW: "false",
  });
  await waitForHttp(backendUrl, backend, "controlled mock backend");

  frontend = start(
    "npm",
    ["run", "dev:next", "--", "--hostname", "localhost", "--port", String(frontendPort)],
    sharedEnvironment
  );
  await waitForHttp(`${frontendUrl}/auth/sign-in`, frontend, "Next.js app");

  browser = await chromium.launch({ headless: true });
  console.log("Browser sign-in: checking successful sign-in and safe return navigation.");
  await signInReturnsToRequestedCollectivityPage(browser);
  console.log("Browser sign-in: checking invalid credentials.");
  await signInShowsInvalidCredentials(browser);
  console.log("Browser sign-in: checking pending email confirmation.");
  await signInRoutesPendingAccountsToConfirmation(browser);
  console.log("Browser sign-in: rejecting an external return path.");
  await signInRejectsExternalReturnPath(browser);
  console.log("Browser sign-in: simulating an unavailable authentication backend.");
  await stop(backend);
  backend = null;
  await waitForUnavailable(backendUrl);
  await signInShowsUnavailableBackend(browser);
  console.log(
    "Browser sign-in passed: success, auth errors, confirmation, return paths, and outage feedback."
  );
} catch (error) {
  console.error("Browser sign-in runner failed.");
  console.error("Controlled backend output:\n" + (backend?.output.join("") ?? ""));
  console.error("Next.js output:\n" + (frontend?.output.join("") ?? ""));
  throw error;
} finally {
  await browser?.close();
  await stop(frontend);
  await stop(backend);
}

async function signInReturnsToRequestedCollectivityPage(browser) {
  const context = await browser.newContext();
  try {
    const returnTo = "/collectivity/projects/start?from=browser-sign-in";
    const page = await context.newPage();
    await openSignIn(page, `${frontendUrl}/auth/sign-in?${new URLSearchParams({ returnTo })}`);
    assert.equal(
      await page.getByRole("link", { name: "S'inscrire" }).getAttribute("href"),
      `/auth/sign-up?${new URLSearchParams({ returnTo })}`
    );
    await page.getByLabel("E-mail").fill("demo@example.com");
    await page.getByLabel("Mot de passe").fill("123");

    const signInResponse = page.waitForResponse(
      (response) =>
        new URL(response.url()).pathname === "/api/auth/sign-in" &&
        response.request().method() === "POST"
    );
    await Promise.all([
      signInResponse.then((response) => assert.equal(response.status(), 200)),
      page.getByRole("button", { name: "Connexion" }).click(),
    ]);

    await page.waitForURL((url) => url.pathname === "/collectivity/projects/start");
    assert.equal(new URL(page.url()).searchParams.get("from"), "browser-sign-in");
    assert.ok(
      (await context.cookies(frontendUrl)).some((cookie) => cookie.name === "cc_access_token"),
      "the real same-origin sign-in route should set the access cookie"
    );
  } finally {
    await context.close();
  }
}

async function signInShowsInvalidCredentials(browser) {
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    page.on("request", (request) => {
      if (new URL(request.url()).pathname === "/api/auth/sign-in") {
        console.log(`Browser sign-in request: ${request.method()} ${request.url()}`);
      }
    });
    page.on("requestfailed", (request) => {
      if (new URL(request.url()).pathname === "/api/auth/sign-in") {
        console.log(`Browser sign-in request failed: ${request.failure()?.errorText}`);
      }
    });
    await openSignIn(page, `${frontendUrl}/auth/sign-in`);

    await page.getByLabel("E-mail").fill("demo@example.com");
    await page.getByLabel("Mot de passe").fill("incorrect");
    const responsePromise = page.waitForResponse(
      (response) =>
        new URL(response.url()).pathname === "/api/auth/sign-in" &&
        response.request().method() === "POST",
      { timeout: 15_000 }
    );
    const [response] = await Promise.all([
      responsePromise,
      page.getByRole("button", { name: "Connexion" }).click(),
    ]);

    assert.equal(response.status(), 401);
    await page.getByText("Identifiants invalides.", { exact: true }).waitFor();
    assert.equal(new URL(page.url()).pathname, "/auth/sign-in");
  } finally {
    await context.close();
  }
}

async function signInRoutesPendingAccountsToConfirmation(browser) {
  const context = await browser.newContext();
  try {
    const returnTo = "/collectivity/projects/start?from=pending-sign-in";
    const page = await context.newPage();
    await openSignIn(page, `${frontendUrl}/auth/sign-in?${new URLSearchParams({ returnTo })}`);

    await page.getByLabel("E-mail").fill("pending@example.com");
    await page.getByLabel("Mot de passe").fill("123");
    const responsePromise = page.waitForResponse(
      (response) =>
        new URL(response.url()).pathname === "/api/auth/sign-in" &&
        response.request().method() === "POST"
    );
    const [response] = await Promise.all([
      responsePromise,
      page.getByRole("button", { name: "Connexion" }).click(),
    ]);

    assert.equal(response.status(), 403);
    await page.waitForURL((url) => url.pathname === "/auth/confirm-email");
    const currentUrl = new URL(page.url());
    assert.equal(currentUrl.searchParams.get("email"), "pending@example.com");
    assert.equal(currentUrl.searchParams.get("returnTo"), returnTo);
    await page.getByRole("heading", { name: "Confirmer votre e-mail" }).waitFor();
    await page
      .getByText("Nous avons envoyé un code de vérification à pending@example.com.")
      .waitFor();
  } finally {
    await context.close();
  }
}

async function signInRejectsExternalReturnPath(browser) {
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    const returnTo = "https://outside.example/landing";
    await openSignIn(page, `${frontendUrl}/auth/sign-in?${new URLSearchParams({ returnTo })}`);
    await page.getByLabel("E-mail").fill("demo@example.com");
    await page.getByLabel("Mot de passe").fill("123");
    const responsePromise = page.waitForResponse(
      (response) =>
        new URL(response.url()).pathname === "/api/auth/sign-in" &&
        response.request().method() === "POST",
      { timeout: 15_000 }
    );
    const [response] = await Promise.all([
      responsePromise,
      page.getByRole("button", { name: "Connexion" }).click(),
    ]);

    assert.equal(response.status(), 200);
    await page.waitForURL((url) => url.pathname === "/collectivity");
    assert.equal(new URL(page.url()).origin, frontendUrl);
  } finally {
    await context.close();
  }
}

async function signInShowsUnavailableBackend(browser) {
  const context = await browser.newContext();
  try {
    const returnTo = "/collectivity/projects/start?from=backend-unavailable";
    const page = await context.newPage();
    await openSignIn(page, `${frontendUrl}/auth/sign-in?${new URLSearchParams({ returnTo })}`);
    await page.getByLabel("E-mail").fill("demo@example.com");
    await page.getByLabel("Mot de passe").fill("123");
    const responsePromise = page.waitForResponse(
      (response) =>
        new URL(response.url()).pathname === "/api/auth/sign-in" &&
        response.request().method() === "POST",
      { timeout: 15_000 }
    );
    const [response] = await Promise.all([
      responsePromise,
      page.getByRole("button", { name: "Connexion" }).click(),
    ]);

    assert.equal(response.status(), 503);
    await page
      .getByText(
        "Le service d'authentification est indisponible pour le moment. Veuillez reessayer plus tard.",
        { exact: true }
      )
      .waitFor();
    const currentUrl = new URL(page.url());
    assert.equal(currentUrl.pathname, "/auth/sign-in");
    assert.equal(currentUrl.searchParams.get("returnTo"), returnTo);
  } finally {
    await context.close();
  }
}

async function openSignIn(page, url) {
  page.setDefaultTimeout(15_000);
  page.setDefaultNavigationTimeout(15_000);
  const sessionReady = page.waitForResponse(
    (response) =>
      new URL(response.url()).pathname === "/api/auth/session" &&
      response.request().method() === "GET",
    { timeout: 15_000 }
  );
  await page.goto(url);
  const sessionResponse = await sessionReady;
  assert.equal(sessionResponse.status(), 200, "the real auth provider should load its session");
  await page.getByRole("heading", { name: "Se connecter" }).waitFor();
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
      if (child.output.join("").length > 12000) child.output.shift();
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
