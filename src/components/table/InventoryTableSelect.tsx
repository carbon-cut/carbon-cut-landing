"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  TName,
} from "@/components/ui/forms";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FieldValues, UseFormReturn } from "react-hook-form";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T, undefined>;
  name: TName<T>;
  placeholder?: string;
  label?: string;
  ariaLabel?: string;
  options: Array<{ value: string; label: string }>;
  onChange?: (value: string) => void;
  size?: "xl" | "sm";
  disabled?: boolean;
  preserveDisabledAppearance?: boolean;
  labelClassName?: string;
  className?: string;
  fallback?: boolean;
};

function InventoryTableSelect<T extends FieldValues>({
  form,
  name,
  label,
  ariaLabel,
  labelClassName,
  placeholder,
  options,
  onChange,
  size = "sm",
  disabled = false,
  preserveDisabledAppearance = false,
  className,
  fallback = false,
}: Props<T>) {
  return (
    <FormField
      control={form ? form.control : undefined}
      name={name ?? ""}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && (
            <FormLabel
              data-state={fieldState.error && "error"}
              className={cn(
                `text-sm font-medium ${
                  disabled ? "text-muted-foreground data-[state=error]:text-destructive/60" : ""
                }`,
                preserveDisabledAppearance && disabled
                  ? "text-foreground data-[state=error]:text-destructive"
                  : "",
                labelClassName
              )}
            >
              {label}
            </FormLabel>
          )}

          <div className={cn("w-full inline-block", className)}>
            <FormControl>
              <div className="relative">
                <Select
                  disabled={disabled}
                  value={field.value ?? ""}
                  onValueChange={(value) => {
                    field.onChange(value);
                    onChange?.(value);
                  }}
                >
                  <SelectTrigger
                    aria-label={ariaLabel}
                    size={size === "sm" ? "sm" : "default"}
                    className={cn(
                      `w-full ${size === "xl" ? "h-9" : "h-8 !text-xs"} rounded-lg bg-muted/50 ${
                        fieldState.error ? "outline-none ring-1 ring-destructive/60" : ""
                      }`,
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
            </FormControl>
          </div>

          <FormMessage className={labelClassName} fallback={fallback} />
        </FormItem>
      )}
    />
  );
}

export default InventoryTableSelect;
