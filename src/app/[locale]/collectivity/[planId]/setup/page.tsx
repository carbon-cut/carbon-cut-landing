import { redirect } from "next/navigation";

import CollectivityAccessNotice from "@/app/[locale]/collectivity/_components/CollectivityAccessNotice";
import { requireCollectivityPlanSession } from "@/lib/auth/access";
import { loadCollectivitySetupSnapshot } from "@/app/[locale]/collectivity/_lib/loadCollectivitySetupSnapshot";
import { CollectivityBackendError } from "@/lib/collectivity/backend";
import { buildLogoutRedirect } from "@/lib/auth/redirect";

import { getCollectivityModuleRoute, getCollectivityProjectsRoute } from "../../_lib/routing";
import SetupWorkspace from "../../setup/_components/setupWorkspace";

export const dynamic = "force-dynamic";

export default async function CollectivityPlanSetupPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;

  await requireCollectivityPlanSession({
    requestedPlanId: planId,
    requestedModule: "setup",
    returnTo: getCollectivityModuleRoute(planId, "setup"),
  });

  let snapshot;

  try {
    snapshot = await loadCollectivitySetupSnapshot(planId);
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      if (error.status === 401) {
        redirect(buildLogoutRedirect(getCollectivityModuleRoute(planId, "setup")));
      }

      return (
        <CollectivityAccessNotice
          returnHref={getCollectivityProjectsRoute("setup")}
          status={error.status}
        />
      );
    }

    throw error;
  }

  if (!snapshot) {
    redirect(getCollectivityProjectsRoute("setup"));
  }

  return <SetupWorkspace initialSnapshot={snapshot} />;
}
