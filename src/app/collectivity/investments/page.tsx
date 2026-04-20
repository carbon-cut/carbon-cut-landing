import ModuleScaffold from "../_components/moduleScaffold";
import { useScopedServerI18n } from "@/locales/server";

export default function CollectivityInvestmentsPage() {
  const t = useScopedServerI18n("(pages).collectivityDashboard");

  return (
    <ModuleScaffold
      eyebrow={t("workspacePanels.investments.eyebrow") as string}
      title={t("workspacePanels.investments.title") as string}
      description={t("workspacePanels.investments.description") as string}
      dependenciesTitle={t("workspacePanels.investments.dependenciesTitle") as string}
      dependencies={t("workspacePanels.investments.dependencies") as string[]}
      outputsTitle={t("workspacePanels.investments.outputsTitle") as string}
      outputs={t("workspacePanels.investments.outputs") as string[]}
    />
  );
}
