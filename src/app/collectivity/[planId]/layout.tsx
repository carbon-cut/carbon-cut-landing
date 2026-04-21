import type { ReactNode } from "react";

import WorkspaceShell from "../_components/workspaceShell";

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
