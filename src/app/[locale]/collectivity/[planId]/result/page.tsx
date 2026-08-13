import { requireCollectivityPlanSession } from "@/lib/auth/access";
import Typography from "@/components/ui/typography/typography";
import { getScopedI18n } from "@/locales/server";

import EmissionsBySectorPie from "./_charts/EmissionsBySectorPie";
import EmissionsByScopePie from "./_charts/EmissionsByScopePie";
import GHGDevelopmentChart from "./_charts/GHGDevelopmentChart";
import MunicipalAssetsChart from "./_charts/MunicipalAssetsChart";
import TerritorialEnergyChart from "./_charts/TerritorialEnergyChart";
import ResultSummaryCards from "./_components/ResultSummaryCards";

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
      <div className="mt-6">
        <ResultSummaryCards />
      </div>
      <div className="mt-6 flex flex-col gap-6">
        <GHGDevelopmentChart />
        <MunicipalAssetsChart />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <EmissionsByScopePie />
          <EmissionsBySectorPie />
        </div>
        <TerritorialEnergyChart />
      </div>
    </>
  );
}
