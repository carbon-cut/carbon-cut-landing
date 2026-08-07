import "server-only";

import { redirect } from "next/navigation";

import {
  getCollectivityModuleRoute,
  getCollectivityPlanRoute,
  getCollectivityProjectsRoute,
  getCollectivitySetupRoute,
  type CollectivityModuleSlug,
} from "@/app/[locale]/collectivity/_lib/routing";
import { getPrimaryPlanId, getUserPlanIds, hasUserProductAccess } from "@/lib/auth/profile";
import { getServerSession, requireServerSession } from "@/lib/auth/session";
import type { AuthUser } from "@/lib/auth/types";
import { getFormRoute } from "@/lib/routing/routes";

function getHouseholdHomeRoute() {
  return getFormRoute();
}

export function getCollectivityDefaultRoute(
  user: Pick<AuthUser, "allowedProducts" | "productType" | "planId">,
  moduleSlug: CollectivityModuleSlug = "setup"
) {
  const primaryPlanId = getPrimaryPlanId(user);

  if (!primaryPlanId) {
    return getCollectivitySetupRoute();
  }

  return getCollectivityModuleRoute(primaryPlanId, moduleSlug);
}

export function getAuthenticatedUserHomeRoute(
  user: Pick<AuthUser, "allowedProducts" | "productType" | "planId">
) {
  if (hasUserProductAccess(user, "household")) {
    return getHouseholdHomeRoute();
  }

  return getCollectivityDefaultRoute(user, "setup");
}

export async function redirectAuthenticatedUserFromAuth() {
  const session = await getServerSession();

  if (session.authenticated) {
    redirect(getAuthenticatedUserHomeRoute(session.user));
  }
}

export async function requireHouseholdSession(returnTo?: string | null) {
  const session = await requireServerSession(returnTo);

  if (!hasUserProductAccess(session.user, "household")) {
    redirect(getCollectivityDefaultRoute(session.user, "setup"));
  }

  return session;
}

export async function requireCollectivitySession(returnTo?: string | null) {
  const session = await requireServerSession(returnTo);

  if (!hasUserProductAccess(session.user, "collectivity")) {
    redirect(getHouseholdHomeRoute());
  }

  return session;
}

export async function requireCollectivitySetupSession(returnTo?: string | null) {
  const session = await requireCollectivitySession(returnTo);
  const primaryPlanId = getPrimaryPlanId(session.user);

  if (primaryPlanId) {
    redirect(getCollectivityModuleRoute(primaryPlanId, "setup"));
  }

  return session;
}

export async function requireCollectivityPlanSession({
  requestedPlanId,
  requestedModule,
  returnTo,
}: {
  requestedPlanId: string;
  requestedModule?: CollectivityModuleSlug;
  returnTo?: string | null;
}) {
  const session = await requireCollectivitySession(returnTo);
  const planIds = getUserPlanIds(session.user);

  if (planIds.length === 0) {
    redirect(getCollectivitySetupRoute());
  }

  if (!planIds.includes(requestedPlanId)) {
    redirect(
      requestedModule
        ? getCollectivityProjectsRoute(requestedModule)
        : getCollectivityProjectsRoute()
    );
  }

  return session;
}
