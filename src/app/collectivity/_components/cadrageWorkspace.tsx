"use client";

import type { CollectivityCadrageData } from "@/app/collectivity/_cadrage/types";
import CollectivityCadrageForm from "@/app/collectivity/_components/collectivityCadrageForm";

export default function CadrageWorkspace({
  currentPlanId = null,
  initialValues = null,
}: {
  currentPlanId?: string | null;
  initialValues?: CollectivityCadrageData | null;
}) {
  return (
    <CollectivityCadrageForm
      currentPlanId={currentPlanId}
      initialValues={initialValues}
      variant="workspace"
    />
  );
}
