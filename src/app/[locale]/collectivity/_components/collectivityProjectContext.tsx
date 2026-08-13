"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  collectivityQueryKeys,
  collectivityQueryOptions,
  fetchCollectivityCurrentInventory,
} from "@/app/[locale]/collectivity/_lib/queries";
import type {
  CollectivityProjectSnapshot,
  CollectivitySetupSnapshot,
} from "@/app/[locale]/collectivity/setup/_lib/types";

type CollectivityProjectContextValue = {
  project: CollectivityProjectSnapshot;
  snapshot: CollectivitySetupSnapshot;
};

const CollectivityProjectContext = createContext<CollectivityProjectContextValue | null>(null);

const workspaceSnapshotQueryOptions = {
  ...collectivityQueryOptions,
  staleTime: Infinity,
  refetchOnMount: false,
};

export function CollectivityProjectProvider({
  children,
  initialSnapshot,
}: {
  children: ReactNode;
  initialSnapshot: CollectivitySetupSnapshot;
}) {
  const projectSlug = initialSnapshot.project.slug;
  const { data: snapshot = initialSnapshot } = useQuery({
    ...workspaceSnapshotQueryOptions,
    queryKey: collectivityQueryKeys.currentInventory(projectSlug),
    queryFn: () => fetchCollectivityCurrentInventory(projectSlug),
    initialData: initialSnapshot,
  });
  const value = useMemo(() => ({ project: snapshot.project, snapshot }), [snapshot]);

  return (
    <CollectivityProjectContext.Provider value={value}>
      {children}
    </CollectivityProjectContext.Provider>
  );
}

function useCollectivityProjectContext() {
  const context = useContext(CollectivityProjectContext);

  if (!context) {
    throw new Error("Collectivity project context must be used within CollectivityProjectProvider");
  }

  return context;
}

export function useCollectivityProject() {
  return useCollectivityProjectContext().project;
}

export function useCollectivityWorkspaceSnapshot() {
  return useCollectivityProjectContext().snapshot;
}
