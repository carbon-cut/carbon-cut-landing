"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import type { Matcher } from "react-day-picker";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useCurrentLocale } from "@/locales/client";
import { getDateFnsLocale } from "@/locales/dateFns";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T, undefined>;
  name: TName<T>;
  placeholder?: string;
  label?: string;
  labelClassName?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  fallback?: boolean;
  required?: boolean;
  disabledDates?: Matcher | Matcher[];
};

function dateFromValue(value: string | Date | undefined) {
  if (value instanceof Date) return value;
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return Number.isNaN(date.getTime()) ? undefined : date;
}

function dateToValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDate(date: Date | undefined, locale: string) {
  return date ? date.toLocaleDateString(locale) : "";
}

export default function InventoryFieldDatePicker<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  labelClassName,
  placeholder,
  description,
  disabled = false,
  className,
  fallback = false,
  required = false,
  disabledDates,
}: Props<TFieldValues>) {
  const locale = useCurrentLocale();
  const calendarLocale = getDateFnsLocale(locale);
  const [open, setOpen] = React.useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => {
        const selectedDate = dateFromValue(field.value);

        return (
          <FormItem className="flex w-full flex-col items-start gap-1 space-y-0">
            {label ? (
              <FormLabel
                data-state={fieldState.error && "error"}
                className={cn(
                  `text-caption-bold font-caption-bold leading-4 text-default-font ${
                    disabled ? "text-neutral-400" : ""
                  }`,
                  labelClassName
                )}
              >
                {label}
                {required && <span className="text-error-600"> *</span>}
              </FormLabel>
            ) : null}

            <div className="w-full inline-block">
              <Popover open={open} onOpenChange={setOpen}>
                <div
                  className={cn(
                    "relative flex h-8 w-full items-center gap-1 rounded-md border border-solid border-neutral-border bg-default-background px-2 focus-within:border-brand-600",
                    fieldState.error ? "border-error-600" : "",
                    disabled ? "border-neutral-200 bg-neutral-200" : ""
                  )}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        ref={field.ref}
                        type="button"
                        variant="neutral-tertiary"
                        size="medium"
                        icon={
                          <CalendarIcon aria-hidden="true" className="size-4 text-subtext-color" />
                        }
                        disabled={disabled}
                        className={cn(
                          "h-full grow !justify-start rounded-none border-none bg-transparent  px-1 text-left text-body font-body text-default-font hover:bg-transparent active:bg-transparent disabled:bg-transparent disabled:text-default-font",
                          !selectedDate && "text-neutral-400",
                          className
                        )}
                        name={field.name}
                        onBlur={field.onBlur}
                      >
                        {formatDate(selectedDate, locale) || placeholder}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                </div>
                <PopoverContent className="w-auto overflow-hidden p-0" align="end" sideOffset={8}>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    defaultMonth={selectedDate}
                    onSelect={(date) => {
                      if (!date) return;
                      field.onChange(dateToValue(date));
                      field.onBlur();
                      setOpen(false);
                    }}
                    locale={calendarLocale}
                    disabled={disabledDates}
                  />
                </PopoverContent>
              </Popover>
            </div>
            {description ? <FormDescription>{description}</FormDescription> : null}
            <FormMessage fallback={fallback} data-state={disabled && "disabled"} />
          </FormItem>
        );
      }}
    />
  );
}
