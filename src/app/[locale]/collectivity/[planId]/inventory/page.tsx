import { redirect } from "next/navigation";

import CollectivityAccessNotice from "@/app/[locale]/collectivity/_components/CollectivityAccessNotice";
import { requireCollectivityPlanSession } from "@/lib/auth/access";
import { loadCollectivitySetupSnapshot } from "@/app/[locale]/collectivity/_lib/loadCollectivitySetupSnapshot";
import { CollectivityBackendError } from "@/lib/collectivity/backend";
import { buildLogoutRedirect } from "@/lib/auth/redirect";

import InventoryRouteClient from "./InventoryRouteClient";
import { getCollectivityModuleRoute, getCollectivityProjectsRoute } from "../../_lib/routing";

export default async function CollectivityPlanInventoryPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;

  await requireCollectivityPlanSession({
    requestedPlanId: planId,
    requestedModule: "inventory",
    returnTo: getCollectivityModuleRoute(planId, "inventory"),
  });

  let snapshot;

  try {
    snapshot = await loadCollectivitySetupSnapshot(planId);
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      if (error.status === 401) {
        redirect(buildLogoutRedirect(getCollectivityModuleRoute(planId, "inventory")));
      }

      return (
        <CollectivityAccessNotice
          returnHref={getCollectivityProjectsRoute("inventory")}
          status={error.status}
        />
      );
    }

    throw error;
  }

  if (!snapshot) {
    redirect(getCollectivityProjectsRoute("inventory"));
  }

  return <InventoryRouteClient snapshot={snapshot} />;
}
