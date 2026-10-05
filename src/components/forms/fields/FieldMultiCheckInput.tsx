"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  TName,
} from "@/components/ui/forms";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import React from "react";
import { CheckedState } from "@radix-ui/react-checkbox";
import { FieldValues, UseFormReturn } from "react-hook-form";

type InputType = React.HTMLInputTypeAttribute | undefined;

type Props<T extends FieldValues, Name extends TName<T>, Value extends string> = {
  form: UseFormReturn<T, undefined>;
  name: Name;
  label?: string;
  mandatory?: boolean;
  type?: InputType;
  options: {
    label: string;
    value: `${Name}.${Value}` extends TName<T> ? `${Value}` : never;
    unit?: string;
  }[];
  disabled?: boolean;
  onChange?: (v: CheckedState) => void;
  className?: string;
  disableError?: boolean;
};

export function FieldMultiCheckInput<
  T extends FieldValues,
  Name extends TName<T>,
  Value extends string,
>({
  form,
  name,
  type,
  options,
  disabled,
  onChange,
  className,
  disableError = false,
}: Props<T, Name, Value>) {
  const checked = (value: string) => {
    const currentValue = form.getValues(`${name}.${value}` as TName<T>);
    return Boolean(currentValue);
  };

  const onCheckedChange = React.useCallback(
    (value: string) => {
      return (isChecked: CheckedState) => {
        if (isChecked) {
          form.setValue(
            `${name}.${value}` as TName<T>,
            // @ts-expect-error controlled shape from schema
            type === "number" ? 0 : type === "boolean" ? true : {}
          );
        } else {
          form.setValue(
            `${name}.${value}` as TName<T>,
            // @ts-expect-error controlled shape from schema
            type === "number" ? null : type === "boolean" ? false : undefined
          );
        }
        onChange?.(isChecked);
      };
    },
    [form, name, type, onChange]
  );

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-row flex-wrap justify-between gap-y-3 px-20",
        className
      )}
    >
      {options.map(({ label, value }) => (
        <FormField
          control={form.control}
          name={`${name}.${value}` as TName<T>}
          key={value}
          render={({ fieldState }) => (
            <FormItem className="w-6/12">
              <FormControl>
                <div
                  className={cn(
                    "flex items-center justify-between rounded-full border border-border bg-card px-3 py-2",
                    fieldState.error && !disableError ? "border-destructive/60" : ""
                  )}
                >
                  <FormLabel
                    data-state={fieldState.error && !disableError ? "error" : undefined}
                    className="text-sm font-medium"
                  >
                    {label}
                  </FormLabel>
                  <Switch
                    disabled={disabled}
                    checked={checked(value)}
                    onCheckedChange={onCheckedChange(value)}
                    aria-label={label}
                  />
                </div>
              </FormControl>
              {!disableError && <FormMessage />}
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
