import RouteDescriptionPanel from "../../_components/routeDescriptionPanel";
import { useScopedServerI18n } from "@/locales/server";

export default function CollectivityPlanScenariosPage() {
  const t = useScopedServerI18n("(pages).collectivityDashboard");

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
