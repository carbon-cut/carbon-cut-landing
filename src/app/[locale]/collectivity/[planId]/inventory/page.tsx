import { requireCollectivityPlanSession } from "@/lib/auth/access";

import InventoryRouteClient from "./InventoryRouteClient";
import { getCollectivityModuleRoute } from "../../_lib/routing";

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

  return <InventoryRouteClient />;
}
