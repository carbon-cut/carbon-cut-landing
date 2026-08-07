import RouteDescriptionPanel from "../../_components/routeDescriptionPanel";
import { getCollectivityModuleRoute } from "../../_lib/routing";
import { requireCollectivityPlanSession } from "@/lib/auth/access";
import { getScopedI18n } from "@/locales/server";

export default async function CollectivityPlanScenariosPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;

  await requireCollectivityPlanSession({
    requestedPlanId: planId,
    requestedModule: "scenarios",
    returnTo: getCollectivityModuleRoute(planId, "scenarios"),
  });

  const t = getScopedI18n("(pages).collectivityDashboard");

  return (
    <RouteDescriptionPanel
      eyebrow={t("workflow.eyebrow") as string}
      title={t("workflow.sections.scenarios.title") as string}
      description={t("workflow.sections.scenarios.description") as string}
      sectionsTitle={t("moduleStructure.title") as string}
      sections={t("moduleStructure.sections.scenarios") as { title: string; description: string }[]}
    />
  );
}
