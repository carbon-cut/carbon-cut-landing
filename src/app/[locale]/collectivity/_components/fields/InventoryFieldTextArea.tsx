import * as React from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  TName,
} from "@/components/ui/forms";
import { cn } from "@/lib/utils";
import CollectivityTextarea from "./CollectivityTextarea";

type Props<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues, undefined>;
  name: TName<TFieldValues>;
  label: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  fallback?: boolean;
  labelClassName?: string;
  className?: string;
};

export function InventoryFieldTextarea<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  labelClassName,
  placeholder,
  description,
  disabled = false,
  required = false,
  fallback = false,
  className,
}: Props<TFieldValues>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="w-full space-y-1 md:col-span-2">
          <FormLabel
            data-state={fieldState.error && "error"}
            className={cn(
              `text-caption-bold font-caption-bold leading-4 text-default-font ${
                disabled ? "text-neutral-400 data-[state=error]:text-error-700" : ""
              }`,
              labelClassName
            )}
          >
            {label}
            {required && <span className="text-error-600"> *</span>}
          </FormLabel>

          <FormControl>
            <CollectivityTextarea
              {...field}
              value={field.value ?? ""}
              disabled={disabled}
              required={required}
              placeholder={placeholder}
              className={cn(
                "min-h-[150px] w-full rounded-md border-neutral-border bg-default-background px-3 py-2 text-body font-body text-default-font shadow-none transition-colors placeholder-subframe focus-visible:border-brand-600 focus-visible:outline-none focus-visible:ring-0 aria-invalid:border-error-600 disabled:cursor-not-allowed disabled:opacity-50",
                className
              )}
            />
          </FormControl>

          {description ? <FormDescription>{description}</FormDescription> : null}
          <FormMessage fallback={fallback} data-state={disabled && "disabled"} />
        </FormItem>
      )}
    />
  );
}
