import assert from "node:assert/strict";
import { chromium } from "playwright";
import { startBrowserTestServers } from "../../../browser/support/servers.mjs";

let browser;
let servers;
let backendUrl;
let frontendUrl;

try {
  servers = await startBrowserTestServers({ frontendPath: "/auth/forgot-password" });
  backendUrl = servers.backendUrl;
  frontendUrl = servers.frontendUrl;
  browser = await chromium.launch({ headless: true });
  await forgotPasswordShowsNeutralSuccess(browser);
  await resetLinkChangesPasswordAndUsesSafeDestination(browser);

  await servers.stopBackend();
  await servers.waitForBackendUnavailable();
  await forgotPasswordShowsBackendUnavailable(browser);

  console.log(
    "Browser password recovery passed: neutral request success, reset link, safe navigation, and backend outage feedback."
  );
} catch (error) {
  console.error("Browser password recovery runner failed.");
  console.error(servers?.formatOutput() ?? "Browser servers did not finish startup.");
  throw error;
} finally {
  try {
    await browser?.close();
  } finally {
    await servers?.close();
  }
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
