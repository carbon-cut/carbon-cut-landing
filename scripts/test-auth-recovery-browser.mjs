import assert from "node:assert/strict";
import { chromium } from "playwright";
import {
  cleanupTestUser,
  createTestUser,
  integrationConfig,
  revokeRefreshTokens,
  uniquePassword,
} from "../test/integration/auth-helpers.ts";

const browserBaseUrl = new URL(integrationConfig.frontendUrl);
browserBaseUrl.hostname = "localhost";
const accessCookieName = "cc_access_token";
const expiredAccessToken = "x.eyJleHAiOjF9.x";
const password = uniquePassword();
let user;
let browser;
let context;

try {
  user = await createTestUser({ password, confirmed: true, blocked: false });
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext();

  const signInResponse = await context.request.post(
    new URL("/api/auth/sign-in", browserBaseUrl).toString(),
    {
      data: { identifier: user.user.email, password },
    }
  );
  assert.equal(signInResponse.status(), 200, "test user should sign in before browser recovery");

  const cookies = await context.cookies(browserBaseUrl.toString());
  assert.ok(
    cookies.some((cookie) => cookie.name === accessCookieName),
    "sign-in should set the access cookie"
  );
  assert.ok(
    cookies.some((cookie) => cookie.name === "cc_refresh_token"),
    "sign-in should set the refresh cookie"
  );
  await context.addCookies([
    {
      name: accessCookieName,
      value: expiredAccessToken,
      domain: browserBaseUrl.hostname,
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    },
  ]);

  const page = await context.newPage();
  const refreshStatuses = [];
  page.on("response", (response) => {
    if (new URL(response.url()).pathname === "/api/auth/refresh") {
      refreshStatuses.push(response.status());
    }
  });

  const successPath = "/collectivity/projects/start?browserRecovery=success";
  await page.goto(new URL(successPath, browserBaseUrl).toString(), {
    waitUntil: "domcontentloaded",
  });
  await page.waitForURL(
    (url) =>
      url.pathname.endsWith("/collectivity/projects/start") &&
      url.searchParams.get("browserRecovery") === "success"
  );
  assert.ok(refreshStatuses.includes(200), "browser recovery page should refresh the session");

  await revokeRefreshTokens(user.user.id);
  await context.addCookies([
    {
      name: accessCookieName,
      value: expiredAccessToken,
      domain: browserBaseUrl.hostname,
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    },
  ]);

  const expiredPath = "/collectivity/projects/start?browserRecovery=expired";
  await page.goto(new URL(expiredPath, browserBaseUrl).toString(), {
    waitUntil: "domcontentloaded",
  });
  await page.waitForURL(
    (url) =>
      url.pathname.endsWith("/auth/sign-in") &&
      url.searchParams.get("reason") === "expired" &&
      url.searchParams.get("returnTo") === expiredPath
  );
  await page.getByText(/session a expiré/i).waitFor();
  assert.ok(
    refreshStatuses.includes(401),
    "browser recovery should classify a rejected refresh as expired"
  );

  console.log(
    "Browser auth recovery passed: refresh return navigation and rejected-refresh expiry UX."
  );
} finally {
  await context?.close();
  await browser?.close();
  if (user) await cleanupTestUser(user.user.id);
}
