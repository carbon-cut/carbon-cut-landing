"use client";

import type { CollectivitySetupData } from "@/app/collectivity/setup/_lib/types";
import CollectivitySetupForm from "@/app/collectivity/setup/_components/collectivitySetupForm";

export default function SetupWorkspace({
  currentPlanId = null,
  initialValues = null,
}: {
  currentPlanId?: string | null;
  initialValues?: CollectivitySetupData | null;
}) {
  return (
    <CollectivitySetupForm
      currentPlanId={currentPlanId}
      initialValues={initialValues}
      variant="workspace"
    />
  );
}
