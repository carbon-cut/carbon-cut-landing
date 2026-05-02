import type { FieldValues } from "react-hook-form";

import { TName } from "@/components/ui/forms";
import InventoryTableInput from "../InventoryTableInput";
import type { MatrixYearCellRendererArgs } from "./types";

export function renderMatrixYearInputCell<T extends FieldValues>({
  form,
  baseName,
  row,
  year,
}: MatrixYearCellRendererArgs<T>) {
  const fieldName = `${baseName}.${row.key}.value.${year}` as TName<T>;
  const fieldUnitPath = `${baseName}.${row.key}.unit` as TName<T>;
  let fieldUnit = form.getValues(fieldUnitPath);
  if (fieldUnit === undefined) {
    form.setValue(fieldUnitPath, row.unit);
    fieldUnit = row.unit;
  }
  return (
    <InventoryTableInput unitAdornment={fieldUnit} type={"number"} form={form} name={fieldName} />
  );
}
