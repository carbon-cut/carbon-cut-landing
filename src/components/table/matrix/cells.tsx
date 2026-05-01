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
  return (
    <InventoryTableInput
      unitAdornment={"wew"}
      type={"number"}
      form={form}
      name={`${baseName}.${row.key}.${year}` as TName<T>}
    />
  );
}
