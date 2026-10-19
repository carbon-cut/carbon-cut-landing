import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { readAuthCookies } from "@/lib/auth/cookies";
import { buildRecoveryRedirect, buildSignInRedirect } from "@/lib/auth/redirect";
import { logout, rotateRefreshToken, StrapiAuthError } from "@/lib/auth/strapi";
import { isAccessTokenCurrent } from "@/lib/auth/token";
import type { AuthSessionResponse, SessionState } from "@/lib/auth/types";

type CookieReader = {
  get(name: string): { value: string } | undefined;
};

export async function getServerSession(): Promise<SessionState> {
  const cookieStore = await cookies();
  const { accessToken, user } = readAuthCookies(cookieStore);

  if (accessToken && user && isAccessTokenCurrent(accessToken)) {
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
    const cookieStore = await cookies();
    if (readAuthCookies(cookieStore).refreshToken) {
      redirect(buildRecoveryRedirect(returnTo));
    }
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
    const refreshedSession = await rotateRefreshToken(refreshToken);
    return refreshedSession;
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
    // Local logout must succeed even when revocation or the backend is unavailable.
    void error;
  }
}
