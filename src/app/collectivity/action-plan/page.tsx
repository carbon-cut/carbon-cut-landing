import ModuleScaffold from "../_components/moduleScaffold";
import { useScopedServerI18n } from "@/locales/server";

export default function CollectivityActionPlanPage() {
  const t = useScopedServerI18n("(pages).collectivityDashboard");

  return (
    <ModuleScaffold
      eyebrow={t("workspacePanels.action-plan.eyebrow") as string}
      title={t("workspacePanels.action-plan.title") as string}
      description={t("workspacePanels.action-plan.description") as string}
      dependenciesTitle={t("workspacePanels.action-plan.dependenciesTitle") as string}
      dependencies={t("workspacePanels.action-plan.dependencies") as string[]}
      outputsTitle={t("workspacePanels.action-plan.outputsTitle") as string}
      outputs={t("workspacePanels.action-plan.outputs") as string[]}
    />
  );
}
