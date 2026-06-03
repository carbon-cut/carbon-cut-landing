import { requireCollectivityPlanSession } from "@/lib/auth/access";

import InventoryRouteClient from "../../_inventaire/InventoryRouteClient";
import { getCollectivityModuleRoute } from "../../_lib/routing";

export default async function CollectivityPlanInventairePage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;

  await requireCollectivityPlanSession({
    requestedPlanId: planId,
    requestedModule: "inventaire",
    returnTo: getCollectivityModuleRoute(planId, "inventaire"),
  });

  return <InventoryRouteClient />;
}
