import type { FieldValues } from "react-hook-form";

import { TName } from "@/components/ui/forms";
import InventoryTableInput from "../InventoryTableInput";
import type { MatrixYearCellRendererArgs } from "./types";
import { useEffect, useState } from "react";

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

  const [fieldUnit, setFieldUnit] = useState(form?.getValues(fieldUnitPath));

  useEffect(() => {
    if (fieldUnit === undefined) {
      form?.setValue(
        fieldUnitPath,
        //@ts-expect-error - initialization of unit field value
        row.original.unit
      );
      if (row.original.unit === undefined) return;
      //@ts-expect-error - get value after initialization
      setFieldUnit(row.original.unit);
    }
  }, [fieldUnit]);

  return (
    <InventoryTableInput unitAdornment={fieldUnit} type={"number"} form={form} name={fieldName} />
  );
}
