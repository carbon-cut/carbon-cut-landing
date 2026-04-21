"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_COLLECTIVITY_PLAN_ID, getCollectivityPlanRoute } from "./_lib/routing";
import { useScopedI18n } from "@/locales/client";

export default function CollectivityIndexPage() {
  const router = useRouter();
  const t = useScopedI18n("(pages).collectivityDashboard");
  const target = getCollectivityPlanRoute(DEFAULT_COLLECTIVITY_PLAN_ID);

  useEffect(() => {
    router.replace(target);
  }, [router, target]);

  return (
    <main id="content" className="px-4 py-32 text-center">
      <p className="text-sm text-secondary">
        <Link href={target} className="font-semibold text-foreground underline underline-offset-4">
          {t("actions.openWorkspace")}
        </Link>
      </p>
    </main>
  );
}
