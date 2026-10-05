import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  TName,
} from "@/components/ui/forms";
import { Input as InputRoot } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import React, { useLayoutEffect, useRef, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T, undefined>;
  name: TName<T>;
  placeholder?: string;
  label?: string;
  description?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  /**
   * Inline unit token rendered inside the input (preferred unit depiction).
   * Use this instead of putting units in placeholders.
   */
  unitAdornment?: React.ReactNode;
  unitAdornmentPlacement?: "start" | "end";
  unit?: React.ReactNode;
  info?: React.ReactNode;
  onChange?: (v: any) => void;
  size?: "xl" | "sm";
  disabled?: boolean;
  labelClassName?: string;
  valueControl?: (v: any) => boolean;
  className?: string;
  fallback?: boolean;
  attachedFields?: TName<T>[];
  isError?: boolean;
};

function FieldInput<T extends FieldValues>({
  form,
  name,
  label,
  labelClassName,
  placeholder,
  description,
  type,
  unitAdornment,
  unitAdornmentPlacement = "end",
  unit = <></>,
  info,
  onChange,
  size = "xl",
  disabled = false,
  className,
  fallback = false,
  isError = false,
  attachedFields = [],
  valueControl = (v: any) => v >= 0 || v === "",
}: Props<T>) {
  const {
    trigger,
    formState: { isSubmitted },
  } = form;

  const verifyAttachedFields = () => {
    if (isSubmitted || isError) {
      void trigger(attachedFields);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const unitRef = useRef<HTMLSpanElement>(null);
  const [unitPx, setUnitPx] = useState<number>(0);
  const hasUnitBelow = React.Children.toArray(unit).length > 0;

  // Measure unit chip width so padding always matches, regardless of token length.
  useLayoutEffect(() => {
    if (!unitAdornment) {
      if (unitPx !== 0) setUnitPx(0);
      return;
    }
    const el = unitRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      // Add gap between text and chip + container inset (right/left-2.5 ~= 10px).
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
        <FormItem>
          {label && (
            <FormLabel
              data-state={fieldState.error && "error"}
              className={cn(
                `text-sm font-medium ${
                  disabled ? "text-muted-foreground data-[state=error]:text-destructive/60" : ""
                }`,
                labelClassName
              )}
            >
              {label}
            </FormLabel>
          )}

          <div className={cn("w-full inline-block", className)}>
            <FormControl>
              <div className="relative">
                <InputRoot
                  disabled={disabled}
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
                    `w-full ${size === "xl" ? "h-9" : "h-8 !text-xs"} rounded-full bg-card ${
                      fieldState.error ? "outline-none ring-1 ring-destructive/60" : ""
                    }`,
                    unitAdornment
                      ? unitPx
                        ? ""
                        : unitAdornmentPlacement === "end"
                          ? "pr-16"
                          : "pl-16"
                      : ""
                  )}
                  placeholder={placeholder}
                  type={type}
                  {...field}
                  ref={(node) => {
                    inputRef.current = node;
                    field.ref(node);
                  }}
                  value={field.value ?? ""}
                  {...(type === "number"
                    ? {
                        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                          const val = event.target.value;

                          if (val === "") {
                            field.onChange("");
                            onChange?.("");
                            verifyAttachedFields();
                            return;
                          }

                          if (!valueControl(val)) {
                            return;
                          }

                          const parsedValue = Number(val);
                          if (!Number.isNaN(parsedValue)) {
                            field.onChange(parsedValue);
                            onChange?.(parsedValue);
                            verifyAttachedFields();
                          }
                        },
                      }
                    : {
                        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                          field.onChange(event.target.value);
                          onChange?.(event.target.value);
                          verifyAttachedFields();
                        },
                      })}
                />

                {unitAdornment && (
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
                )}
              </div>
            </FormControl>

            {(hasUnitBelow || info) && (
              <div className="grid grid-cols-2 h-fit">
                {hasUnitBelow ? unit : null}
                {info && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="self-end place-self-start p-0 text-start" variant="ghost">
                        <Info />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent side="right" sideOffset={8}>
                      {info}
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            )}
          </div>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage
            className={labelClassName}
            fallback={fallback}
            data-state={disabled && "disabled"}
          />
        </FormItem>
      )}
    />
  );
}

export default FieldInput;
