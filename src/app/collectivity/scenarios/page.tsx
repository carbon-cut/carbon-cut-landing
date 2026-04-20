import ModuleScaffold from "../_components/moduleScaffold";
import { useScopedServerI18n } from "@/locales/server";

export default function CollectivityScenariosPage() {
  const t = useScopedServerI18n("(pages).collectivityDashboard");

  return (
    <ModuleScaffold
      eyebrow={t("workspacePanels.scenarios.eyebrow") as string}
      title={t("workspacePanels.scenarios.title") as string}
      description={t("workspacePanels.scenarios.description") as string}
      dependenciesTitle={t("workspacePanels.scenarios.dependenciesTitle") as string}
      dependencies={t("workspacePanels.scenarios.dependencies") as string[]}
      outputsTitle={t("workspacePanels.scenarios.outputsTitle") as string}
      outputs={t("workspacePanels.scenarios.outputs") as string[]}
    />
  );
}
