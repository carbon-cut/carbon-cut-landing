import type { ReactNode } from "react";
import type { Metadata } from "next";

import { toKeywordArray } from "@/lib/seo";
import { getScopedI18n } from "@/locales/server";
import WorkspaceShell from "../_components/workspaceShell";

export async function generateMetadata(): Promise<Metadata> {
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
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;

  return <WorkspaceShell planId={planId}>{children}</WorkspaceShell>;
}
