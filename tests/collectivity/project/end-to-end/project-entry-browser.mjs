import assert from "node:assert/strict";
import { chromium } from "playwright";
import { startBrowserTestServers } from "../../../browser/support/servers.mjs";

let browser;
let servers;
let backendUrl;
let frontendUrl;

try {
  servers = await startBrowserTestServers({ frontendPath: "/auth/sign-in" });
  backendUrl = servers.backendUrl;
  frontendUrl = servers.frontendUrl;
  browser = await chromium.launch({ headless: true });

  console.log("Project entry: an authenticated user with a Project reaches the project selector.");
  await existingProjectReachesSelector(browser);
  console.log(
    "Project entry: an authenticated user without a Project sees the setup access state."
  );
  await userWithoutProjectSeesSetupAccess(browser);
  console.log("Browser Project entry passed for users with and without an existing Project.");
} catch (error) {
  console.error("Browser Project entry runner failed.");
  console.error(servers?.formatOutput() ?? "Browser servers did not finish startup.");
  throw error;
} finally {
  try {
    await browser?.close();
  } finally {
    await servers?.close();
  }
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
