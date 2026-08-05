"use client";

import { useQuery } from "@tanstack/react-query";

import {
  collectivityQueryKeys,
  collectivityQueryOptions,
  fetchCollectivitySetupSnapshot,
} from "@/app/collectivity/_lib/queries";
import type { CollectivitySetupSnapshot } from "@/app/collectivity/setup/_lib/types";
import CollectivitySetupForm from "@/app/collectivity/setup/_components/collectivitySetupForm";

export default function SetupWorkspace({
  initialSnapshot,
}: {
  initialSnapshot: CollectivitySetupSnapshot;
}) {
  const currentPlanId = initialSnapshot.project.slug;
  const { data: snapshot = initialSnapshot } = useQuery({
    ...collectivityQueryOptions,
    queryKey: collectivityQueryKeys.setupSnapshot(currentPlanId),
    queryFn: () => fetchCollectivitySetupSnapshot(currentPlanId),
    initialData: initialSnapshot,
  });

  return (
    <CollectivitySetupForm
      currentPlanId={currentPlanId}
      initialValues={snapshot.currentInventory.setupPayload}
      variant="workspace"
    />
  );
}
