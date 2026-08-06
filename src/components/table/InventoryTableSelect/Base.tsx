"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type InventoryTableSelectOption = { value: string; label: string };

type InventoryTableSelectProps = {
  value?: string;
  placeholder?: string;
  ariaLabel?: string;
  options: InventoryTableSelectOption[];
  onChange?: (value: string) => void;
  size?: "xl" | "sm";
  disabled?: boolean;
  preserveDisabledAppearance?: boolean;
  className?: string;
};

export function InventoryTableSelect({
  value,
  placeholder,
  ariaLabel,
  options,
  onChange,
  size = "sm",
  disabled = false,
  preserveDisabledAppearance = false,
  className,
}: InventoryTableSelectProps) {
  return (
    <div className={cn("w-full inline-block", className)}>
      <div className="relative">
        <Select disabled={disabled} value={value ?? ""} onValueChange={onChange}>
          <SelectTrigger
            aria-label={ariaLabel}
            size={size === "sm" ? "sm" : "default"}
            className={cn(
              `w-full ${size === "xl" ? "h-9" : "h-8 !text-xs"} rounded-lg bg-muted/50`,
              preserveDisabledAppearance && disabled ? "disabled:opacity-100" : "",
              "px-3 py-1 shadow-sm focus-visible:ring-1 focus-visible:ring-ring"
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export type { InventoryTableSelectOption, InventoryTableSelectProps };
