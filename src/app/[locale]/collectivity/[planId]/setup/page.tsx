import { requireCollectivityPlanSession } from "@/lib/auth/access";

import { getCollectivityModuleRoute } from "../../_lib/routing";
import SetupWorkspace from "../../setup/_components/setupWorkspace";

export const dynamic = "force-dynamic";

export default async function CollectivityPlanSetupPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;

  await requireCollectivityPlanSession({
    requestedPlanId: planId,
    requestedModule: "setup",
    returnTo: getCollectivityModuleRoute(planId, "setup"),
  });

  return <SetupWorkspace />;
}
