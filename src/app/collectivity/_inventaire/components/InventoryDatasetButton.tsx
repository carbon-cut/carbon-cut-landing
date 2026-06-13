"use client";

import { type ComponentPropsWithoutRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { getInventoryNavIcon } from "./inventoryNavIcons";
import type { InventoryNavIconKey } from "../types";

type InventoryDatasetButtonProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  active: boolean;
  iconKey: InventoryNavIconKey;
  label: string;
  statusText?: string;
  badgeText?: string;
};

export default function InventoryDatasetButton({
  active,
  iconKey,
  label,
  statusText,
  badgeText,
  className,
  ...props
}: InventoryDatasetButtonProps) {
  const Icon = getInventoryNavIcon(iconKey);

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      aria-pressed={active}
      className={cn(
        "relative gap-4 h-auto w-full justify-start rounded-md border px-4 py-3 text-left shadow-none hover:bg-transparent",
        active
          ? "border-primary/30 bg-primary/5 text-foreground hover:text-foreground"
          : "border-border bg-card text-secondary hover:border-border/25 hover:text-foreground",
        className
      )}
      {...props}
    >
      <Icon aria-hidden="true" className={cn("!size-6", active && "text-primary")} />
      <div className="flex min-w-0 flex-col items-start gap-1">
        <Typography variant="label" size="sm" className="text-inherit leading-none">
          <span className="truncate">{label}</span>
        </Typography>
        {statusText || badgeText ? (
          <div className="flex items-center gap-1.5">
            {statusText ? (
              <Badge
                variant={active ? "accent" : "outline"}
                size="default"
                className={cn(
                  "pointer-events-none",
                  active
                    ? "border-primary/15 bg-primary/10 text-primary"
                    : "border-border/15 bg-muted text-secondary"
                )}
              >
                {statusText}
              </Badge>
            ) : null}
            {statusText && badgeText ? (
              <Typography variant="caption" size="xs" className="text-secondary">
                <span>&middot;</span>
              </Typography>
            ) : null}
            {badgeText ? (
              <Typography
                variant="caption"
                size="xs"
                className={cn("font-medium text-secondary", active && "text-foreground/80")}
              >
                <span>{badgeText}</span>
              </Typography>
            ) : null}
          </div>
        ) : null}
      </div>
    </Button>
  );
}
