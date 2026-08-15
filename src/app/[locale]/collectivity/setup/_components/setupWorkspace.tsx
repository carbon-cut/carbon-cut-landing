"use client";

import { useCollectivityWorkspaceSnapshot } from "@/app/[locale]/collectivity/_components/collectivityProjectContext";
import CollectivitySetupForm from "@/app/[locale]/collectivity/setup/_components/collectivitySetupForm";

export default function SetupWorkspace() {
  const snapshot = useCollectivityWorkspaceSnapshot();
  const currentPlanId = snapshot.project.slug;

  return (
    <CollectivitySetupForm
      currentPlanId={currentPlanId}
      initialValues={snapshot.currentInventory.setupPayload}
      variant="workspace"
    />
  );
}
