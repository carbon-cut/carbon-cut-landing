import { useWatch, type FieldValues } from "react-hook-form";

import { TName } from "@/components/ui/forms";
import InventoryTableInput from "../InventoryTableInput";
import InventoryTableSelect from "../InventoryTableSelect";
import type { MatrixRowField, MatrixYearCellRendererArgs, MatrixTableRow } from "./types";
import { useEffect, useState } from "react";
import type { Row } from "@tanstack/react-table";
import type { UseFormReturn } from "react-hook-form";

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
  const watchedUnit = useWatch({
    control: form.control,
    name: fieldUnitPath,
  });

  const [fieldUnit] = useState(form?.getValues(fieldUnitPath));

  useEffect(() => {
    if ((fieldUnit === undefined || fieldUnit === "") && row.original.unit) {
      form?.setValue(
        fieldUnitPath,
        //@ts-expect-error - initialization of unit field value
        row.original.unit
      );
    }
  }, [fieldUnit]);

  return (
    <InventoryTableInput unitAdornment={watchedUnit} type={"number"} form={form} name={fieldName} />
  );
}

export function renderMatrixRowSelectCell<T extends FieldValues>({
  form,
  baseName,
  row,
  field,
  editableRows = false,
}: {
  form: UseFormReturn<T, undefined>;
  baseName: TName<T>;
  row: Row<MatrixTableRow>;
  field: MatrixRowField;
  editableRows?: boolean;
}) {
  const fieldName =
    `${baseName}.${editableRows ? `${row.index}.value` : row.original.key}.${field.key}` as TName<T>;
  const fieldUnitPath =
    `${baseName}.${editableRows ? `${row.index}.value` : row.original.key}.unit` as TName<T>;

  return (
    <InventoryTableSelect
      form={form}
      name={fieldName}
      ariaLabel={field.label}
      placeholder={field.placeholder ?? field.label}
      options={field.options}
      onChange={(value) => {
        const option = field.options.find((currentOption) => currentOption.value === value);
        if (!option?.unit) return;

        form.setValue(
          fieldUnitPath,
          // @ts-expect-error - dynamic matrix row unit path
          option.unit
        );
      }}
    />
  );
}
