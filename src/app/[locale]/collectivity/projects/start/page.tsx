import { redirect } from "next/navigation";
import RecoverCurrentPath from "@/app/[locale]/auth/_components/recover-current-path";

import { requireCollectivitySession } from "@/lib/auth/access";
import { getUserPlanIds } from "@/lib/auth/profile";
import {
  CollectivityBackendError,
  getAvailableCollectivityClaims,
} from "@/lib/collectivity/backend";
import { getCollectivityStartRoute } from "@/lib/routing/routes";

import { getCollectivityProjectsRoute } from "../../_lib/routing";
import CollectivityStartContent from "./start-content";

export const dynamic = "force-dynamic";

export default async function CollectivityStartPage() {
  const session = await requireCollectivitySession(getCollectivityStartRoute());
  const planIds = getUserPlanIds(session.user);

  try {
    const availableClaims = await getAvailableCollectivityClaims();

    if (availableClaims.length > 0) {
      return <CollectivityStartContent />;
    }
  } catch (error) {
    if (error instanceof CollectivityBackendError && error.status === 401) {
      return <RecoverCurrentPath />;
    }
    return <CollectivityStartContent />;
  }

  if (planIds.length === 0) return <CollectivityStartContent />;

  redirect(getCollectivityProjectsRoute());
}
