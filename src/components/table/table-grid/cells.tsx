"use client";

import type { FieldValues } from "react-hook-form";

import type { TName } from "@/components/ui/forms";
import InventoryTableInput from "../InventoryTableInput";
import type { TableGridCellRendererArgs } from "./types";

export function NumberInputCell<T extends FieldValues>({
  form,
  baseName,
  row,
  column,
  selectedYear,
}: TableGridCellRendererArgs<T>) {
  const yearSegment = selectedYear === undefined ? "" : `.y-${selectedYear}`;
  const fieldName = `${baseName}.${row.original.key}.${column.key}.value${yearSegment}` as TName<T>;
  return (
    <InventoryTableInput form={form} name={fieldName} type="number" unitAdornment={column.unit} />
  );
}
export function TextInputCell<T extends FieldValues>({
  form,
  baseName,
  row,
  column,
}: TableGridCellRendererArgs<T>) {
  const fieldName = `${baseName}.${row.index}.key` as TName<T>;
  return (
    <InventoryTableInput form={form} name={fieldName} type="text" unitAdornment={column.unit} />
  );
}
