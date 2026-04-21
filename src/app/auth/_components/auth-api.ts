"use client";

import type { AuthErrorPayload } from "@/lib/auth/types";

const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; error: AuthErrorPayload };

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
  if (isStaticExport) {
    return {
      ok: false,
      status: 503,
      error: {
        error: {
          status: 503,
          message: "Authentication is unavailable in the static build",
          details: {
            code: "AUTH_UPSTREAM_UNAVAILABLE",
          },
        },
      },
    };
  }

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

export function getErrorCode(error: AuthErrorPayload) {
  return error.error?.details?.code ?? null;
}

export function isUpstreamAuthError(error: AuthErrorPayload) {
  const code = getErrorCode(error);
  return code === "AUTH_UPSTREAM_UNAVAILABLE" || code === "AUTH_UPSTREAM_INVALID_RESPONSE";
}
