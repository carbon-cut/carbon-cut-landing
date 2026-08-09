import { requireCollectivityPlanSession } from "@/lib/auth/access";

import ResultRouteClient from "./ResultRouteClient";

export default async function CollectivityPlanResultPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;

  await requireCollectivityPlanSession({
    requestedPlanId: planId,
    returnTo: `/collectivity/${planId}/result`,
  });

  return <ResultRouteClient projectSlug={planId} />;
}
