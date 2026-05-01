"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type YearSelectorProps = {
  years: number[];
  selectedYear?: number;
  onSelectYear: (year: number) => void;
  ariaLabel?: string;
  className?: string;
};

export default function YearSelector({
  years,
  selectedYear,
  onSelectYear,
  ariaLabel = "Annees",
  className,
}: YearSelectorProps) {
  return (
    <Tabs
      value={String(selectedYear ?? years[0] ?? "")}
      onValueChange={(value) => onSelectYear(Number(value))}
    >
      <TabsList aria-label={ariaLabel} className={className ?? "flex flex-wrap gap-3"}>
        {years.map((year) => (
          <TabsTrigger key={year} value={String(year)}>
            {year}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
