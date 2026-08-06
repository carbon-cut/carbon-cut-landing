import type { ReactNode } from "react";
import type { Metadata } from "next";

import { toKeywordArray } from "@/lib/seo";
import { useScopedServerI18n } from "@/locales/server";
import WorkspaceShell from "../_components/workspaceShell";

const collectivityDashboardSeo = useScopedServerI18n("seo.pages.collectivityDashboard");

export const metadata: Metadata = {
  title: collectivityDashboardSeo("title"),
  description: collectivityDashboardSeo("description"),
  keywords: toKeywordArray(collectivityDashboardSeo("keywords") as unknown),
};

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
