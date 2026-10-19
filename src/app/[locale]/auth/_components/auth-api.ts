"use client";

import type { AuthErrorPayload } from "@/lib/auth/types";
import { isAuthUser, isRegistrationPendingResponse } from "@/lib/auth/types";
import type { RegistrationPendingResponse, SessionState, SignUpRequest } from "@/lib/auth/types";

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; error: AuthErrorPayload };

type ImmediateRegistrationResponse = Extract<SessionState, { authenticated: true }>;

function isImmediateRegistrationResponse(value: unknown): value is ImmediateRegistrationResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "authenticated" in value &&
    value.authenticated === true &&
    "user" in value &&
    isAuthUser(value.user)
  );
}

async function parseResponseBody(response: Response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

export async function postAuth<T>(url: string, body: unknown): Promise<ApiResult<T>> {
  let response: Response;

  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "same-origin",
    });
  } catch {
    return {
      ok: false,
      status: 503,
      error: {
        error: {
          status: 503,
          message: "Authentication service is unavailable",
          details: {
            code: "AUTH_UPSTREAM_UNAVAILABLE",
          },
        },
      },
    };
  }

  const data = await parseResponseBody(response);

  if (response.ok) {
    return {
      ok: true,
      data: (data ?? {}) as T,
    };
  }

  return {
    ok: false,
    status: response.status,
    error:
      (data as AuthErrorPayload | null) ??
      ({
        error: {
          status: response.status,
          message: "Authentication request failed",
          details: {
            code: "AUTH_UPSTREAM_INVALID_RESPONSE",
          },
        },
      } satisfies AuthErrorPayload),
  };
}

export async function postRegistration(
  body: SignUpRequest
): Promise<ApiResult<RegistrationPendingResponse | ImmediateRegistrationResponse>> {
  const result = await postAuth<unknown>("/api/auth/sign-up", body);
  if (!result.ok) return result;

  if (isRegistrationPendingResponse(result.data) || isImmediateRegistrationResponse(result.data)) {
    return { ok: true, data: result.data };
  }

  return {
    ok: false,
    status: 502,
    error: {
      error: {
        status: 502,
        message: "Authentication service returned an invalid registration response",
        details: { code: "AUTH_UPSTREAM_INVALID_RESPONSE" },
      },
    },
  };
}

export function getErrorCode(error: AuthErrorPayload) {
  return error.error?.details?.code ?? null;
}

export function isUpstreamAuthError(error: AuthErrorPayload) {
  const code = getErrorCode(error);
  return code === "AUTH_UPSTREAM_UNAVAILABLE" || code === "AUTH_UPSTREAM_INVALID_RESPONSE";
}
