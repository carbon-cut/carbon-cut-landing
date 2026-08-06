"use client";

import type { CSSProperties, ReactNode } from "react";
import { usePathname } from "next/navigation";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

import CollectivitySidebar, { useCollectivityRouteItems } from "./collectivitySidebar";

const sidebarStyle = {
  "--sidebar-width": "13.5rem",
  "--sidebar-width-icon": "3.5rem",
} as CSSProperties & Record<"--sidebar-width" | "--sidebar-width-icon", string>;

export default function WorkspaceShell({
  children,
  planId,
}: {
  children: ReactNode;
  planId: string;
}) {
  const pathname = usePathname();
  const routeItems = useCollectivityRouteItems(planId);

  return (
    <SidebarProvider defaultOpen style={sidebarStyle}>
      <TooltipProvider delayDuration={150}>
        <CollectivitySidebar routeItems={routeItems} pathname={pathname} />

        <SidebarInset className="min-w-0 bg-workspace">
          <main id="content" className="min-h-screen bg-workspace text-foreground">
            <div className="mx-auto w-full max-w-[1500px] px-4 py-3 md:px-8 md:py-4">
              {children}
            </div>
          </main>
        </SidebarInset>
      </TooltipProvider>
    </SidebarProvider>
  );
}
