"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type InventoryTableHeaderProps = {
  title?: string;
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
          <Typography asChild variant="sectionTitle" size={"lg"}>
            <TitleTag>{title}</TitleTag>
          </Typography>
        ) : null}
        {description ? (
          <Typography asChild variant="description" size="sm" className={" font-normal"}>
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
    <Button
      variant="outline"
      size="sm"
      className={cn("h-8 rounded-full px-3 shadow-none", className)}
      {...props}
    >
      {children}
    </Button>
  );
}

type InventoryTableIconButtonProps = ComponentPropsWithoutRef<typeof Button>;

export function InventoryTableIconButton({
  className,
  children,
  ...props
}: InventoryTableIconButtonProps) {
  return (
    <Button variant="ghost" size="icon" className={cn("h-8 w-8", className)} {...props}>
      {children}
    </Button>
  );
}
