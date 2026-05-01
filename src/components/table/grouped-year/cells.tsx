import type { FieldValues, UseFormReturn } from "react-hook-form";

import { TName } from "@/components/ui/forms";
import InventoryTableInput from "../InventoryTableInput";

export function getGroupedYearFieldName<T extends FieldValues>({
  baseName,
  rowKey,
  year,
  subcolumnKey,
}: {
  baseName: TName<T>;
  rowKey: string;
  year: number;
  subcolumnKey: string;
}) {
  return `${baseName}.${rowKey}.${year}.${subcolumnKey}` as TName<T>;
}

export function renderGroupedYearInputCell<T extends FieldValues>({
  form,
  baseName,
  rowKey,
  year,
  subcolumnKey,
}: {
  form: UseFormReturn<T, undefined>;
  baseName: TName<T>;
  rowKey: string;
  year: number;
  subcolumnKey: string;
}) {
  return (
    <InventoryTableInput
      type="number"
      form={form}
      name={getGroupedYearFieldName({ baseName, rowKey, year, subcolumnKey })}
    />
  );
}
