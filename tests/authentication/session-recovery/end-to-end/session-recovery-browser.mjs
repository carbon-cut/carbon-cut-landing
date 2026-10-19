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
    MOCK_AUTH_REFRESH_DELAY_MS: "800",
  });
  await waitForHttp(backendUrl, backend, "controlled mock backend");

  frontend = start(
    "npm",
    ["run", "dev:next", "--", "--hostname", "localhost", "--port", String(frontendPort)],
    sharedEnvironment
  );
  await waitForHttp(`${frontendUrl}/auth/sign-in`, frontend, "Next.js app");

  browser = await chromium.launch({ headless: true });
  console.log("Browser session recovery: checking pending and successful recovery.");
  await recoversAndReturnsToCollectivity(browser);
  console.log("Browser session recovery: checking rejected refresh.");
  await rejectedRefreshGoesToSignIn(browser);
  console.log("Browser session recovery: checking unavailable backend feedback.");
  const unavailableContext = await createExpiredSessionContext(browser);
  await stop(backend);
  backend = null;
  await waitForUnavailable(backendUrl);
  await unavailableRecoveryOffersRetry(unavailableContext);
  console.log("Browser session recovery passed: pending, recovered, rejected, and unavailable.");
} catch (error) {
  console.error("Browser session recovery runner failed.");
  console.error("Controlled backend output:\n" + (backend?.output.join("") ?? ""));
  console.error("Next.js output:\n" + (frontend?.output.join("") ?? ""));
  throw error;
} finally {
  await browser?.close();
  await stop(frontend);
  await stop(backend);
}

async function createExpiredSessionContext(browser, refreshToken = null, accessToken = null) {
  const context = await browser.newContext();
  const signIn = await context.request.post(`${frontendUrl}/api/auth/sign-in`, {
    data: { identifier: "demo@example.com", password: "123" },
  });
  assert.equal(signIn.status(), 200, "mock user should sign in through the same-origin route");
  await context.addCookies([
    {
      name: "cc_access_token",
      value: accessToken ?? "x.eyJleHAiOjF9.x",
      url: frontendUrl,
      httpOnly: true,
      sameSite: "Lax",
    },
    ...(refreshToken
      ? [
          {
            name: "cc_refresh_token",
            value: refreshToken,
            url: frontendUrl,
            httpOnly: true,
            sameSite: "Lax",
          },
        ]
      : []),
  ]);
  return context;
}

async function recoversAndReturnsToCollectivity(browser) {
  const context = await createExpiredSessionContext(browser);
  try {
    const page = await context.newPage();
    page.setDefaultTimeout(15_000);
    const returnTo = "/collectivity/projects/start?source=session-recovery#overview";
    const refreshResponse = page.waitForResponse(
      (response) =>
        new URL(response.url()).pathname === "/api/auth/refresh" &&
        response.request().method() === "POST"
    );
    await page.goto(
      `${frontendUrl}/auth/recover?${new URLSearchParams({ returnTo }).toString()}`
    );
    await page.getByText("Chargement de la session...", { exact: true }).waitFor();
    const response = await refreshResponse;
    assert.equal(response.status(), 200);
    await page.waitForURL((url) => url.pathname === "/collectivity/projects/start");
    const finalUrl = new URL(page.url());
    assert.equal(finalUrl.origin, frontendUrl, "recovery should stay on this application origin");
    assert.equal(finalUrl.searchParams.get("source"), "session-recovery");
    assert.equal(finalUrl.hash, "#overview");
    assert.ok(
      (await context.cookies(frontendUrl)).some((cookie) => cookie.name === "cc_access_token"),
      "successful recovery should restore the access cookie"
    );
  } finally {
    await context.close();
  }
}

async function rejectedRefreshGoesToSignIn(browser) {
  const context = await createExpiredSessionContext(browser, "revoked-refresh-token");
  try {
    const page = await context.newPage();
    page.setDefaultTimeout(15_000);
    const returnTo = "/collectivity/projects/grand-sfax/inventory?year=2026#energy";
    const refreshResponse = page.waitForResponse(
      (response) =>
        new URL(response.url()).pathname === "/api/auth/refresh" &&
        response.request().method() === "POST"
    );
    await page.goto(
      `${frontendUrl}/auth/recover?${new URLSearchParams({ returnTo }).toString()}`
    );
    await page.getByText("Chargement de la session...", { exact: true }).waitFor();
    const response = await refreshResponse;
    assert.equal(response.status(), 401);
    await page.waitForURL((url) => url.pathname === "/auth/sign-in");
    const finalUrl = new URL(page.url());
    assert.equal(finalUrl.searchParams.get("reason"), "expired");
    assert.equal(finalUrl.searchParams.get("returnTo"), returnTo);
    await page.getByRole("heading", { name: "Se connecter" }).waitFor();
    await page.getByText("Votre session a expiré. Connectez-vous pour reprendre votre parcours.").waitFor();
  } finally {
    await context.close();
  }
}

async function unavailableRecoveryOffersRetry(context) {
  try {
    const page = await context.newPage();
    page.setDefaultTimeout(15_000);
    const returnTo = "/collectivity/projects/start?source=service-outage";
    await page.goto(
      `${frontendUrl}/auth/recover?${new URLSearchParams({ returnTo }).toString()}`
    );
    await page.getByText(
      "Le service d'authentification est indisponible pour le moment. Veuillez reessayer plus tard.",
      { exact: true }
    ).waitFor();
    const finalUrl = new URL(page.url());
    assert.equal(finalUrl.pathname, "/auth/recover");
    assert.equal(finalUrl.searchParams.get("returnTo"), returnTo);
    await page.getByRole("button", { name: "Reessayer" }).waitFor();
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
  if (!address || typeof address === "string") throw new Error("Could not reserve port");
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
