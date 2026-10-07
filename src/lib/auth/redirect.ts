import { getAuthSignInRoute } from "@/lib/routing/routes";

export function sanitizeReturnTo(returnTo?: string | null) {
  if (!returnTo || !returnTo.startsWith("/")) return null;
  if (returnTo.startsWith("//")) return null;
  if (/[\\\u0000-\u001f\u007f]/.test(returnTo)) return null;

  return returnTo;
}

export function buildSignInRedirect(returnTo?: string | null) {
  const safeReturnTo = sanitizeReturnTo(returnTo);

  return getAuthSignInRoute(safeReturnTo);
}

export function buildRecoveryRedirect(returnTo?: string | null) {
  const safeReturnTo = sanitizeReturnTo(returnTo) ?? "/";
  return `/auth/recover?${new URLSearchParams({ returnTo: safeReturnTo }).toString()}`;
}

export function buildLogoutRedirect(returnTo?: string | null) {
  const safeReturnTo = sanitizeReturnTo(returnTo);

  if (!safeReturnTo) return "/api/auth/logout";

  return `/api/auth/logout?${new URLSearchParams({ returnTo: safeReturnTo }).toString()}`;
}
