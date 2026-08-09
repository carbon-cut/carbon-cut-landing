import { getAuthSignInRoute } from "@/lib/routing/routes";

export function sanitizeReturnTo(returnTo?: string | null) {
  if (!returnTo || !returnTo.startsWith("/")) return null;
  if (returnTo.startsWith("//")) return null;

  return returnTo;
}

export function buildSignInRedirect(returnTo?: string | null) {
  const safeReturnTo = sanitizeReturnTo(returnTo);

  return getAuthSignInRoute(safeReturnTo);
}

export function buildLogoutRedirect(returnTo?: string | null) {
  const safeReturnTo = sanitizeReturnTo(returnTo);

  if (!safeReturnTo) return "/api/auth/logout";

  return `/api/auth/logout?${new URLSearchParams({ returnTo: safeReturnTo }).toString()}`;
}
