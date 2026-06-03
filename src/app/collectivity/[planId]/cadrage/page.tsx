import { requireCollectivityPlanSession } from "@/lib/auth/access";
import { getMockCollectivityCadrage } from "@/mocks/collectivity";

import { getCollectivityModuleRoute } from "../../_lib/routing";
import CadrageWorkspace from "../../_components/cadrageWorkspace";

export const dynamic = "force-dynamic";

export default async function CollectivityPlanCadragePage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;

  await requireCollectivityPlanSession({
    requestedPlanId: planId,
    requestedModule: "cadrage",
    returnTo: getCollectivityModuleRoute(planId, "cadrage"),
  });

  return (
    <CadrageWorkspace currentPlanId={planId} initialValues={getMockCollectivityCadrage(planId)} />
  );
}
