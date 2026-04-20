import ModuleScaffold from "../_components/moduleScaffold";
import { useScopedServerI18n } from "@/locales/server";

export default function CollectivityPlanningPage() {
  const t = useScopedServerI18n("(pages).collectivityDashboard");

  return (
    <ModuleScaffold
      eyebrow={t("workspacePanels.planning.eyebrow") as string}
      title={t("workspacePanels.planning.title") as string}
      description={t("workspacePanels.planning.description") as string}
      dependenciesTitle={t("workspacePanels.planning.dependenciesTitle") as string}
      dependencies={t("workspacePanels.planning.dependencies") as string[]}
      outputsTitle={t("workspacePanels.planning.outputsTitle") as string}
      outputs={t("workspacePanels.planning.outputs") as string[]}
    />
  );
}
