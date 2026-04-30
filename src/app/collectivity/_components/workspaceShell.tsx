"use client";

import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ClipboardList,
  FileSpreadsheet,
  Plus,
  Settings,
  SlidersHorizontal,
  Target,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { getCollectivityModuleRoute, type CollectivityModuleSlug } from "../_lib/routing";
import { cn } from "@/lib/utils";
import { useScopedI18n } from "@/locales/client";

const routes: Array<{
  key: CollectivityModuleSlug;
  icon: ComponentType<{ className?: string }>;
}> = [
  { key: "cadrage", icon: SlidersHorizontal },
  { key: "inventaire", icon: FileSpreadsheet },
  { key: "scenarios", icon: Target },
  { key: "actions", icon: ClipboardList },
];

export default function WorkspaceShell({
  children,
  planId,
}: {
  children: ReactNode;
  planId: string;
}) {
  const t = useScopedI18n("(pages).collectivityDashboard");
  const pathname = usePathname();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const routeItems = routes.map((route) => {
    const routeKey = `workflow.sections.${route.key}` as const;

    return {
      ...route,
      href: getCollectivityModuleRoute(planId, route.key),
      title: t(`${routeKey}.title`) as string,
      status: t(`${routeKey}.status`) as string,
    };
  });
  const activeRoute = routeItems.find((route) => pathname === route.href);
  const planMarkers = [
    t("planMarkers.territory") as string,
    t("planMarkers.referenceYear") as string,
    t("planMarkers.supportYears") as string,
  ];

  return (
    <main id="content" className="min-h-screen bg-workspace text-foreground">
      <div className="min-h-screen lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
        <aside className="sticky top-0 hidden h-screen flex-col border-r border-border-light bg-card-primary text-card-primary-foreground lg:flex">
          <div className="border-b border-border-light px-5 py-5">
            <Image
              className="mx-auto"
              src={`${basePath}/logo/logoDark.svg`}
              alt="Carbon Cut logo"
              width={141}
              height={48}
            />
            <div className="mx-auto mb-5 w-fit">
              <Badge
                variant="outline"
                size="micro"
                className="px-2 py-1 text-card-primary-foreground/78"
              >
                {t("header.badge") as string}
              </Badge>
            </div>
            <Typography
              asChild
              variant="title"
              size="md"
              className="mt-3 text-card-primary-foreground"
            >
              <h2>{t("header.title") as string}</h2>
            </Typography>
            <Typography
              asChild
              variant="caption"
              size="sm"
              className="mt-1 text-card-primary-foreground/62"
            >
              <p>{t("header.meta") as string}</p>
            </Typography>
          </div>

          <nav aria-label={t("workflow.title") as string} className="flex-1 px-3 py-4">
            <ul className="space-y-1.5">
              {routeItems.map((route) => {
                const Icon = route.icon;
                const isActive = pathname === route.href;

                return (
                  <li key={route.key}>
                    <Link
                      href={route.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "grid grid-cols-[18px_minmax(0,1fr)_auto] items-center gap-3 border-l-2 px-3 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chart-3 focus-visible:ring-offset-2 focus-visible:ring-offset-card-primary",
                        isActive
                          ? "border-chart-1 bg-card-primary-foreground/8 text-card-primary-foreground"
                          : "border-transparent text-card-primary-foreground/72 hover:border-card-primary-foreground/16 hover:bg-card-primary-foreground/4 hover:text-card-primary-foreground"
                      )}
                    >
                      <Icon className="mt-0.5 h-4 w-4" />
                      <span className="min-w-0 truncate text-sm font-medium">{route.title}</span>
                      {/*                       <Badge
                        variant="ghost"
                        size="micro"
                        className="text-card-primary-foreground/50 focus-visible:ring-offset-card-primary"
                      >
                        {route.status}
                      </Badge> */}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-border-light px-5 py-4">
            <Typography
              asChild
              variant="eyebrow"
              size="xxs"
              className="text-card-primary-foreground/48"
            >
              <p>{t("planSidebar.title") as string}</p>
            </Typography>
            <Typography
              asChild
              variant="caption"
              size="sm"
              className="mt-2 text-card-primary-foreground/74"
            >
              <p>{t("planSidebar.description") as string}</p>
            </Typography>
          </div>
        </aside>

        <div className="min-w-0 bg-workspace">
          <div className="border-b border-border lg:hidden">
            <nav
              aria-label={t("workflow.title") as string}
              className="flex gap-5 overflow-x-auto px-4 py-3"
            >
              {routeItems.map((route) => {
                const isActive = pathname === route.href;

                return (
                  <Link
                    key={route.key}
                    href={route.href}
                    className={cn(
                      "whitespace-nowrap border-b-2 pb-2 text-sm font-medium",
                      isActive
                        ? "border-foreground text-foreground"
                        : "border-transparent text-secondary hover:text-foreground"
                    )}
                  >
                    {route.title}
                  </Link>
                );
              })}
            </nav>
          </div>

          <header className="border-b border-border bg-[hsl(var(--workspace-background)/0.95)] backdrop-blur">
            <div className="flex flex-col gap-4 px-4 py-4 md:px-8">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div className="min-w-0">
                  <Typography asChild variant="eyebrow" size="xxs" className="text-secondary">
                    <p>{t(`workflow.sections.${activeRoute?.key ?? "cadrage"}.title`) as string}</p>
                  </Typography>
                  <Typography asChild variant="title" size="xl" className="mt-1">
                    <h1>{t("header.title") as string}</h1>
                  </Typography>
                  <Typography asChild variant="caption" size="sm" className="mt-1">
                    <p>{t("header.meta") as string}</p>
                  </Typography>
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
        </div>
      </div>
    </main>
  );
}
