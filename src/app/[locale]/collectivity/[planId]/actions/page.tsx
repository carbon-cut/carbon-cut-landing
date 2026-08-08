import RouteDescriptionPanel from "../../_components/routeDescriptionPanel";
import { getCollectivityModuleRoute } from "../../_lib/routing";
import { requireCollectivityPlanSession } from "@/lib/auth/access";
import { getScopedI18n } from "@/locales/server";

export default async function CollectivityPlanActionsPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;

  await requireCollectivityPlanSession({
    requestedPlanId: planId,
    requestedModule: "actions",
    returnTo: getCollectivityModuleRoute(planId, "actions"),
  });

  const t = await getScopedI18n("(pages).collectivityDashboard");

  return (
    <RouteDescriptionPanel
      eyebrow={t("workflow.eyebrow") as string}
      title={t("workflow.sections.actions.title") as string}
      description={t("workflow.sections.actions.description") as string}
      sectionsTitle={t("moduleStructure.title") as string}
      sections={[]}
    />
  );
}
