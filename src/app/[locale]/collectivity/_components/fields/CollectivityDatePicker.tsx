"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useCurrentLocale } from "@/locales/client";
import { getDateFnsLocale } from "@/locales/dateFns";

function formatDate(date: Date | undefined, locale: string) {
  return date ? date.toLocaleDateString(locale) : "";
}

export default function CollectivityDatePicker({
  label,
  value,
  onValueChange,
  disabled = false,
  description,
  className,
}: {
  label: string;
  value: Date | undefined;
  onValueChange?: (date: Date | undefined) => void;
  disabled?: boolean;
  description?: string;
  className?: string;
}) {
  const locale = useCurrentLocale();
  const calendarLocale = getDateFnsLocale(locale);
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(value);
  const id = React.useId();

  React.useEffect(() => {
    if (value) setMonth(value);
  }, [value]);

  return (
    <div className={cn("flex w-full flex-col items-start gap-1", className)}>
      <Label
        htmlFor={id}
        className="text-caption-bold font-caption-bold leading-4 text-default-font"
      >
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="neutral-secondary"
            size="icon"
            iconRight={<CalendarIcon aria-hidden="true" className="text-subtext-color w-4 h-4" />}
            disabled={disabled}
            className={cn(
              "h-8 w-full justify-between gap-2 rounded-md border-neutral-border bg-default-background px-3 text-left text-body font-body text-default-font focus:border-brand-600 focus:outline-none disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-200 disabled:text-default-font",
              !value && "text-neutral-400"
            )}
          >
            {formatDate(value, locale)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="end" sideOffset={8}>
          <Calendar
            mode="single"
            selected={value}
            month={month}
            onMonthChange={setMonth}
            onSelect={(date) => {
              onValueChange?.(date);
              setOpen(false);
            }}
            locale={calendarLocale}
          />
        </PopoverContent>
      </Popover>
      {description ? (
        <p className="text-caption font-caption text-subtext-color">{description}</p>
      ) : null}
    </div>
  );
}
