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

type JsonObject = Record<string, unknown>;
const AUTH_TEST_SUPPORT_HEADER = "x-auth-test-support-key";

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
  const baseUrl = process.env.STRAPI_INTERNAL_URL;

  if (!baseUrl) {
    throw new Error("Missing STRAPI_INTERNAL_URL or NEXT_PUBLIC_SERVER");
  }

  return baseUrl.replace(/\/$/, "");
}

function getAuthTestSupportHeader() {
  const secret = process.env.AUTH_TEST_SUPPORT_KEY;

  if (!secret) {
    return null;
  }

  return {
    [AUTH_TEST_SUPPORT_HEADER]: secret,
  };
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
        ...(getAuthTestSupportHeader() ?? {}),
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

export function signIn(body: SignInRequest) {
  return request<AuthSessionResponse>("/api/auth/local", withPostBody(body));
}

export function signUp(body: SignUpRequest) {
  return request<AuthSessionResponse | RegistrationPendingResponse>(
    "/api/auth/local/register",
    withPostBody(body)
  );
}

export function resendConfirmation(body: ResendConfirmationRequest) {
  return request<{ email: string; sent: true }>(
    "/api/auth/send-email-confirmation",
    withPostBody(body)
  );
}

export function confirmEmail(body: EmailConfirmationRequest) {
  return request<AuthSessionResponse>("/api/auth/email-confirmation", withPostBody(body));
}

export function forgotPassword(body: ForgotPasswordRequest) {
  return request<{ ok: true }>("/api/auth/forgot-password", withPostBody(body));
}

export function resetPassword(body: ResetPasswordRequest) {
  return request<AuthSessionResponse>("/api/auth/reset-password", withPostBody(body));
}

export function rotateRefreshToken(refreshToken: string) {
  return request<AuthSessionResponse>(
    "/api/refresh-token-rotation",
    withPostBody({ refresh_token: refreshToken })
  );
}

export function logout(refreshToken: string) {
  return request<{ ok: true }>("/api/auth/logout", withPostBody({ refresh_token: refreshToken }));
}

export function changePassword(accessToken: string, body: ChangePasswordRequest) {
  return request<AuthSessionResponse>("/api/auth/change-password", {
    ...withPostBody(body),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
