"use client";

import type { FieldValues } from "react-hook-form";

import type { TName } from "@/components/ui/forms";
import InventoryTableInput from "../InventoryTableInput";
import type { TableGridCellRendererArgs } from "./types";

export function renderTableGridInputCell<T extends FieldValues>({
  form,
  baseName,
  row,
  column,
  selectedYear,
}: TableGridCellRendererArgs<T>) {
  const yearSegment = selectedYear === undefined ? "" : `.y-${selectedYear}`;
  const fieldName = `${baseName}.${row.key}.${column.key}.value${yearSegment}` as TName<T>;

  return (
    <InventoryTableInput form={form} name={fieldName} type="number" unitAdornment={column.unit} />
  );
}
