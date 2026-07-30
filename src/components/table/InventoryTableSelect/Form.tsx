"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  TName,
} from "@/components/ui/forms";
import { cn } from "@/lib/utils";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { InventoryTableSelect } from "./Base";
import type { InventoryTableSelectOption, InventoryTableSelectProps } from "./Base";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T, undefined>;
  name: TName<T>;
  label?: string;
  labelClassName?: string;
  fallback?: boolean;
} & Omit<InventoryTableSelectProps, "value">;

function InventoryTableSelectForm<T extends FieldValues>({
  form,
  name,
  label,
  labelClassName,
  fallback = false,
  ...selectProps
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
                  selectProps.disabled ? "text-muted-foreground data-[state=error]:text-destructive/60" : ""
                }`,
                selectProps.preserveDisabledAppearance && selectProps.disabled
                  ? "text-foreground data-[state=error]:text-destructive"
                  : "",
                labelClassName
              )}
            >
              {label}
            </FormLabel>
          )}

          <FormControl>
            <InventoryTableSelect
              {...selectProps}
              value={field.value ?? ""}
              className={cn(
                fieldState.error
                  ? "[&_button]:outline-none [&_button]:ring-1 [&_button]:ring-destructive/60"
                  : "",
                selectProps.className
              )}
              onChange={(value) => {
                field.onChange(value);
                selectProps.onChange?.(value);
              }}
            />
          </FormControl>

          <FormMessage className={labelClassName} fallback={fallback} />
        </FormItem>
      )}
    />
  );
}

export { InventoryTableSelectForm };
export type { InventoryTableSelectOption };
