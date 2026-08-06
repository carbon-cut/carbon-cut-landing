import "server-only";

import { cookies } from "next/headers";
import { readAuthCookies } from "@/lib/auth/cookies";
import { refreshSessionFromCookies } from "@/lib/auth/session";

export class UnauthenticatedRequestError extends Error {
  constructor() {
    super("Authentication required");
    this.name = "UnauthenticatedRequestError";
  }
}

function withBearer(init: RequestInit | undefined, accessToken: string): RequestInit {
  const headers = new Headers(init?.headers);
  headers.set("Authorization", `Bearer ${accessToken}`);

  return {
    ...init,
    headers,
    cache: "no-store",
  };
}

export async function fetchWithAuth(input: RequestInfo | URL, init?: RequestInit) {
  const cookieStore = await cookies();
  const { accessToken } = readAuthCookies(cookieStore);

  let activeAccessToken = accessToken;

  if (!activeAccessToken) {
    const refreshedSession = await refreshSessionFromCookies(cookieStore);

    if (!refreshedSession) {
      throw new UnauthenticatedRequestError();
    }

    activeAccessToken = refreshedSession.access_token;
  }

  const response = await fetch(input, withBearer(init, activeAccessToken));

  if (response.status !== 401) {
    return response;
  }

  const refreshedSession = await refreshSessionFromCookies(cookieStore);

  if (!refreshedSession) {
    throw new UnauthenticatedRequestError();
  }

  return fetch(input, withBearer(init, refreshedSession.access_token));
}
