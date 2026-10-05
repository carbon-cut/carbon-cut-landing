import "server-only";

import { redirect } from "next/navigation";

import {
  getCollectivityModuleRoute,
  getCollectivityPlanRoute,
  getCollectivityProjectsRoute,
  getCollectivitySetupRoute,
  type CollectivityModuleSlug,
} from "@/app/[locale]/collectivity/_lib/routing";
import { getPrimaryPlanId, getUserPlanIds } from "@/lib/auth/profile";
import { getServerSession, requireServerSession } from "@/lib/auth/session";
import type { AuthUser } from "@/lib/auth/types";
import { getHomeRoute } from "@/lib/routing/routes";

function getNeutralAuthenticatedRoute() {
  // Future pricing page.
  return getHomeRoute();
}

export function getCollectivityDefaultRoute(
  user: Pick<AuthUser, "planId">,
  moduleSlug: CollectivityModuleSlug = "setup"
) {
  const primaryPlanId = getPrimaryPlanId(user);

  if (!primaryPlanId) {
    return getCollectivitySetupRoute();
  }

  return getCollectivityModuleRoute(primaryPlanId, moduleSlug);
}

export function getAuthenticatedUserHomeRoute(user: Pick<AuthUser, "planId">) {
  if (getPrimaryPlanId(user)) {
    return getCollectivityDefaultRoute(user, "setup");
  }

  return getNeutralAuthenticatedRoute();
}

export async function redirectAuthenticatedUserFromAuth() {
  const session = await getServerSession();

  if (session.authenticated) {
    redirect(getAuthenticatedUserHomeRoute(session.user));
  }
}

export async function requireHouseholdSession(returnTo?: string | null) {
  return requireServerSession(returnTo);
}

export async function requireCollectivitySession(returnTo?: string | null) {
  return requireServerSession(returnTo);
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
