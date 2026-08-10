import "server-only";

import type { AuthUser } from "@/lib/auth/types";
import type {
  CollectivityProjectSnapshot,
  CollectivitySetupSnapshot,
} from "@/app/[locale]/collectivity/setup/_lib/types";
import { getCollectivitySetupSnapshot, listCollectivityProjects } from "@/lib/collectivity/backend";

export async function loadCollectivitySetupSnapshot(
  planId: string
): Promise<CollectivitySetupSnapshot | null> {
  return getCollectivitySetupSnapshot(planId);
}

export async function loadCollectivityProjectsForUser(
  user: Pick<AuthUser, "planId">
): Promise<CollectivityProjectSnapshot[]> {
  return listCollectivityProjects(user);
}
