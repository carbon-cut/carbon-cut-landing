import "server-only";

import { cookies } from "next/headers";
import { readAuthCookies } from "@/lib/auth/cookies";

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

  if (!accessToken) {
    throw new UnauthenticatedRequestError();
  }
  return fetch(input, withBearer(init, accessToken));
}
