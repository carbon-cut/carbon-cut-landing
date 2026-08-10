import { redirect } from "next/navigation";

import { requireCollectivitySession } from "@/lib/auth/access";
import { getPrimaryPlanId } from "@/lib/auth/profile";
import { getCollectivityStartRoute } from "@/lib/routing/routes";

import { getCollectivityModuleRoute, getCollectivitySetupRoute } from "../_lib/routing";

export const dynamic = "force-dynamic";

export default async function CollectivityStartPage() {
  const session = await requireCollectivitySession(getCollectivityStartRoute());
  const primaryPlanId = getPrimaryPlanId(session.user);

  if (!primaryPlanId) {
    redirect(getCollectivitySetupRoute());
    return null;
  }

  redirect(getCollectivityModuleRoute(primaryPlanId, "setup"));
}
