import "server-only";

import type {
  AuthErrorPayload,
  AuthSessionResponse,
  ChangePasswordRequest,
  EmailConfirmationRequest,
  ForgotPasswordRequest,
  RegistrationPendingResponse,
  ResetPasswordRequest,
  ResendConfirmationRequest,
  SignInRequest,
  SignUpRequest,
} from "@/lib/auth/types";
import { isMockBackendEnabled } from "@/mocks/config";
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

type JsonObject = Record<string, unknown>;

export class StrapiAuthError extends Error {
  status: number;
  body: AuthErrorPayload;

  constructor(status: number, body: AuthErrorPayload) {
    super(body.error?.message ?? "Authentication request failed");
    this.name = "StrapiAuthError";
    this.status = status;
    this.body = body;
  }
}

export class StrapiTransportError extends Error {
  status: number;
  body: AuthErrorPayload;

  constructor(
    code: "AUTH_UPSTREAM_UNAVAILABLE" | "AUTH_UPSTREAM_INVALID_RESPONSE",
    message: string,
    status = 503
  ) {
    super(message);
    this.name = "StrapiTransportError";
    this.status = status;
    this.body = {
      error: {
        status,
        name: "UpstreamAuthError",
        message,
        details: {
          code,
        },
      },
    };
  }
}

function getStrapiBaseUrl() {
  const baseUrl = process.env.STRAPI_INTERNAL_URL ?? process.env.NEXT_PUBLIC_SERVER;

  if (!baseUrl) {
    throw new Error("Missing STRAPI_INTERNAL_URL or NEXT_PUBLIC_SERVER");
  }

  return baseUrl.replace(/\/$/, "");
}

async function parseResponse<T>(response: Response) {
  const text = await response.text();
  if (!text) return null as T;

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new StrapiTransportError(
      "AUTH_UPSTREAM_INVALID_RESPONSE",
      "Authentication service returned an invalid response",
      502
    );
  }
}

async function request<T>(path: string, init?: RequestInit) {
  let response: Response;

  try {
    response = await fetch(`${getStrapiBaseUrl()}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
      cache: "no-store",
    });
  } catch {
    throw new StrapiTransportError(
      "AUTH_UPSTREAM_UNAVAILABLE",
      "Authentication service is unavailable"
    );
  }

  const body = await parseResponse<T | AuthErrorPayload>(response);

  if (!response.ok) {
    throw new StrapiAuthError(response.status, (body ?? {}) as AuthErrorPayload);
  }

  return body as T;
}

function withPostBody(body: JsonObject, init?: RequestInit): RequestInit {
  return {
    ...init,
    method: "POST",
    body: JSON.stringify(body),
  };
}

function toBody(init?: RequestInit) {
  if (!init?.body || typeof init.body !== "string") {
    return {} as JsonObject;
  }

  return JSON.parse(init.body) as JsonObject;
}

function mockRequest<T>(path: string, init?: RequestInit) {
  try {
    switch (path) {
      case "/api/auth/local":
        return mockSignIn(toBody(init) as SignInRequest) as T;
      case "/api/auth/local/register":
        return mockSignUp(toBody(init) as SignUpRequest) as T;
      case "/api/auth/send-email-confirmation":
        return mockResendConfirmation(toBody(init) as ResendConfirmationRequest) as T;
      case "/api/auth/email-confirmation":
        return mockConfirmEmail(toBody(init) as EmailConfirmationRequest) as T;
      case "/api/auth/forgot-password":
        return mockForgotPassword(toBody(init) as ForgotPasswordRequest) as T;
      case "/api/auth/reset-password":
        return mockResetPassword(toBody(init) as ResetPasswordRequest) as T;
      case "/api/refresh-token-rotation":
        return mockRotateRefreshToken(String(toBody(init).refresh_token ?? "")) as T;
      case "/api/auth/logout":
        return mockLogout(String(toBody(init).refresh_token ?? "")) as T;
      case "/api/auth/change-password": {
        const authorization = new Headers(init?.headers).get("Authorization") ?? "";
        const accessToken = authorization.replace(/^Bearer\s+/i, "");
        return mockChangePassword(accessToken, toBody(init) as ChangePasswordRequest) as T;
      }
      default:
        throw new StrapiTransportError(
          "AUTH_UPSTREAM_INVALID_RESPONSE",
          `No mock handler configured for ${path}`,
          501
        );
    }
  } catch (error) {
    if (error instanceof MockAuthError) {
      throw new StrapiAuthError(error.status, error.body);
    }

    throw error;
  }
}

export function signIn(body: SignInRequest) {
  if (isMockBackendEnabled()) {
    return Promise.resolve(mockRequest<AuthSessionResponse>("/api/auth/local", withPostBody(body)));
  }
  return request<AuthSessionResponse>("/api/auth/local", withPostBody(body));
}

export function signUp(body: SignUpRequest) {
  if (isMockBackendEnabled()) {
    return Promise.resolve(
      mockRequest<AuthSessionResponse | RegistrationPendingResponse>(
        "/api/auth/local/register",
        withPostBody(body)
      )
    );
  }
  return request<AuthSessionResponse | RegistrationPendingResponse>(
    "/api/auth/local/register",
    withPostBody(body)
  );
}

export function resendConfirmation(body: ResendConfirmationRequest) {
  if (isMockBackendEnabled()) {
    return Promise.resolve(
      mockRequest<{ email: string; sent: true }>(
        "/api/auth/send-email-confirmation",
        withPostBody(body)
      )
    );
  }
  return request<{ email: string; sent: true }>(
    "/api/auth/send-email-confirmation",
    withPostBody(body)
  );
}

export function confirmEmail(body: EmailConfirmationRequest) {
  if (isMockBackendEnabled()) {
    return Promise.resolve(
      mockRequest<AuthSessionResponse>("/api/auth/email-confirmation", withPostBody(body))
    );
  }
  return request<AuthSessionResponse>("/api/auth/email-confirmation", withPostBody(body));
}

export function forgotPassword(body: ForgotPasswordRequest) {
  if (isMockBackendEnabled()) {
    return Promise.resolve(
      mockRequest<{ ok: true }>("/api/auth/forgot-password", withPostBody(body))
    );
  }
  return request<{ ok: true }>("/api/auth/forgot-password", withPostBody(body));
}

export function resetPassword(body: ResetPasswordRequest) {
  if (isMockBackendEnabled()) {
    return Promise.resolve(
      mockRequest<AuthSessionResponse>("/api/auth/reset-password", withPostBody(body))
    );
  }
  return request<AuthSessionResponse>("/api/auth/reset-password", withPostBody(body));
}

export function rotateRefreshToken(refreshToken: string) {
  if (isMockBackendEnabled()) {
    return Promise.resolve(
      mockRequest<AuthSessionResponse>(
        "/api/refresh-token-rotation",
        withPostBody({ refresh_token: refreshToken })
      )
    );
  }
  return request<AuthSessionResponse>(
    "/api/refresh-token-rotation",
    withPostBody({ refresh_token: refreshToken })
  );
}

export function logout(refreshToken: string) {
  if (isMockBackendEnabled()) {
    return Promise.resolve(
      mockRequest<{ ok: true }>("/api/auth/logout", withPostBody({ refresh_token: refreshToken }))
    );
  }
  return request<{ ok: true }>("/api/auth/logout", withPostBody({ refresh_token: refreshToken }));
}

export function changePassword(accessToken: string, body: ChangePasswordRequest) {
  if (isMockBackendEnabled()) {
    return Promise.resolve(
      mockRequest<AuthSessionResponse>("/api/auth/change-password", {
        ...withPostBody(body),
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    );
  }
  return request<AuthSessionResponse>("/api/auth/change-password", {
    ...withPostBody(body),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
