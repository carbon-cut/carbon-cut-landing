"use client";

import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  ChevronDown,
  ClipboardList,
  FileSpreadsheet,
  Landmark,
  Plus,
  Settings,
  Target,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useScopedI18n } from "@/locales/client";

type WorkspaceRoute = "inventory" | "scenarios" | "planning" | "action-plan" | "investments";

const routes: Array<{
  href: string;
  key: WorkspaceRoute;
  icon: ComponentType<{ className?: string }>;
}> = [
  { href: "/collectivity/inventory", key: "inventory", icon: FileSpreadsheet },
  { href: "/collectivity/scenarios", key: "scenarios", icon: Target },
  { href: "/collectivity/planning", key: "planning", icon: CalendarDays },
  { href: "/collectivity/action-plan", key: "action-plan", icon: ClipboardList },
  { href: "/collectivity/investments", key: "investments", icon: Landmark },
];

export default function WorkspaceShell({ children }: { children: ReactNode }) {
  const t = useScopedI18n("(pages).collectivityDashboard");
  const pathname = usePathname();
  const activeRoute = routes.find((route) => pathname === route.href) ?? routes[0];
  const requirements = t("baseline.requirements") as string[];

  return (
    <main id="content" className="min-h-screen bg-workspace text-foreground">
      <div className="min-h-screen lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
        <aside className="sticky top-0 hidden h-screen flex-col border-r border-border-light bg-card-primary text-card-primary-foreground lg:flex">
          <div className="border-b border-border-light px-5 py-5">
            <Badge
              variant="outline"
              className="border-card-primary-foreground/18 bg-card-primary-foreground/6 uppercase tracking-[0.2em] text-card-primary-foreground/78 focus-visible:ring-offset-card-primary"
            >
              {t("header.badge") as string}
            </Badge>
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
              {routes.map((route) => {
                const routeKey = `workflow.sections.${route.key}` as const;
                const Icon = route.icon;
                const isActive = pathname === route.href;

                return (
                  <li key={route.href}>
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
                      <span className="min-w-0 truncate text-sm font-medium">
                        {t(`${routeKey}.title`) as string}
                      </span>
                      <Badge
                        variant="ghost"
                        size="micro"
                        className="text-card-primary-foreground/50 focus-visible:ring-offset-card-primary"
                      >
                        {t(`${routeKey}.status`) as string}
                      </Badge>
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
              <p>{t("baseline.requirementsTitle") as string}</p>
            </Typography>
            <Typography
              asChild
              variant="caption"
              size="sm"
              className="mt-2 text-card-primary-foreground/74"
            >
              <p>{requirements[1]}</p>
            </Typography>
          </div>
        </aside>

        <div className="min-w-0 bg-workspace">
          <div className="border-b border-border lg:hidden">
            <nav
              aria-label={t("workflow.title") as string}
              className="flex gap-5 overflow-x-auto px-4 py-3"
            >
              {routes.map((route) => {
                const routeKey = `workflow.sections.${route.key}` as const;
                const isActive = pathname === route.href;

                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "whitespace-nowrap border-b-2 pb-2 text-sm font-medium",
                      isActive
                        ? "border-foreground text-foreground"
                        : "border-transparent text-secondary hover:text-foreground"
                    )}
                  >
                    {t(`${routeKey}.title`) as string}
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
                    <p>{t(`workflow.sections.${activeRoute.key}.title`) as string}</p>
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
                    {t(`workflow.sections.${activeRoute.key}.title`) as string}
                  </span>
                </Typography>
                <Typography asChild variant="caption" size="sm">
                  <span>{t("baseline.cards.ire.title") as string}</span>
                </Typography>
                <Typography asChild variant="caption" size="sm" className="text-border">
                  <span>/</span>
                </Typography>
                <Typography asChild variant="caption" size="sm">
                  <span>{t("baseline.cards.year2.title") as string}</span>
                </Typography>
                <Typography asChild variant="caption" size="sm" className="text-border">
                  <span>/</span>
                </Typography>
                <Typography asChild variant="caption" size="sm">
                  <span>{t("baseline.cards.horizon.title") as string}</span>
                </Typography>
              </div>
            </div>
          </header>

          <div className="px-4 py-5 md:px-8 md:py-6">{children}</div>
        </div>
      </div>
    </main>
  );
}
