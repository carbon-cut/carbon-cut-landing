import { redirect } from "next/navigation";

import { requireCollectivityPlanSession } from "@/lib/auth/access";
import { getCollectivityModuleRoute } from "../_lib/routing";

export default async function CollectivityPlanIndexPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;

  await requireCollectivityPlanSession({
    requestedPlanId: planId,
    returnTo: `/collectivity/${planId}`,
  });

  redirect(getCollectivityModuleRoute(planId, "cadrage"));
}
