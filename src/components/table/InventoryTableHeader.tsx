"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type InventoryTableHeaderProps = {
  title?: ReactNode;
  description?: string;
  titleAs?: "h4" | "h5";
  titleSize?: "sm" | "xl";
  endContent?: ReactNode;
  className?: string;
};

export function InventoryTableHeader({
  title,
  description,
  titleAs: TitleTag = "h4",
  endContent,
  className,
}: InventoryTableHeaderProps) {
  if (!title && !description && !endContent) {
    return null;
  }

  return (
    <div
      className={cn("flex flex-wrap items-start justify-between gap-3 lg:flex-nowrap", className)}
    >
      <div>
        {title ? (
          <Typography asChild variant="heading3">
            <TitleTag>{title}</TitleTag>
          </Typography>
        ) : null}
        {description ? (
          <Typography asChild variant="bodySubframe" className="text-secondary">
            <p>{description}</p>
          </Typography>
        ) : null}
      </div>

      {endContent ? <div className="flex flex-wrap items-center gap-2">{endContent}</div> : null}
    </div>
  );
}

type InventoryTableActionButtonProps = ComponentPropsWithoutRef<typeof Button>;

export function InventoryTableActionButton({
  className,
  children,
  ...props
}: InventoryTableActionButtonProps) {
  return (
    <Button variant="brand-secondary" size="medium" className={cn("", className)} {...props}>
      {children}
    </Button>
  );
}

type InventoryTableIconButtonProps = ComponentPropsWithoutRef<typeof Button>;

export function InventoryTableIconButton({
  className,
  children,
  variant = "destructive-tertiary",
  ...props
}: InventoryTableIconButtonProps) {
  return (
    <Button
      variant={variant}
      size="icon"
      className={cn("h-8 w-8 rounded-full", className)}
      {...props}
    >
      {children}
    </Button>
  );
}
