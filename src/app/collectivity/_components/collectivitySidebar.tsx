"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ClipboardList,
  FileSpreadsheet,
  SlidersHorizontal,
  Target,
  type LucideIcon,
} from "lucide-react";

import Logo from "@/components/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useScopedI18n } from "@/locales/client";

import { getCollectivityModuleRoute, type CollectivityModuleSlug } from "../_lib/routing";
import Typography from "@/components/ui/typography";

export type CollectivityRouteItem = {
  key: CollectivityModuleSlug;
  href: string;
  title: string;
  status: string;
  icon: LucideIcon;
};

const routeDefinitions: Array<{
  key: CollectivityModuleSlug;
  icon: LucideIcon;
}> = [
  { key: "cadrage", icon: SlidersHorizontal },
  { key: "inventaire", icon: FileSpreadsheet },
  { key: "scenarios", icon: Target },
  { key: "actions", icon: ClipboardList },
];

const BRAND_MARK_SIZE = 40;
const FULL_LOGO_WIDTH = (BRAND_MARK_SIZE * 89) / 36;
const NAV_ICON_SIZE_CLASS = "[&_svg]:!size-[16px]";

export function useCollectivityRouteItems(planId: string) {
  const t = useScopedI18n("(pages).collectivityDashboard");

  return routeDefinitions.map((route) => {
    const routeKey = `workflow.sections.${route.key}` as const;

    return {
      ...route,
      href: getCollectivityModuleRoute(planId, route.key),
      title: t(`${routeKey}.title`) as string,
      status: t(`${routeKey}.status`) as string,
    };
  });
}

export default function CollectivitySidebar({
  routeItems,
  pathname,
}: {
  routeItems: CollectivityRouteItem[];
  pathname: string;
}) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        "border-r-0 [--sidebar-background:var(--card)] [--sidebar-foreground:var(--foreground)] [--sidebar-border:var(--border)] [--sidebar-accent:var(--primary-subtle)] [--sidebar-accent-foreground:var(--foreground)]",
        "group-data-[state=collapsed]:[--sidebar-background:var(--card-primary)] group-data-[state=collapsed]:[--sidebar-foreground:var(--card-primary-foreground)] group-data-[state=collapsed]:[--sidebar-border:var(--border-light)] group-data-[state=collapsed]:[--sidebar-accent:var(--primary)] group-data-[state=collapsed]:[--sidebar-accent-foreground:var(--primary-foreground)]"
      )}
    >
      <div className="relative flex min-h-0 flex-1 flex-col">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden group-data-[collapsible=icon]:hidden"
        >
          <Image
            src={`${basePath}/form/background/fullbgPortrait.png`}
            alt=""
            fill
            sizes="216px"
            className="object-cover object-bottom"
          />
        </div>
        <SidebarHeader className="relative h-[var(--sidebar-width-icon)] z-10 gap-4 border-b border-sidebar-border pb-0 transition-[padding] duration-200 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-2.5">
          <div className="relative h-[50px] w-full overflow-visible">
            <div
              className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              style={{ width: FULL_LOGO_WIDTH, height: BRAND_MARK_SIZE }}
            >
              <Logo
                bg={isCollapsed ? "dark" : "light"}
                variant={isCollapsed ? "icon" : "full"}
                size={BRAND_MARK_SIZE}
              />
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="relative z-10 py-4">
          <SidebarGroup className="px-3 py-0">
            <SidebarMenu className="gap-1.5">
              {routeItems.map((route) => {
                const Icon = route.icon;
                const isActive = pathname === route.href;

                return (
                  <SidebarMenuItem key={route.key}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      size="lg"
                      tooltip={route.title}
                      className={cn(
                        "relative gap-4 h-9 w-full overflow-hidden rounded-md px-4 text-sm transition-all duration-200 group-data-[collapsible=icon]:h-fit group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-xl group-data-[collapsible=icon]:px-0",
                        NAV_ICON_SIZE_CLASS,
                        "hover:bg-[hsl(var(--primary)/0.07)] group-data-[collapsible=icon]:hover:bg-sidebar-accent",
                        "data-[active=true]:bg-primary/10 data-[active=true]:text-foreground data-[active=true]:before:absolute data-[active=true]:before:inset-y-0 data-[active=true]:before:left-0 data-[active=true]:before:w-[3px] data-[active=true]:before:bg-primary",
                        "group-data-[collapsible=icon]:data-[active=true]:bg-sidebar-accent group-data-[collapsible=icon]:data-[active=true]:text-sidebar-accent-foreground group-data-[collapsible=icon]:data-[active=true]:before:hidden"
                      )}
                    >
                      <Link
                        href={route.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          isCollapsed &&
                            !isActive &&
                            " text-[hsl(var(--card-primary-foreground)/0.68)] hover:text-[hsl(var(--card-primary-foreground))]",
                          isCollapsed && isActive && "text-primary-foreground"
                        )}
                      >
                        <Icon
                          className={cn(
                            !isCollapsed && isActive && "text-[hsl(var(--primary)/0.82)]",
                            isCollapsed &&
                              !isActive &&
                              "text-[hsl(var(--card-primary-foreground)/0.68)]",
                            isCollapsed && isActive && "text-primary-foreground"
                          )}
                        />
                        <Typography
                          variant={"title"}
                          size="xs"
                          className="text-foreground group-data-[collapsible=icon]:hidden"
                        >
                          <span className="truncate">{route.title}</span>
                        </Typography>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="relative z-10 h-16 group-data-[collapsible=icon]:hidden" />
      </div>

      <SidebarRail className="cursor-ew-resize in-data-[side=left]:cursor-ew-resize in-data-[side=right]:cursor-ew-resize [[data-side=left][data-state=collapsed]_&]:cursor-ew-resize [[data-side=right][data-state=collapsed]_&]:cursor-ew-resize" />
    </Sidebar>
  );
}
