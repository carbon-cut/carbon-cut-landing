import assert from "node:assert/strict";
import { chromium } from "playwright";
import { startBrowserTestServers } from "../../../browser/support/servers.mjs";

let browser;
let servers;
let backendUrl;
let frontendUrl;

try {
  servers = await startBrowserTestServers({
    frontendPath: "/auth/sign-in",
    backendEnvironment: { MOCK_AUTH_REFRESH_DELAY_MS: "800" },
  });
  backendUrl = servers.backendUrl;
  frontendUrl = servers.frontendUrl;
  browser = await chromium.launch({ headless: true });
  console.log("Browser session recovery: checking pending and successful recovery.");
  await recoversAndReturnsToCollectivity(browser);
  console.log("Browser session recovery: checking rejected refresh.");
  await rejectedRefreshGoesToSignIn(browser);
  console.log("Browser session recovery: checking unavailable backend feedback.");
  const unavailableContext = await createExpiredSessionContext(browser);
  await servers.stopBackend();
  await servers.waitForBackendUnavailable();
  await unavailableRecoveryOffersRetry(unavailableContext);
  console.log("Browser session recovery passed: pending, recovered, rejected, and unavailable.");
} catch (error) {
  console.error("Browser session recovery runner failed.");
  console.error(servers?.formatOutput() ?? "Browser servers did not finish startup.");
  throw error;
} finally {
  try {
    await browser?.close();
  } finally {
    await servers?.close();
  }
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
    await page.goto(`${frontendUrl}/auth/recover?${new URLSearchParams({ returnTo }).toString()}`);
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
    await page.goto(`${frontendUrl}/auth/recover?${new URLSearchParams({ returnTo }).toString()}`);
    await page.getByText("Chargement de la session...", { exact: true }).waitFor();
    const response = await refreshResponse;
    assert.equal(response.status(), 401);
    await page.waitForURL((url) => url.pathname === "/auth/sign-in");
    const finalUrl = new URL(page.url());
    assert.equal(finalUrl.searchParams.get("reason"), "expired");
    assert.equal(finalUrl.searchParams.get("returnTo"), returnTo);
    await page.getByRole("heading", { name: "Se connecter" }).waitFor();
    await page
      .getByText("Votre session a expiré. Connectez-vous pour reprendre votre parcours.")
      .waitFor();
  } finally {
    await context.close();
  }
}

async function unavailableRecoveryOffersRetry(context) {
  try {
    const page = await context.newPage();
    page.setDefaultTimeout(15_000);
    const returnTo = "/collectivity/projects/start?source=service-outage";
    await page.goto(`${frontendUrl}/auth/recover?${new URLSearchParams({ returnTo }).toString()}`);
    await page
      .getByText(
        "Le service d'authentification est indisponible pour le moment. Veuillez reessayer plus tard.",
        { exact: true }
      )
      .waitFor();
    const finalUrl = new URL(page.url());
    assert.equal(finalUrl.pathname, "/auth/recover");
    assert.equal(finalUrl.searchParams.get("returnTo"), returnTo);
    await page.getByRole("button", { name: "Reessayer" }).waitFor();
  } finally {
    await context.close();
  }
}
