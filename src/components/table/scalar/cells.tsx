"use client";

import { useEffect, useState } from "react";
import { useWatch, type FieldValues } from "react-hook-form";

import InventoryTableInput from "../InventoryTableInput";
import type { ScalarCellRendererArgs } from "./types";

export function renderScalarValueCell<T extends FieldValues>({
  form,
  row,
}: ScalarCellRendererArgs<T>) {
  const field = row.original.field;
  const watchedUnit = useWatch({
    control: form.control,
    name: field.unitName,
  });
  const [fieldUnit] = useState(form.getValues(field.unitName));

  useEffect(() => {
    if (fieldUnit === undefined || fieldUnit === "") {
      form.setValue(
        field.unitName,
        // @ts-expect-error - scalar table unit path is dynamic
        field.unit
      );
    }
  }, [field, fieldUnit, form]);

  return (
    <InventoryTableInput
      form={form}
      name={field.valueName}
      type={field.type ?? "number"}
      unitAdornment={watchedUnit}
    />
  );
}
