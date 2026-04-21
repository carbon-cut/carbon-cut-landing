"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCollectivityModuleRoute } from "../_lib/routing";
import { useScopedI18n } from "@/locales/client";

export default function CollectivityPlanIndexPage() {
  const router = useRouter();
  const params = useParams<{ planId: string }>();
  const t = useScopedI18n("(pages).collectivityDashboard");
  const planId = Array.isArray(params.planId) ? params.planId[0] : params.planId;
  const target = getCollectivityModuleRoute(planId, "cadrage");

  useEffect(() => {
    router.replace(target);
  }, [router, target]);

  return (
    <main id="content" className="px-4 py-32 text-center">
      <p className="text-sm text-secondary">
        <Link href={target} className="font-semibold text-foreground underline underline-offset-4">
          {t("actions.openPlanOverview")}
        </Link>
      </p>
    </main>
  );
}
