import { requireCollectivityPlanSession } from "@/lib/auth/access";
import Typography from "@/components/ui/typography/typography";
import { getScopedI18n } from "@/locales/server";

import ResultRouteClient from "./ResultRouteClient";

export default async function CollectivityResultPocPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;
  const t = await getScopedI18n("(pages).collectivityDashboard.resultPoc");

  await requireCollectivityPlanSession({
    requestedPlanId: planId,
    returnTo: `/collectivity/${planId}/result/poc`,
  });

  return (
    <>
      <Typography asChild size="lg" variant="title">
        <h1>{t("title")}</h1>
      </Typography>
      <ResultRouteClient projectSlug={planId} />
    </>
  );
}
