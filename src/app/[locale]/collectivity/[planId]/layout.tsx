import type { ReactNode } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import CollectivityAccessNotice from "@/app/[locale]/collectivity/_components/CollectivityAccessNotice";
import { loadCollectivitySetupSnapshot } from "@/app/[locale]/collectivity/_lib/loadCollectivitySetupSnapshot";
import {
  getCollectivityPlanRoute,
  getCollectivityProjectsRoute,
} from "@/app/[locale]/collectivity/_lib/routing";
import { requireCollectivityPlanSession } from "@/lib/auth/access";
import { buildLogoutRedirect } from "@/lib/auth/redirect";
import { CollectivityBackendError } from "@/lib/collectivity/backend";
import { toKeywordArray } from "@/lib/seo";
import { getScopedI18n } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";
import WorkspaceShell from "../_components/workspaceShell";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; planId: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const collectivityDashboardSeo = await getScopedI18n("seo.pages.collectivityDashboard");

  return {
    title: collectivityDashboardSeo("title"),
    description: collectivityDashboardSeo("description"),
    keywords: toKeywordArray(
      Array(10)
        .fill(null)
        .map((_, i) =>
          collectivityDashboardSeo(
            `keywords.${i}` as Parameters<typeof collectivityDashboardSeo>[0]
          )
        )
    ),
  };
}

export default async function CollectivityPlanLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string; planId: string }>;
}) {
  const { locale, planId } = await params;
  setStaticParamsLocale(locale);

  await requireCollectivityPlanSession({
    requestedPlanId: planId,
    returnTo: getCollectivityPlanRoute(planId),
  });

  let snapshot;

  try {
    snapshot = await loadCollectivitySetupSnapshot(planId);
  } catch (error) {
    if (error instanceof CollectivityBackendError) {
      if (error.status === 401) {
        redirect(buildLogoutRedirect(getCollectivityPlanRoute(planId)));
      }
      return (
        <CollectivityAccessNotice
          returnHref={getCollectivityProjectsRoute()}
          status={error.status}
        />
      );
    }

    throw error;
  }

  if (!snapshot) {
    redirect(getCollectivityProjectsRoute());
  }

  return (
    <WorkspaceShell initialSnapshot={snapshot} planId={planId}>
      {children}
    </WorkspaceShell>
  );
}
