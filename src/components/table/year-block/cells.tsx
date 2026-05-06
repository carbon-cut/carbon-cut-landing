"use client";

import { FieldValues, UseFormReturn } from "react-hook-form";
import InventoryTableInput from "../InventoryTableInput";
import type { InventoryTableColumn, InventoryTableRow } from "@/app/collectivity/_inventaire/types";
import { TName } from "@/components/ui/forms";

export type YearBlockEditableCellArgs<T extends FieldValues> = {
  form: UseFormReturn<T, undefined>;
  baseName: TName<T>;
  row: InventoryTableRow;
  selectedYear: number;
};

type YearBlockReadonlyCellArgs = {
  value: string;
};

type YearBlockCalculatedCellArgs = {
  value: string;
  rowLabel: string;
  yearLabel: string;
  columnLabel: string;
};

export function renderYearBlockEditableCell<T extends FieldValues>({
  form,
  baseName,
  row,
  selectedYear,
}: YearBlockEditableCellArgs<T>) {
  const yearSegment = selectedYear === undefined ? "" : `.y-${selectedYear}`;
  const fieldName = `${baseName}.value.${row.key}.value${yearSegment}` as TName<T>;

  const fieldUnitPath = `${baseName}.value.${row.key}.unit` as TName<T>;
  let fieldUnit = form.getValues(fieldUnitPath);
  if (fieldUnit === undefined) {
    form.setValue(
      fieldUnitPath,
      //@ts-expect-error - initialization of unit field value
      row.unit
    );
    //@ts-expect-error - get value after initialization
    fieldUnit = row.unit;
  }
  return (
    <InventoryTableInput form={form} name={fieldName} unitAdornment={fieldUnit} type="number" />
  );
}
