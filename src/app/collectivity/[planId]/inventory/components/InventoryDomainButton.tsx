"use client";

import { type ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { getInventoryNavIcon } from "./inventoryNavIcons";
import type { InventoryNavIconKey } from "../types";

type InventoryDomainButtonProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  active: boolean;
  hasError: boolean;
  iconKey: InventoryNavIconKey;
  label: string;
};

export default function InventoryDomainButton({
  active,
  hasError,
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
      aria-invalid={hasError}
      className={cn(
        "bg-background w-full transition-all duration-200 relative justify-center gap-2.5 rounded-none px-5 pb-[1.75rem] h-16 mt-4 hover:mt-1 hover:h-[4.25rem] hover:pt-[0.25rem] text-left shadow-none hover:bg-background/60",
        hasError
          ? active
            ? "z-10 h-[4.5rem] pt-[0.5rem] mt-0 hover:h-[4.5rem] hover:pt-[0.5rem] hover:mt-0 rounded-t-2xl border-x border-t border-destructive/25 border-b-0 bg-card text-destructive hover:bg-card/60 hover:text-destructive"
            : "text-destructive hover:text-destructive"
          : active
            ? "z-10 h-[4.5rem] pt-[0.5rem] mt-0 hover:h-[4.5rem] hover:pt-[0.5rem] hover:mt-0  rounded-t-2xl border-x border-t border-border/10 border-b-0 border-b-primary bg-card hover:bg-card/60  text-primary hover:text-primary"
            : "text-secondary hover:text-foreground",
        className
      )}
      {...props}
    >
      <div className="flex flex-row items-center justify-center gap-1  w-full">
        <Icon
          aria-hidden="true"
          className={cn("h-4 w-4", hasError ? "text-destructive" : active && "text-primary")}
        />
        <Typography variant="label" size="sm" className="min-w-0 text-inherit block truncate">
          {label}
        </Typography>
      </div>
    </Button>
  );
}

//px-5 pb-6 pt-3 h-fit hover:pb-7  hover:pt-6
//pb-7  pt-6 hover:pt-6 hover:pb-7
