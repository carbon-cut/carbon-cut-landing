"use client";

import { type ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { getInventoryNavIcon } from "./inventoryNavIcons";
import type { InventoryNavIconKey } from "../types";

type InventoryDomainButtonProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  active: boolean;
  iconKey: InventoryNavIconKey;
  label: string;
};

export default function InventoryDomainButton({
  active,
  iconKey,
  label,
  className,
  ...props
}: InventoryDomainButtonProps) {
  const Icon = getInventoryNavIcon(iconKey);

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      aria-pressed={active}
      className={cn(
        "bg-background w-full transition-all duration-200 relative justify-center gap-2.5 rounded-none px-5 pb-6 pt-3 h-fit hover:pb-7  hover:pt-6 text-left shadow-none hover:bg-background/60",
        active
          ? "z-10 pb-7  pt-6 hover:pt-6 hover:pb-7  rounded-t-2xl border-x border-t border-border/10 border-b-0 border-b-primary bg-card hover:bg-card/60  text-primary hover:text-primary"
          : "text-secondary hover:text-foreground",
        className
      )}
      {...props}
    >
      <Icon aria-hidden="true" className={cn("h-4 w-4", active && "text-primary")} />
      <Typography variant="label" size="sm" className="min-w-0 text-inherit leading-none">
        <span className="block truncate">{label}</span>
      </Typography>
    </Button>
  );
}
