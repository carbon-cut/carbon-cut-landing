"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type YearSelectorProps = {
  years: number[];
  selectedYear?: number;
  onSelectYear: (year: number) => void;
  ariaLabel?: string;
  className?: string;
  errorYears?: readonly number[];
};

export default function YearSelector({
  years,
  selectedYear,
  onSelectYear,
  ariaLabel = "years",
  className,
  errorYears = [],
}: YearSelectorProps) {
  return (
    <Tabs
      value={String(selectedYear ?? years[0] ?? "")}
      onValueChange={(value) => onSelectYear(Number(value))}
    >
      <TabsList
        aria-label={ariaLabel}
        className={
          className ?? "grid grid-cols-[repeat(auto-fit,minmax(50px,1fr))] gap-3 min-h-9 h-fit"
        }
      >
        {years.map((year) => {
          const hasError = errorYears.includes(year);

          return (
            <TabsTrigger
              key={year}
              value={String(year)}
              aria-invalid={hasError}
              className={cn(
                "relative",
                hasError &&
                  "border-destructive/60 text-destructive data-[state=active]:border-primary data-[state=active]:text-primary"
              )}
            >
              {year}
              {hasError ? (
                <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-destructive" />
              ) : null}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
