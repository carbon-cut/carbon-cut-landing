import type { FieldValues } from "react-hook-form";

import { TName } from "@/components/ui/forms";
import InventoryTableInput from "../InventoryTableInput";
import type { MatrixYearCellRendererArgs } from "./types";

export function renderMatrixYearInputCell<T extends FieldValues>({
  form,
  baseName,
  row,
  year,
  editableRows = false,
}: MatrixYearCellRendererArgs<T>) {
  const fieldName =
    `${baseName}.${editableRows ? `${row.index}.value` : row.original.key}.value.y-${year}` as TName<T>;
  const fieldUnitPath =
    `${baseName}.${editableRows ? `${row.index}.value` : row.original.key}.unit` as TName<T>;

  let fieldUnit = form?.getValues(fieldUnitPath);
  if (fieldUnit === undefined) {
    form?.setValue(
      fieldUnitPath,
      //@ts-expect-error - initialization of unit field value
      row.original.unit
    );
    //@ts-expect-error - get value after initialization
    fieldUnit = row.original.unit;
  }
  return (
    <InventoryTableInput unitAdornment={fieldUnit} type={"number"} form={form} name={fieldName} />
  );
}
