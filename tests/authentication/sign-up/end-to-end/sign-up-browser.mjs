import assert from "node:assert/strict";
import { chromium } from "playwright";
import { startBrowserTestServers } from "../../../browser/support/servers.mjs";

let browser;
let servers;
let backendUrl;
let frontendUrl;

try {
  servers = await startBrowserTestServers({ frontendPath: "/auth/sign-up" });
  backendUrl = servers.backendUrl;
  frontendUrl = servers.frontendUrl;
  browser = await chromium.launch({ headless: true });
  await registrationRequiresConfirmationAndPreservesReturnPath(browser);
  await registrationRejectsInvalidNamesAndDuplicateEmail(browser);
  await confirmationLinksPreserveReturnPath(browser);
  await servers.close();
  servers = await startBrowserTestServers({
    frontendPath: "/auth/sign-up",
    backendEnvironment: { MOCK_AUTH_CONFIRMATION_REQUIRED: "false" },
  });
  backendUrl = servers.backendUrl;
  frontendUrl = servers.frontendUrl;
  await immediateRegistrationEstablishesBrowserAuthState(browser);
  console.log(
    "Browser sign-up passed: pending and immediate registration, invalid names, duplicate email, confirmation, and safe return paths."
  );
} catch (error) {
  console.error("Browser sign-up runner failed.");
  console.error(servers?.formatOutput() ?? "Browser servers did not finish startup.");
  throw error;
} finally {
  try {
    await browser?.close();
  } finally {
    await servers?.close();
  }
}

async function immediateRegistrationEstablishesBrowserAuthState(browser) {
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    page.setDefaultTimeout(15_000);
    await page.goto(`${frontendUrl}/auth/sign-up`);
    await page.getByLabel("Prénom").fill("Immediate");
    await page.getByLabel(/^Nom/).fill("User");
    await page.getByLabel("E-mail").fill(`immediate-${Date.now()}@example.com`);
    await page.getByLabel(/^Mot de passe/).fill("BrowserPassword123!");
    await page.getByLabel("Confirmez le mot de passe").fill("BrowserPassword123!");

    const responsePromise = page.waitForResponse(
      (response) =>
        new URL(response.url()).pathname === "/api/auth/sign-up" &&
        response.request().method() === "POST"
    );
    const [response] = await Promise.all([
      responsePromise,
      page.getByRole("button", { name: "Créer un compte" }).click(),
    ]);
    assert.equal(response.status(), 200);
    await page.waitForURL((url) => url.pathname === "/collectivity");
    await page.getByRole("button", { name: "Immediate User" }).waitFor();
    assert.ok(
      (await context.cookies(frontendUrl)).some((cookie) => cookie.name === "cc_access_token"),
      "immediate registration should establish a browser session before navigation"
    );
  } finally {
    await context.close();
  }
}

async function registrationRejectsInvalidNamesAndDuplicateEmail(browser) {
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    page.setDefaultTimeout(15_000);
    await page.goto(`${frontendUrl}/auth/sign-up`);
    await page.getByRole("heading", { name: "Creer un compte" }).waitFor();

    await page.getByLabel("E-mail").fill("invalid-names@example.com");
    await page.getByLabel(/^Mot de passe/).fill("BrowserPassword123!");
    await page.getByLabel("Confirmez le mot de passe").fill("BrowserPassword123!");
    await page.getByRole("button", { name: "Créer un compte" }).click();
    assert.equal(
      await page.getByLabel("Prénom").evaluate((input) => input.validity.valueMissing),
      true
    );
    assert.equal(
      await page.getByLabel(/^Nom/).evaluate((input) => input.validity.valueMissing),
      true
    );

    const invalidResponse = await page.evaluate(async () => {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: "A".repeat(101),
          lastName: "Signup",
          email: "too-long-name@example.com",
          password: "BrowserPassword123!",
        }),
      });
      return { status: response.status, body: await response.json() };
    });
    assert.equal(invalidResponse.status, 400);
    const invalidBody = invalidResponse.body;
    assert.equal(invalidBody.error.status, 400);
    assert.equal(typeof invalidBody.error.name, "string");
    assert.equal(typeof invalidBody.error.message, "string");
    assert.equal(typeof invalidBody.error.details, "object");

    await page.getByLabel("Prénom").fill("Duplicate");
    await page.getByLabel(/^Nom/).fill("User");
    await page.getByLabel("E-mail").fill("demo@example.com");
    await page.getByLabel(/^Mot de passe/).fill("BrowserPassword123!");
    await page.getByLabel("Confirmez le mot de passe").fill("BrowserPassword123!");
    await page.getByRole("button", { name: "Créer un compte" }).click();
    await page.getByText("Cette adresse e-mail est déjà utilisée.", { exact: true }).waitFor();
    assert.equal(new URL(page.url()).pathname, "/auth/sign-up");
  } finally {
    await context.close();
  }
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

    await page.getByLabel("Prénom").fill("Browser");
    await page.getByLabel(/^Nom/).fill("Signup");
    await page.getByLabel("Organisation (facultatif)").fill("Carbon Cut Test");
    await page.getByLabel("E-mail").fill(email);
    await page.getByLabel(/^Mot de passe/).fill("BrowserPassword123!");
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
    assert.deepEqual(registrationResponse.request().postDataJSON(), {
      firstName: "Browser",
      lastName: "Signup",
      email,
      organisation: "Carbon Cut Test",
      password: "BrowserPassword123!",
    });

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
