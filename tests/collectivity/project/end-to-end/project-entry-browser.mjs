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
  await waitForHttp(`${frontendUrl}/auth/sign-in`, frontend, "Next.js app");
  browser = await chromium.launch({ headless: true });

  console.log("Project entry: an authenticated user with a Project reaches the project selector.");
  await existingProjectReachesSelector(browser);
  console.log("Project entry: an authenticated user without a Project sees the setup access state.");
  await userWithoutProjectSeesSetupAccess(browser);
  console.log("Browser Project entry passed for users with and without an existing Project.");
} catch (error) {
  console.error("Browser Project entry runner failed.");
  console.error("Controlled backend output:\n" + (backend?.output.join("") ?? ""));
  console.error("Next.js output:\n" + (frontend?.output.join("") ?? ""));
  throw error;
} finally {
  await browser?.close();
  await stop(frontend);
  await stop(backend);
}

async function existingProjectReachesSelector(browser) {
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    await signIn(page, "collectivity.ready@example.com");
    await page.goto(`${frontendUrl}/collectivity/projects/start`);
    await page.waitForURL((url) => url.pathname === "/collectivity/projects");
    await page.getByRole("heading", { name: "Choisissez un projet" }).waitFor();
    await page.getByRole("heading", { name: "Inventaire carbone Grand Sfax" }).waitFor();
    await page.getByRole("link", { name: "Ouvrir le projet" }).waitFor();
  } finally {
    await context.close();
  }
}

async function userWithoutProjectSeesSetupAccess(browser) {
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    await signIn(page, "collectivity.no-inventory@example.com");
    await page.goto(`${frontendUrl}/collectivity/projects/start`);
    await page.waitForURL((url) => url.pathname === "/collectivity/projects/start");
    await page.getByRole("heading", { name: "Créer un projet" }).waitFor();
    await page.getByText("Aucune attribution disponible", { exact: true }).waitFor();
    await page
      .getByText(
        "Vous ne disposez actuellement d’aucune attribution permettant de créer un projet.",
        { exact: true }
      )
      .waitFor();
  } finally {
    await context.close();
  }
}

async function signIn(page, email) {
  page.setDefaultTimeout(15_000);
  page.setDefaultNavigationTimeout(15_000);
  const sessionReady = page.waitForResponse(
    (response) =>
      new URL(response.url()).pathname === "/api/auth/session" &&
      response.request().method() === "GET"
  );
  await page.goto(`${frontendUrl}/auth/sign-in`);
  const sessionResponse = await sessionReady;
  assert.equal(sessionResponse.status(), 200, "the real auth provider should load the session");
  await page.getByRole("heading", { name: "Se connecter" }).waitFor();
  await page.getByLabel("E-mail").fill(email);
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
  assert.equal(response.status(), 200, "sign-in should use the real same-origin API route");
  await page.waitForURL((url) => url.pathname === "/collectivity");
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
