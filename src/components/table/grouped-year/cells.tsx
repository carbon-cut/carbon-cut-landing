import { useEffect, useState } from "react";
import { useWatch, type FieldValues, type UseFormReturn } from "react-hook-form";

import { TName } from "@/components/ui/forms";
import InventoryTableInput from "../InventoryTableInput";
export { renderEditableTableRowSelectCell as renderGroupedYearRowSelectCell } from "../editable-rows/cells";

export function getGroupedYearFieldName<T extends FieldValues>({
  baseName,
  rowKey,
  year,
  subcolumnKey,
  editableRows = false,
}: {
  baseName: TName<T>;
  rowKey: string;
  year: number;
  subcolumnKey?: string;
  editableRows?: boolean;
}) {
  if (editableRows) {
    return `${baseName}.${rowKey}.value.${subcolumnKey}.value.y-${year}` as TName<T>;
  }

  // Public transport current shape: each subcolumn writes to its own matrix branch.
  if (!subcolumnKey) return `${baseName}.${rowKey}.value.y-${year}` as TName<T>;

  // Previous grouped shape, kept for existing/future grouped surfaces.
  return `${baseName}.${rowKey}.${subcolumnKey}.value.y-${year}` as TName<T>;
}

export function getGroupedYearFieldUnitPath<T extends FieldValues>({
  baseName,
  rowKey,
  subcolumnKey,
  editableRows = false,
}: {
  baseName: TName<T>;
  rowKey: string;
  subcolumnKey?: string;
  editableRows?: boolean;
}) {
  if (editableRows) {
    return `${baseName}.${rowKey}.value.${subcolumnKey}.unit` as TName<T>;
  }

  // Public transport current shape: each subcolumn writes to its own matrix branch.
  if (!subcolumnKey) return `${baseName}.${rowKey}.unit` as TName<T>;

  // Previous grouped shape, kept for existing/future grouped surfaces.
  return `${baseName}.${rowKey}.${subcolumnKey}.unit` as TName<T>;
}

export function renderGroupedYearInputCell<T extends FieldValues>({
  form,
  baseName,
  rowKey,
  year,
  subcolumnKey,
  unit,
  editableRows = false,
}: {
  form: UseFormReturn<T, undefined>;
  baseName: TName<T>;
  rowKey: string;
  year: number;
  subcolumnKey?: string;
  unit?: string | null;
  editableRows?: boolean;
}) {
  const fieldName = getGroupedYearFieldName({
    baseName,
    rowKey,
    year,
    subcolumnKey,
    editableRows,
  });
  const fieldUnitPath = getGroupedYearFieldUnitPath({
    baseName,
    rowKey,
    subcolumnKey,
    editableRows,
  });
  const watchedUnit = useWatch({
    control: form.control,
    name: fieldUnitPath,
  });

  const [fieldUnit] = useState(form?.getValues(fieldUnitPath));

  useEffect(() => {
    if (fieldUnit === undefined || fieldUnit === "") {
      form?.setValue(
        fieldUnitPath,
        // @ts-expect-error - initialization of grouped-year unit field value
        unit
      );
    }
  }, [fieldUnit, fieldUnitPath, form, unit]);

  return (
    <InventoryTableInput unitAdornment={watchedUnit} type="number" form={form} name={fieldName} />
  );
}
