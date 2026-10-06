"use client";

import type { SessionState } from "@/lib/auth/types";
import { coordinateRefresh } from "@/lib/auth/refresh-coordination";

export const SESSION_EXPIRED_EVENT = "carbon-cut:session-expired";
let refreshInFlight: Promise<Response> | null = null;

export type ApiFailure = {
  status: number;
  code: string | null;
  kind: "authentication" | "entitlement" | "unavailable" | "other";
};

export async function classifyApiFailure(response: Response): Promise<ApiFailure> {
  let code: string | null = null;
  try {
    const payload = (await response.clone().json()) as { error?: { details?: { code?: unknown } } };
    if (typeof payload.error?.details?.code === "string") code = payload.error.details.code;
  } catch {
    // Status remains authoritative when an upstream response has no JSON body.
  }
  return {
    status: response.status,
    code,
    kind:
      response.status === 401
        ? "authentication"
        : response.status === 403
          ? "entitlement"
          : response.status >= 500
            ? "unavailable"
            : "other",
  };
}

async function readSession() {
  const response = await fetch("/api/auth/session", {
    credentials: "same-origin",
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Session unavailable");
  return (await response.json()) as SessionState;
}

async function refreshOnce() {
  const refresh = async () => {
    const response = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "same-origin",
      cache: "no-store",
    });
    if (response.ok) return response;
    const after = await readSession();
    return after.authenticated ? Response.json(after) : response;
  };

  if (!refreshInFlight) {
    refreshInFlight = coordinateRefresh(refresh).finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
}

export async function recoverBrowserSession() {
  const response = await refreshOnce();
  return response.ok
    ? "recovered"
    : response.status === 401 || response.status === 403
      ? "expired"
      : "unavailable";
}

export async function fetchAuthenticated(input: RequestInfo | URL, init?: RequestInit) {
  const request = () => fetch(input, { ...init, credentials: "same-origin" });
  const first = await request();
  if (first.ok || (await classifyApiFailure(first)).kind !== "authentication") return first;

  const refreshed = await refreshOnce();
  if (!refreshed.ok) {
    const failure = await classifyApiFailure(refreshed);
    if (failure.kind === "authentication" || failure.kind === "entitlement") {
      window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
    }
    return refreshed;
  }

  const second = await request();
  if (!second.ok && (await classifyApiFailure(second)).kind === "authentication") {
    window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
  }
  return second;
}
