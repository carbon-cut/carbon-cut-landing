"use client";

import { useMemo } from "react";
import type { ReactNode } from "react";
import { useFormState } from "react-hook-form";

import YearSelector from "@/components/table/year-selector";

import { useInventoryContext } from "../context/inventory-context";
import {
  getInventoryDatasetErrorYears,
  getInventoryDatasetYearErrorSignature,
} from "../inventoryErrors";

type InventoryYearSelectorProps = {
  datasetKey: string;
  years: number[];
  selectedYear?: number;
  onSelectYear: (year: number) => void;
  ariaLabel?: string;
  className?: string;
};

type InventoryYearErrorsProps = {
  datasetKey: string;
  years: number[];
  children: (errorYears: number[]) => ReactNode;
};

function useInventoryYearErrors(datasetKey: string, years: number[]) {
  const { mainForm } = useInventoryContext();
  const { errors, isValidating } = useFormState({ control: mainForm.control });
  const yearErrorSignature = getInventoryDatasetYearErrorSignature(datasetKey, errors, years);

  return useMemo(
    () => getInventoryDatasetErrorYears(datasetKey, errors, years),
    // RHF keeps the errors object reference stable; use primitive signals instead.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [datasetKey, isValidating, yearErrorSignature, years]
  );
}

export default function InventoryYearSelector({
  datasetKey,
  years,
  selectedYear,
  onSelectYear,
  ariaLabel,
  className,
}: InventoryYearSelectorProps) {
  const errorYears = useInventoryYearErrors(datasetKey, years);

  return (
    <YearSelector
      years={years}
      selectedYear={selectedYear}
      onSelectYear={onSelectYear}
      ariaLabel={ariaLabel}
      className={className}
      errorYears={errorYears}
    />
  );
}

export function InventoryYearErrors({ datasetKey, years, children }: InventoryYearErrorsProps) {
  return <>{children(useInventoryYearErrors(datasetKey, years))}</>;
}
