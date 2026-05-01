"use client";

import type { FieldValues } from "react-hook-form";

import type { TName } from "@/components/ui/forms";
import InventoryTableInput from "../InventoryTableInput";
import type { TableGridCellRendererArgs } from "./types";

export function renderTableGridInputCell<T extends FieldValues>({
  form,
  name,
}: TableGridCellRendererArgs<T>) {
  return <InventoryTableInput form={form} name={name} type="number" unit="t" />;
}

export function getTableGridFieldName<T extends FieldValues>({
  baseName,
  rowKey,
  columnKey,
  selectedYear,
}: {
  baseName: TName<T>;
  rowKey: string;
  columnKey: string;
  selectedYear?: number;
}) {
  const yearSegment = selectedYear === undefined ? "" : `.${selectedYear}`;
  return `${baseName}.${rowKey}.${columnKey}${yearSegment}` as TName<T>;
}
