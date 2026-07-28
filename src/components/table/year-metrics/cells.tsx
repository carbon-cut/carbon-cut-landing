"use client";

import { useEffect, useState } from "react";
import { useWatch, type FieldValues } from "react-hook-form";

import type { TName } from "@/components/ui/forms";
import InventoryTableInput from "../InventoryTableInput";
import type { YearMetricsCellRendererArgs, YearMetricsColumn } from "./types";

function getYearMetricsColumnSegment(column: YearMetricsColumn) {
  return column.kind === "custom" ? `custom.${column.index}` : `fixed.${column.key}`;
}

export function NumberInputCell<T extends FieldValues>({
  form,
  baseName,
  row,
  column,
  selectedYear,
}: YearMetricsCellRendererArgs<T>) {
  const yearSegment = selectedYear === undefined ? "" : `.y-${selectedYear}`;
  const columnSegment = getYearMetricsColumnSegment(column);
  const fieldName =
    `${baseName}.${columnSegment}.${row.original.key}.value${yearSegment}` as TName<T>;
  const fieldUnitPath = `${baseName}.${columnSegment}.${row.original.key}.unit` as TName<T>;
  const watchedUnit = useWatch({
    control: form.control,
    name: fieldUnitPath,
  });

  const [fieldUnit] = useState(form.getValues(fieldUnitPath));

  useEffect(() => {
    if ((fieldUnit === undefined || fieldUnit === "") && row.original.unit) {
      form.setValue(
        fieldUnitPath,
        // @ts-expect-error - initialization of dynamic territorial energy unit path
        row.original.unit
      );
    }
  }, [fieldUnit, fieldUnitPath, form, row.original.unit]);

  return (
    <InventoryTableInput form={form} name={fieldName} type="number" unitAdornment={watchedUnit} />
  );
}
export function TextInputCell<T extends FieldValues>({
  form,
  baseName,
  row,
  column,
}: YearMetricsCellRendererArgs<T>) {
  const fieldName = `${baseName}.custom.${column.index}.label` as TName<T>;
  return (
    <InventoryTableInput form={form} name={fieldName} type="text" unitAdornment={column.unit} />
  );
}
