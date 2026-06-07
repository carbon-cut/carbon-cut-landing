"use client";

import type { CSSProperties, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Plus, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";

import CollectivitySidebar, { useCollectivityRouteItems } from "./collectivitySidebar";

const sidebarStyle = {
  "--sidebar-width": "13.5rem",
  "--sidebar-width-icon": "3.5rem",
} satisfies CSSProperties;

export default function WorkspaceShell({
  children,
  planId,
}: {
  children: ReactNode;
  planId: string;
}) {
  const t = useScopedI18n("(pages).collectivityDashboard");
  const pathname = usePathname();
  const routeItems = useCollectivityRouteItems(planId);
  const activeRoute = routeItems.find((route) => pathname === route.href);
  const planMarkers = [
    t("planMarkers.territory") as string,
    t("planMarkers.referenceYear") as string,
    t("planMarkers.supportYears") as string,
  ];

  return (
    <SidebarProvider defaultOpen style={sidebarStyle}>
      <TooltipProvider delayDuration={150}>
        <CollectivitySidebar routeItems={routeItems} pathname={pathname} />

        <SidebarInset className="min-w-0 bg-workspace">
          <main id="content" className="min-h-screen bg-workspace text-foreground">
            <header className="border-b border-border bg-[hsl(var(--workspace-background)/0.95)] backdrop-blur">
              <div className="flex flex-col gap-4 px-4 py-4 md:px-8">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div className="flex items-start gap-3">
                    <SidebarTrigger className="mt-1 h-9 w-9 rounded-full border border-border bg-card text-foreground shadow-none hover:bg-muted" />

                    <div className="min-w-0">
                      <Typography asChild variant="eyebrow" size="xxs" className="text-secondary">
                        <p>
                          {t(`workflow.sections.${activeRoute?.key ?? "cadrage"}.title`) as string}
                        </p>
                      </Typography>
                      <Typography asChild variant="title" size="xl" className="mt-1">
                        <h1>{t("header.title") as string}</h1>
                      </Typography>
                      <Typography asChild variant="caption" size="sm" className="mt-1">
                        <p>{t("header.meta") as string}</p>
                      </Typography>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-md px-2.5 text-xs font-medium shadow-none"
                      type="button"
                      aria-label={t("actions.switchInventory") as string}
                    >
                      <ChevronDown aria-hidden="true" className="h-3.5 w-3.5" />
                      {t("actions.switchInventory") as string}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-md px-2.5 text-xs font-medium shadow-none"
                      type="button"
                      aria-label={t("actions.new") as string}
                    >
                      <Plus aria-hidden="true" className="h-3.5 w-3.5" />
                      {t("actions.new") as string}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-md shadow-none"
                      type="button"
                      aria-label={t("actions.settings") as string}
                    >
                      <Settings aria-hidden="true" className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <Typography asChild variant="label" size="sm">
                    <span>
                      {t("workflow.currentLabel") as string}:{" "}
                      {activeRoute?.title ?? routeItems[0]?.title}
                    </span>
                  </Typography>
                  {planMarkers.map((marker, index) => (
                    <div key={marker} className="flex items-center gap-x-4">
                      {index > 0 ? (
                        <Typography asChild variant="caption" size="sm" className="text-border">
                          <span>/</span>
                        </Typography>
                      ) : null}
                      <Typography asChild variant="caption" size="sm">
                        <span>{marker}</span>
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </header>

            <div className="px-4 py-5 md:px-8 md:py-6">{children}</div>
          </main>
        </SidebarInset>
      </TooltipProvider>
    </SidebarProvider>
  );
}
