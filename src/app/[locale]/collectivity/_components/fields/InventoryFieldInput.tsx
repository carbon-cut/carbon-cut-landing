"use client";

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
import { Input as InputRoot, type InputIcon } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T, undefined>;
  name: TName<T>;
  placeholder?: string;
  label?: string;
  description?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  icon?: InputIcon;
  unitAdornment?: React.ReactNode;
  unitAdornmentPlacement?: "start" | "end";
  disabled?: boolean;
  onChange?: (v: any) => void;
  onBlur?: (value: string) => void;
  size?: "xl" | "sm";
  labelClassName?: string;
  className?: string;
  fallback?: boolean;
  valueControl?: (v: any) => boolean;
  required?: boolean;
};

function InventoryFieldInput<T extends FieldValues>({
  form,
  name,
  label,
  labelClassName,
  placeholder,
  description,
  type,
  icon,
  unitAdornment,
  unitAdornmentPlacement = "end",
  disabled = false,
  onChange,
  onBlur,
  size = "xl",
  className,
  fallback = false,
  required = false,
  valueControl = (v: any) => v >= 0 || v === "",
}: Props<T>) {
  const unitRef = React.useRef<HTMLSpanElement>(null);
  const [unitPx, setUnitPx] = React.useState<number>(0);

  React.useLayoutEffect(() => {
    if (!unitAdornment) {
      if (unitPx !== 0) setUnitPx(0);
      return;
    }

    const el = unitRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const computed = Math.ceil(rect.width) + 10 + 2.5;
      if (computed !== unitPx) setUnitPx(computed);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitAdornment]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="space-y-1 w-full">
          {label ? (
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
          ) : null}

          <div className={cn("w-full inline-block")}>
            <FormControl>
              <div
                className={cn(
                  "relative flex h-8 w-full items-center gap-1 rounded-md border border-solid border-neutral-border bg-default-background px-2 focus-within:border-brand-600",
                  fieldState.error ? "border-error-600" : "",
                  disabled ? "border-neutral-200 bg-neutral-200" : ""
                )}
              >
                <div className="flex grow shrink-0 basis-0 self-stretch px-1">
                  <InputRoot
                    ref={field.ref}
                    icon={icon}
                    disabled={disabled}
                    required={required}
                    placeholder={placeholder}
                    type={type}
                    value={field.value ?? ""}
                    style={
                      unitAdornment && unitPx
                        ? ({
                            ...(unitAdornmentPlacement === "end"
                              ? { paddingRight: `${unitPx}px` }
                              : { paddingLeft: `${unitPx}px` }),
                          } as React.CSSProperties)
                        : undefined
                    }
                    className={cn(
                      "h-full rounded-none border-none bg-transparent px-0 py-0 shadow-none",
                      unitAdornment
                        ? unitPx
                          ? ""
                          : unitAdornmentPlacement === "end"
                            ? "pr-16"
                            : "pl-16"
                        : "",
                      size === "sm" ? "text-xs" : "",
                      className
                    )}
                    inputMode={type === "number" ? "decimal" : undefined}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      if (type === "number") {
                        const value = event.target.value;

                        if (value === "") {
                          field.onChange("");
                          onChange?.("");
                          return;
                        }

                        if (!valueControl(value)) return;

                        const parsedValue = Number(value);
                        if (!Number.isNaN(parsedValue)) {
                          field.onChange(parsedValue);
                          onChange?.(parsedValue);
                        }
                        return;
                      }

                      field.onChange(event.target.value);
                      onChange?.(event.target.value);
                    }}
                    onBlur={(event) => {
                      field.onBlur();
                      onBlur?.(event.target.value);
                    }}
                    name={field.name}
                  />
                </div>

                {unitAdornment ? (
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-y-0 flex items-center",
                      unitAdornmentPlacement === "end" ? "right-2.5" : "left-2.5"
                    )}
                  >
                    <span
                      ref={unitRef}
                      className={cn(
                        "rounded-full border border-input bg-muted/50 px-2 text-xs font-medium text-foreground/70",
                        size === "xl" ? "h-6 leading-6" : "h-5 leading-5"
                      )}
                    >
                      {unitAdornment}
                    </span>
                  </div>
                ) : null}
              </div>
            </FormControl>
          </div>

          {description ? <FormDescription>{description}</FormDescription> : null}
          <FormMessage fallback={fallback} data-state={disabled && "disabled"} />
        </FormItem>
      )}
    />
  );
}

export default InventoryFieldInput;
