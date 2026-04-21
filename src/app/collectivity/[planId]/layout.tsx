import type { ReactNode } from "react";

import WorkspaceShell from "../_components/workspaceShell";
import { DEFAULT_COLLECTIVITY_PLAN_ID } from "../_lib/routing";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ planId: DEFAULT_COLLECTIVITY_PLAN_ID }];
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
