import { http, HttpResponse } from "msw";
import type {
  ChangePasswordRequest,
  EmailConfirmationRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ResendConfirmationRequest,
  SignInRequest,
  SignUpRequest,
} from "@/lib/auth/types";
import {
  MockAuthError,
  mockChangePassword,
  mockConfirmEmail,
  mockForgotPassword,
  mockLogout,
  mockResetPassword,
  mockResendConfirmation,
  mockRotateRefreshToken,
  mockSignIn,
  mockSignUp,
} from "@/mocks/auth";

function jsonError(error: unknown) {
  if (error instanceof MockAuthError) {
    return HttpResponse.json(error.body, { status: error.status });
  }

  throw error;
}

async function body<T>(request: Request) {
  return (await request.json()) as T;
}

function bearerToken(request: Request) {
  return request.headers.get("Authorization")?.replace(/^Bearer\s+/i, "") ?? "";
}

export const authHandlers = [
  http.post("*/api/auth/local", async ({ request }) => {
    try {
      return HttpResponse.json(mockSignIn(await body<SignInRequest>(request)));
    } catch (error) {
      return jsonError(error);
    }
  }),
  http.post("*/api/auth/local/register", async ({ request }) => {
    try {
      return HttpResponse.json(mockSignUp(await body<SignUpRequest>(request)));
    } catch (error) {
      return jsonError(error);
    }
  }),
  http.post("*/api/auth/send-email-confirmation", async ({ request }) => {
    try {
      return HttpResponse.json(
        mockResendConfirmation(await body<ResendConfirmationRequest>(request))
      );
    } catch (error) {
      return jsonError(error);
    }
  }),
  http.post("*/api/auth/email-confirmation", async ({ request }) => {
    try {
      return HttpResponse.json(mockConfirmEmail(await body<EmailConfirmationRequest>(request)));
    } catch (error) {
      return jsonError(error);
    }
  }),
  http.post("*/api/auth/forgot-password", async ({ request }) => {
    try {
      return HttpResponse.json(mockForgotPassword(await body<ForgotPasswordRequest>(request)));
    } catch (error) {
      return jsonError(error);
    }
  }),
  http.post("*/api/auth/reset-password", async ({ request }) => {
    try {
      return HttpResponse.json(mockResetPassword(await body<ResetPasswordRequest>(request)));
    } catch (error) {
      return jsonError(error);
    }
  }),
  http.post("*/api/refresh-token-rotation", async ({ request }) => {
    try {
      const payload = await body<{ refresh_token?: string }>(request);
      return HttpResponse.json(mockRotateRefreshToken(payload.refresh_token ?? ""));
    } catch (error) {
      return jsonError(error);
    }
  }),
  http.post("*/api/auth/logout", async ({ request }) => {
    try {
      const payload = await body<{ refresh_token?: string }>(request);
      return HttpResponse.json(mockLogout(payload.refresh_token ?? ""));
    } catch (error) {
      return jsonError(error);
    }
  }),
  http.post("*/api/auth/change-password", async ({ request }) => {
    try {
      return HttpResponse.json(
        mockChangePassword(bearerToken(request), await body<ChangePasswordRequest>(request))
      );
    } catch (error) {
      return jsonError(error);
    }
  }),
];
