import "server-only";

import { redirect } from "next/navigation";

import {
  getCollectivityModuleRoute,
  getCollectivityPlanRoute,
  getCollectivitySetupCadrageRoute,
  type CollectivityModuleSlug,
} from "@/app/collectivity/_lib/routing";
import { getPrimaryPlanId, getUserPlanIds, getUserProductType } from "@/lib/auth/profile";
import { requireServerSession } from "@/lib/auth/session";
import type { AuthUser } from "@/lib/auth/types";

const householdHomeRoute = "/form";

export function getCollectivityDefaultRoute(
  user: Pick<AuthUser, "productType" | "planId">,
  moduleSlug: CollectivityModuleSlug = "cadrage"
) {
  const primaryPlanId = getPrimaryPlanId(user);

  if (!primaryPlanId) {
    return getCollectivitySetupCadrageRoute();
  }

  return getCollectivityModuleRoute(primaryPlanId, moduleSlug);
}

export async function requireHouseholdSession(returnTo?: string | null) {
  const session = await requireServerSession(returnTo);

  if (getUserProductType(session.user) === "collectivity") {
    redirect(getCollectivityDefaultRoute(session.user));
  }

  return session;
}

export async function requireCollectivitySession(returnTo?: string | null) {
  const session = await requireServerSession(returnTo);

  if (getUserProductType(session.user) !== "collectivity") {
    redirect(householdHomeRoute);
  }

  return session;
}

export async function requireCollectivitySetupSession(returnTo?: string | null) {
  const session = await requireCollectivitySession(returnTo);
  const primaryPlanId = getPrimaryPlanId(session.user);

  if (primaryPlanId) {
    redirect(getCollectivityModuleRoute(primaryPlanId, "cadrage"));
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
    redirect(getCollectivitySetupCadrageRoute());
  }

  if (!planIds.includes(requestedPlanId)) {
    const fallbackPlanId = planIds[0];

    redirect(
      requestedModule
        ? getCollectivityModuleRoute(fallbackPlanId, requestedModule)
        : getCollectivityPlanRoute(fallbackPlanId)
    );
  }

  return session;
}
