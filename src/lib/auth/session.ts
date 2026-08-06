import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { readAuthCookies } from "@/lib/auth/cookies";
import { buildSignInRedirect } from "@/lib/auth/redirect";
import { logout, rotateRefreshToken, StrapiAuthError } from "@/lib/auth/strapi";
import type { AuthSessionResponse, SessionState } from "@/lib/auth/types";

type CookieReader = {
  get(name: string): { value: string } | undefined;
};

export async function getServerSession(): Promise<SessionState> {
  const cookieStore = await cookies();
  const { accessToken, refreshToken, user } = readAuthCookies(cookieStore);

  if ((accessToken || refreshToken) && user) {
    return {
      authenticated: true,
      user,
    };
  }

  return {
    authenticated: false,
    user: null,
  };
}

export async function requireServerSession(returnTo?: string | null) {
  const session = await getServerSession();

  if (!session.authenticated) {
    redirect(buildSignInRedirect(returnTo));
  }

  return session;
}

export async function refreshSessionFromCookies(
  cookieStore: CookieReader
): Promise<AuthSessionResponse | null> {
  const { refreshToken } = readAuthCookies(cookieStore);

  if (!refreshToken) {
    return null;
  }

  try {
    return await rotateRefreshToken(refreshToken);
  } catch (error) {
    if (error instanceof StrapiAuthError) {
      return null;
    }

    throw error;
  }
}

export async function logoutAndClearSession() {
  const cookieStore = await cookies();
  const { refreshToken } = readAuthCookies(cookieStore);

  try {
    if (refreshToken) {
      await logout(refreshToken);
    }
  } catch (error) {
    if (!(error instanceof StrapiAuthError)) {
      throw error;
    }
  }
}
