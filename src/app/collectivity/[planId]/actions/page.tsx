import RouteDescriptionPanel from "../../_components/routeDescriptionPanel";
import { useScopedServerI18n } from "@/locales/server";

export default function CollectivityPlanActionsPage() {
  const t = useScopedServerI18n("(pages).collectivityDashboard");

  return (
    <RouteDescriptionPanel
      eyebrow={t("workflow.eyebrow") as string}
      title={t("workflow.sections.actions.title") as string}
      description={t("workflow.sections.actions.description") as string}
      sectionsTitle={t("moduleStructure.title") as string}
      sections={t("moduleStructure.sections.actions") as { title: string; description: string }[]}
    />
  );
}
