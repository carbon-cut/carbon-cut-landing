import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { resolve } from "node:path";
import { chromium } from "playwright";

import {
  ensureIntegrationServicesAvailable,
  integrationConfig,
} from "../../../test-support/integration/auth-helpers.ts";

const backendDirectory = resolve(process.env.INTEGRATION_BACKEND_DIR ?? "../carbon-cut-backend");
const backendFixturePath = path.join(
  backendDirectory,
  "tests/carbon-footprint/tunisia/sfax-inventory.js"
);
const backendComparisonPath = path.join(
  backendDirectory,
  "tests/carbon-footprint/collectivity/integration/sfax-inventory-comparison.js"
);
for (const [description, filename] of [
  ["Sfax inventory fixture", backendFixturePath],
  ["Sfax result comparison", backendComparisonPath],
]) {
  if (!existsSync(filename)) {
    throw new Error(`${description} is missing from INTEGRATION_BACKEND_DIR: ${filename}`);
  }
}
const requireBackend = createRequire(path.join(backendDirectory, "package.json"));
const { sfaxInventory } = requireBackend(backendFixturePath);
const { compareSfaxInventoryResults } = requireBackend(backendComparisonPath);

const userEmail = "sfax.user@example.com";
const userPassword = "Password123!";
const projectSlug = "sfax-end-to-end";
// Run backend integration #21 first to restore this shared isolated test database.
const browserBaseUrl = new URL(integrationConfig.frontendUrl);
browserBaseUrl.hostname = "localhost";
const inventoryPath = `/api/collectivity/projects/${projectSlug}/current-inventory`;
const resultPath = `${inventoryPath}/result`;

let browser;
let context;

try {
  await ensureIntegrationServicesAvailable();
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext();

  const signIn = await context.request.post(
    new URL("/api/auth/sign-in", browserBaseUrl).toString(),
    { data: { identifier: userEmail, password: userPassword } }
  );
  assert.equal(signIn.status(), 200, "the Sfax integration user should sign in");

  const restoreDraft = await context.request.put(
    new URL(`${inventoryPath}/input`, browserBaseUrl).toString(),
    { data: { inventoryInput: sfaxInventory.inventoryInput } }
  );
  assert.equal(restoreDraft.status(), 200, "the saved Sfax draft should be restored");

  const initialInventory = await context.request.get(
    new URL(inventoryPath, browserBaseUrl).toString()
  );
  assert.equal(
    initialInventory.status(),
    200,
    "the existing Sfax Inventory should load through GET"
  );
  const initialInventoryBody = await initialInventory.json();
  assert.equal(initialInventoryBody.data.project.slug, projectSlug);

  const page = await context.newPage();
  await page.goto(
    new URL(`/collectivity/projects/${projectSlug}/ghg-inventory`, browserBaseUrl).toString(),
    { waitUntil: "domcontentloaded" }
  );

  const resultResponsePromise = page.waitForResponse(
    (response) =>
      response.request().method() === "GET" &&
      new URL(response.url()).pathname.endsWith(resultPath),
    { timeout: 120_000 }
  );
  await page.getByRole("button", { name: "Submit data", exact: true }).click();

  const resultResponse = await resultResponsePromise;
  assert.equal(
    resultResponse.status(),
    200,
    "the frontend should receive saved results through GET"
  );
  const resultBody = await resultResponse.json();
  const comparison = compareSfaxInventoryResults(resultBody.data);
  assert.deepEqual(comparison.failures, []);

  console.log("Sfax browser calculation passed using the backend-owned comparison.");
} finally {
  await context?.close();
  await browser?.close();
}
