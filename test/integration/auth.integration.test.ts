import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { AUTH_ACCESS_COOKIE, AUTH_REFRESH_COOKIE, AUTH_USER_COOKIE } from "@/lib/auth/constants";
import {
  authCookieNames,
  cleanupTestUser,
  CookieJar,
  createTestUser,
  ensureIntegrationServicesAvailable,
  fetchFrontend,
  getConfirmationToken,
  getResetPasswordToken,
  getSetCookieHeaders,
  revokeRefreshTokens,
  type TestSupportUser,
  uniquePassword,
} from "./auth-helpers";

type ManagedUser = {
  user: TestSupportUser;
  password: string;
};

describe.sequential("auth integration", () => {
  beforeAll(async () => {
    await ensureIntegrationServicesAvailable();
  });

  describe("session and guard flows", () => {
    let confirmedUser: ManagedUser;
    let authenticatedJar: CookieJar;
    let authenticatedSession:
      | {
          user: { email: string };
          setCookies: string[];
        }
      | null = null;

    beforeAll(async () => {
      confirmedUser = await createTestUser({
        password: uniquePassword(),
        confirmed: true,
        blocked: false,
      });

      const signInResult = await signIn(confirmedUser.user.email, confirmedUser.password);
      authenticatedJar = signInResult.jar;
      authenticatedSession = signInResult;
    });

    afterAll(async () => {
      await cleanupTestUser(confirmedUser.user.id);
    });

    it("returns an unauthenticated session without cookies", async () => {
      const response = await fetchFrontend("/api/auth/session");

      expect(response.status).toBe(200);
      await expect(response.json()).resolves.toEqual({
        authenticated: false,
        user: null,
      });
    });

    it("signs in with valid credentials and sets auth cookies", async () => {
      const body = {
        authenticated: true,
        user: authenticatedSession?.user,
      };

      expect(body).toEqual({
        authenticated: true,
        user: expect.objectContaining({
          email: confirmedUser.user.email,
        }),
      });
      expect(body).not.toHaveProperty("access_token");
      expect(body).not.toHaveProperty("refresh_token");

      for (const cookieName of authCookieNames) {
        expect(
          authenticatedSession?.setCookies.some((header) => header.startsWith(`${cookieName}=`))
        ).toBe(true);
      }

      expect(authenticatedJar.has(AUTH_ACCESS_COOKIE)).toBe(true);
      expect(authenticatedJar.has(AUTH_REFRESH_COOKIE)).toBe(true);
      expect(authenticatedJar.has(AUTH_USER_COOKIE)).toBe(true);
    });

    it("returns an authenticated session when valid cookies are present", async () => {
      const jar = authenticatedJar.clone();
      const response = await fetchFrontend("/api/auth/session", undefined, jar);

      expect(response.status).toBe(200);
      await expect(response.json()).resolves.toEqual({
        authenticated: true,
        user: expect.objectContaining({
          email: confirmedUser.user.email,
        }),
      });
    });

    it("redirects unauthenticated users from /form to sign-in with returnTo", async () => {
      const response = await fetchFrontend("/form");

      expect(response.status).toBe(307);
      expect(response.headers.get("location")).toBe("/auth/sign-in?returnTo=%2Fform");
    });

    it("allows authenticated users to access /form", async () => {
      const jar = authenticatedJar.clone();
      const response = await fetchFrontend("/form", undefined, jar);

      expect(response.status).toBe(200);
      expect(response.headers.get("location")).toBeNull();
      expect(response.headers.get("content-type")).toContain("text/html");
    });

    it("logs out and clears the auth session", async () => {
      const jar = authenticatedJar.clone();
      const logoutResponse = await fetchFrontend(
        "/api/auth/logout",
        {
          method: "POST",
        },
        jar
      );

      expect(logoutResponse.status).toBe(200);
      await expect(logoutResponse.json()).resolves.toEqual({ ok: true });

      const setCookies = getSetCookieHeaders(logoutResponse);
      for (const cookieName of authCookieNames) {
        expect(setCookies.some((header) => header.startsWith(`${cookieName}=`))).toBe(true);
      }

      const sessionResponse = await fetchFrontend("/api/auth/session", undefined, jar);
      await expect(sessionResponse.json()).resolves.toEqual({
        authenticated: false,
        user: null,
      });
    });

    it("returns the backend auth error code and no cookies for invalid credentials", async () => {
      const jar = new CookieJar();
      const response = await fetchFrontend(
        "/api/auth/sign-in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: confirmedUser.user.email,
            password: `${confirmedUser.password}-invalid`,
          }),
        },
        jar
      );

      await expectAuthError(response, 401, "AUTH_INVALID_CREDENTIALS");
      expectNoAuthCookies(jar);
    });
  });

  describe("confirmation flows", () => {
    let pendingUser: ManagedUser;

    beforeAll(async () => {
      pendingUser = await createTestUser({
        password: uniquePassword(),
        confirmed: false,
        blocked: false,
      });
    });

    afterAll(async () => {
      await cleanupTestUser(pendingUser.user.id);
    });

    it("returns confirmation required for an unconfirmed user login", async () => {
      const jar = new CookieJar();
      const response = await fetchFrontend(
        "/api/auth/sign-in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: pendingUser.user.email,
            password: pendingUser.password,
          }),
        },
        jar
      );

      await expectAuthError(response, 403, "AUTH_EMAIL_CONFIRMATION_REQUIRED");
      expectNoAuthCookies(jar);
    });

    it("returns an invalid token error for email confirmation with a bad code", async () => {
      const jar = new CookieJar();
      const response = await fetchFrontend(
        "/api/auth/email-confirmation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: pendingUser.user.email,
            confirmation: "bad-confirmation-token",
          }),
        },
        jar
      );

      await expectAuthError(response, 400, "AUTH_INVALID_EMAIL_CONFIRMATION_TOKEN");
      expectNoAuthCookies(jar);
    });

    it("resends a confirmation email for the unconfirmed user", async () => {
      const response = await fetchFrontend("/api/auth/resend-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: pendingUser.user.email,
        }),
      });

      expect(response.status).toBe(200);
      await expect(response.json()).resolves.toEqual({
        email: pendingUser.user.email,
        sent: true,
      });
    });

    it("confirms the email with the real confirmation token and creates a session", async () => {
      const confirmationToken = await getConfirmationToken(pendingUser.user.id);
      const jar = new CookieJar();
      const response = await fetchFrontend(
        "/api/auth/email-confirmation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: pendingUser.user.email,
            confirmation: confirmationToken,
          }),
        },
        jar
      );

      expect(response.status).toBe(200);
      await expect(response.json()).resolves.toEqual({
        authenticated: true,
        user: expect.objectContaining({
          email: pendingUser.user.email,
          confirmed: true,
        }),
      });
      expect(jar.has(AUTH_ACCESS_COOKIE)).toBe(true);
      expect(jar.has(AUTH_REFRESH_COOKIE)).toBe(true);
      expect(jar.has(AUTH_USER_COOKIE)).toBe(true);
    });
  });

  describe("forgot/reset flows", () => {
    let forgotResetUser: ManagedUser;

    beforeAll(async () => {
      forgotResetUser = await createTestUser({
        password: uniquePassword(),
        confirmed: true,
        blocked: false,
      });
    });

    afterAll(async () => {
      await cleanupTestUser(forgotResetUser.user.id);
    });

    it("returns generic success for forgot-password", async () => {
      const response = await fetchFrontend("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: forgotResetUser.user.email,
        }),
      });

      expect(response.status).toBe(200);
      await expect(response.json()).resolves.toEqual({ ok: true });
    });

    it("returns an invalid code error for reset-password with a bad token", async () => {
      const jar = new CookieJar();
      const response = await fetchFrontend(
        "/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: "bad-reset-token",
            password: "NewPassword123!",
            passwordConfirmation: "NewPassword123!",
          }),
        },
        jar
      );

      await expectAuthError(response, 400, "AUTH_INVALID_RESET_PASSWORD_CODE");
      expectNoAuthCookies(jar);
    });

    it("resets the password with the real reset token and creates a session", async () => {
      const resetPasswordToken = await getResetPasswordToken(forgotResetUser.user.id);
      const newPassword = uniquePassword();
      const jar = new CookieJar();
      const response = await fetchFrontend(
        "/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: resetPasswordToken,
            password: newPassword,
            passwordConfirmation: newPassword,
          }),
        },
        jar
      );

      expect(response.status).toBe(200);
      await expect(response.json()).resolves.toEqual({
        authenticated: true,
        user: expect.objectContaining({
          email: forgotResetUser.user.email,
        }),
      });
      expect(jar.has(AUTH_ACCESS_COOKIE)).toBe(true);
      expect(jar.has(AUTH_REFRESH_COOKIE)).toBe(true);
      expect(jar.has(AUTH_USER_COOKIE)).toBe(true);

      forgotResetUser.password = newPassword;
    });
  });

  describe("blocked-account flows", () => {
    let blockedUser: ManagedUser;

    beforeAll(async () => {
      blockedUser = await createTestUser({
        password: uniquePassword(),
        confirmed: true,
        blocked: true,
      });
    });

    afterAll(async () => {
      await cleanupTestUser(blockedUser.user.id);
    });

    it("returns blocked-account for login and sets no auth cookies", async () => {
      const jar = new CookieJar();
      const response = await fetchFrontend(
        "/api/auth/sign-in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: blockedUser.user.email,
            password: blockedUser.password,
          }),
        },
        jar
      );

      await expectAuthError(response, 403, "AUTH_USER_BLOCKED");
      expectNoAuthCookies(jar);
    });
  });

  describe("change-password flows", () => {
    let changePasswordUser: ManagedUser;

    beforeAll(async () => {
      changePasswordUser = await createTestUser({
        password: uniquePassword(),
        confirmed: true,
        blocked: false,
      });
    });

    afterAll(async () => {
      await cleanupTestUser(changePasswordUser.user.id);
    });

    it("changes the password, rotates session cookies, invalidates the old password, and accepts the new one", async () => {
      const initialSignIn = await signIn(changePasswordUser.user.email, changePasswordUser.password);
      const jar = initialSignIn.jar;
      const newPassword = uniquePassword();

      const changePasswordResponse = await fetchFrontend(
        "/api/auth/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword: changePasswordUser.password,
            password: newPassword,
            passwordConfirmation: newPassword,
          }),
        },
        jar
      );

      expect(changePasswordResponse.status).toBe(200);
      await expect(changePasswordResponse.json()).resolves.toEqual({
        authenticated: true,
        user: expect.objectContaining({
          email: changePasswordUser.user.email,
        }),
      });
      const setCookies = getSetCookieHeaders(changePasswordResponse);
      for (const cookieName of authCookieNames) {
        expect(setCookies.some((header) => header.startsWith(`${cookieName}=`))).toBe(true);
      }

      const oldPasswordAttempt = new CookieJar();
      const oldPasswordResponse = await fetchFrontend(
        "/api/auth/sign-in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: changePasswordUser.user.email,
            password: changePasswordUser.password,
          }),
        },
        oldPasswordAttempt
      );
      await expectAuthError(oldPasswordResponse, 401, "AUTH_INVALID_CREDENTIALS");
      expectNoAuthCookies(oldPasswordAttempt);

      const newPasswordAttempt = new CookieJar();
      const newPasswordResponse = await fetchFrontend(
        "/api/auth/sign-in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: changePasswordUser.user.email,
            password: newPassword,
          }),
        },
        newPasswordAttempt
      );
      expect(newPasswordResponse.status).toBe(200);
      expect(newPasswordAttempt.has(AUTH_ACCESS_COOKIE)).toBe(true);
      expect(newPasswordAttempt.has(AUTH_REFRESH_COOKIE)).toBe(true);
      expect(newPasswordAttempt.has(AUTH_USER_COOKIE)).toBe(true);

      changePasswordUser.password = newPassword;
    });

    it("returns invalid-current-password when the current password is wrong", async () => {
      const signInResult = await signIn(changePasswordUser.user.email, changePasswordUser.password);
      const replacementPassword = uniquePassword();
      const response = await fetchFrontend(
        "/api/auth/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword: "wrong-current-password",
            password: replacementPassword,
            passwordConfirmation: replacementPassword,
          }),
        },
        signInResult.jar
      );

      await expectAuthError(response, 400, "AUTH_INVALID_CURRENT_PASSWORD");
    });
  });

  describe("refresh-failure flows", () => {
    let refreshFailureUser: ManagedUser;

    beforeAll(async () => {
      refreshFailureUser = await createTestUser({
        password: uniquePassword(),
        confirmed: true,
        blocked: false,
      });
    });

    afterAll(async () => {
      await cleanupTestUser(refreshFailureUser.user.id);
    });

    it("clears auth state when refresh fails after backend refresh tokens are revoked", async () => {
      const signInResult = await signIn(refreshFailureUser.user.email, refreshFailureUser.password);
      const jar = signInResult.jar.clone();

      jar.delete(AUTH_ACCESS_COOKIE);
      expect(jar.has(AUTH_REFRESH_COOKIE)).toBe(true);
      expect(jar.has(AUTH_USER_COOKIE)).toBe(true);

      await revokeRefreshTokens(refreshFailureUser.user.id);

      const response = await fetchFrontend("/api/auth/session", undefined, jar);

      expect(response.status).toBe(200);
      await expect(response.json()).resolves.toEqual({
        authenticated: false,
        user: null,
      });

      const setCookies = getSetCookieHeaders(response);
      for (const cookieName of authCookieNames) {
        expect(setCookies.some((header) => header.startsWith(`${cookieName}=`))).toBe(true);
      }
      expect(jar.has(AUTH_ACCESS_COOKIE)).toBe(false);
      expect(jar.has(AUTH_REFRESH_COOKIE)).toBe(false);
      expect(jar.has(AUTH_USER_COOKIE)).toBe(false);
    });
  });
});

async function signIn(identifier: string, password: string) {
  const jar = new CookieJar();
  const response = await fetchFrontend(
    "/api/auth/sign-in",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    },
    jar
  );

  expect(response.status).toBe(200);
  const body = await response.json();
  const setCookies = getSetCookieHeaders(response);
  expect(jar.has(AUTH_ACCESS_COOKIE)).toBe(true);
  expect(jar.has(AUTH_REFRESH_COOKIE)).toBe(true);
  expect(jar.has(AUTH_USER_COOKIE)).toBe(true);

  return {
    jar,
    user: body.user as { email: string },
    setCookies,
  };
}

async function expectAuthError(response: Response, status: number, code: string) {
  expect(response.status).toBe(status);

  const body = await response.json();
  expect(body).toEqual(
    expect.objectContaining({
      error: expect.objectContaining({
        details: expect.objectContaining({
          code,
        }),
      }),
    })
  );
}

function expectNoAuthCookies(jar: CookieJar) {
  expect(jar.has(AUTH_ACCESS_COOKIE)).toBe(false);
  expect(jar.has(AUTH_REFRESH_COOKIE)).toBe(false);
  expect(jar.has(AUTH_USER_COOKIE)).toBe(false);
}
