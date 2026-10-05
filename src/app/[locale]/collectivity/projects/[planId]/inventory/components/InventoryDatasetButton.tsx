"use client";

import { type ComponentPropsWithoutRef } from "react";
import { CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { getInventoryDatasetNavIcon } from "./inventoryNavIcons";

type InventoryDatasetButtonProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  active: boolean;
  hasError: boolean;
  isComplete: boolean;
  datasetKey: string;
  label: string;
  statusText?: string;
  badgeText?: string;
  progressPercent?: number;
};

export default function InventoryDatasetButton({
  active,
  hasError,
  isComplete,
  datasetKey,
  label,
  statusText,
  badgeText,
  progressPercent,
  className,
  ...props
}: InventoryDatasetButtonProps) {
  const Icon = getInventoryDatasetNavIcon(datasetKey);
  const isTodo = progressPercent === 0;
  const showSuccess = isComplete && !hasError;

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      aria-pressed={active}
      aria-invalid={hasError}
      className={cn(
        "relative h-auto w-full justify-start gap-4 rounded-md border px-4 py-3 text-left shadow-none transition-colors",
        hasError
          ? active
            ? "border-destructive/35 bg-destructive/5 text-foreground hover:border-destructive/35 hover:bg-destructive/10 hover:text-foreground"
            : "border-destructive/25 bg-card text-secondary hover:border-destructive/35 hover:bg-destructive/5 hover:text-foreground"
          : isTodo
            ? active
              ? "border-amber-300 bg-amber-50 text-foreground hover:border-amber-300 hover:bg-amber-100/80 hover:text-foreground"
              : "border-amber-200 bg-card text-secondary hover:border-amber-300 hover:bg-amber-50/70 hover:text-foreground"
            : showSuccess
              ? active
                ? "border-primary/30 bg-primary/5 text-foreground hover:border-primary/30 hover:bg-primary/10 hover:text-foreground"
                : "border-primary/20 bg-card text-secondary hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
              : active
                ? "border-primary/30 bg-primary/5 text-foreground hover:border-primary/30 hover:bg-primary/10 hover:text-foreground"
                : "border-border bg-card text-secondary hover:border-primary/20 hover:bg-primary/5 hover:text-foreground",
        className
      )}
      {...props}
    >
      <Icon
        aria-hidden="true"
        className={cn(
          "!size-6",
          hasError
            ? "text-destructive"
            : isTodo
              ? "text-amber-700"
              : showSuccess
                ? "text-primary"
                : active && "text-primary"
        )}
      />
      <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
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
                  hasError
                    ? "border-destructive/15 bg-destructive/10 text-destructive"
                    : isTodo
                      ? "border-amber-200 bg-amber-50 text-amber-700"
                      : showSuccess
                        ? "border-primary/15 bg-primary/10 text-primary"
                        : active
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
                className={cn(
                  "font-medium text-secondary",
                  hasError
                    ? "text-destructive"
                    : isTodo
                      ? "text-amber-700"
                      : showSuccess
                        ? "text-primary"
                        : active && "text-foreground/80"
                )}
              >
                <span>{badgeText}</span>
              </Typography>
            ) : null}
          </div>
        ) : null}
      </div>
      {showSuccess ? (
        <CheckCircle2 aria-hidden="true" className="ml-auto !size-5 text-primary" />
      ) : null}
    </Button>
  );
}
