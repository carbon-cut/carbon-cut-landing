import * as React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

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
import CollectivitySelect from "./CollectivitySelect";

export function InventoryFieldSelect<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  options,
  description,
  required = false,
  disabled = false,
  value,
  onValueChange,
  showError = true,
}: {
  form: UseFormReturn<TFieldValues, undefined>;
  name: TName<TFieldValues>;
  label: string;
  placeholder: string;
  options: Array<{ value: string; label: React.ReactNode }>;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  showError?: boolean;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="w-full space-y-1">
          <FormLabel
            data-state={showError && fieldState.error && "error"}
            className={cn(
              `text-caption-bold font-caption-bold leading-4 text-default-font ${
                disabled ? "text-neutral-400 data-[state=error]:text-error-700" : ""
              }`
            )}
          >
            {label}
            {required ? <span className="text-error-600"> *</span> : null}
          </FormLabel>
          <FormControl>
            <CollectivitySelect
              value={value ?? field.value ?? ""}
              onValueChange={(nextValue) => {
                if (onValueChange) {
                  onValueChange(nextValue);
                  return;
                }
                field.onChange(nextValue);
              }}
              placeholder={placeholder}
              options={options}
              disabled={disabled}
              aria-invalid={showError && !!fieldState.error}
            />
          </FormControl>
          {description ? <FormDescription>{description}</FormDescription> : null}
          {showError ? <FormMessage data-state={disabled && "disabled"} /> : null}
        </FormItem>
      )}
    />
  );
}
