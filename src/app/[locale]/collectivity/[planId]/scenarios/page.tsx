import RouteDescriptionPanel from "../../_components/routeDescriptionPanel";
import { getCollectivityModuleRoute } from "../../_lib/routing";
import { requireCollectivityPlanSession } from "@/lib/auth/access";
import { getScopedI18n } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";

export default async function CollectivityPlanScenariosPage({
  params,
}: {
  params: Promise<{ locale: string; planId: string }>;
}) {
  const { locale, planId } = await params;
  setStaticParamsLocale(locale);

  await requireCollectivityPlanSession({
    requestedPlanId: planId,
    requestedModule: "scenarios",
    returnTo: getCollectivityModuleRoute(planId, "scenarios"),
  });

  const t = await getScopedI18n("(pages).collectivityDashboard");

  return (
    <RouteDescriptionPanel
      eyebrow={t("workflow.eyebrow") as string}
      title={t("workflow.sections.scenarios.title") as string}
      description={t("workflow.sections.scenarios.description") as string}
      sectionsTitle={t("moduleStructure.title") as string}
      sections={[]}
    />
  );
}
