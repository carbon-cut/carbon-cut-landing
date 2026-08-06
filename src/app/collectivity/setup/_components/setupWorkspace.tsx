"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import {
  CollectivityApiError,
  collectivityQueryKeys,
  collectivityQueryOptions,
  fetchCollectivitySetupSnapshot,
} from "@/app/collectivity/_lib/queries";
import { getCollectivityProjectsRoute } from "@/app/collectivity/_lib/routing";
import type { CollectivitySetupSnapshot } from "@/app/collectivity/setup/_lib/types";
import CollectivitySetupForm from "@/app/collectivity/setup/_components/collectivitySetupForm";

export default function SetupWorkspace({
  initialSnapshot,
}: {
  initialSnapshot: CollectivitySetupSnapshot;
}) {
  const router = useRouter();
  const currentPlanId = initialSnapshot.project.slug;
  const { data: snapshot = initialSnapshot, error } = useQuery({
    ...collectivityQueryOptions,
    queryKey: collectivityQueryKeys.setupSnapshot(currentPlanId),
    queryFn: () => fetchCollectivitySetupSnapshot(currentPlanId),
    initialData: initialSnapshot,
  });

  useEffect(() => {
    if (!(error instanceof CollectivityApiError)) {
      return;
    }

    if (error.payload.error?.status === 403 || error.payload.error?.status === 404) {
      router.replace(getCollectivityProjectsRoute("setup"));
    }
  }, [error, router]);

  return (
    <CollectivitySetupForm
      currentPlanId={currentPlanId}
      initialValues={snapshot.currentInventory.setupPayload}
      variant="workspace"
    />
  );
}
