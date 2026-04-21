import { redirect } from "next/navigation";

import { getCollectivityModuleRoute } from "../_lib/routing";

export default async function CollectivityPlanIndexPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;

  redirect(getCollectivityModuleRoute(planId, "cadrage"));
}
