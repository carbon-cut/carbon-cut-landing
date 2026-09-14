import type { FieldValues, UseFormReturn } from "react-hook-form";
import type { Row } from "@tanstack/react-table";

import { InventoryTableSelectForm } from "../InventoryTableSelect";
import type { TName } from "@/components/ui/forms";
import type { InventoryTableRow } from "@/app/[locale]/collectivity/[planId]/inventory/types";
import type { EditableTableRowField } from "./types";

export function renderEditableTableRowSelectCell<T extends FieldValues>({
  form,
  baseName,
  row,
  field,
  disabled = false,
}: {
  form: UseFormReturn<T, undefined>;
  baseName: TName<T>;
  row: Row<InventoryTableRow>;
  field: EditableTableRowField;
  disabled?: boolean;
}) {
  const fieldName = `${baseName}.${row.index}.${field.key}` as TName<T>;
  const options = field.getOptions
    ? field.getOptions({ form: form as UseFormReturn<FieldValues, undefined>, rowIndex: row.index })
    : field.options;

  return (
    <InventoryTableSelectForm
      form={form}
      name={fieldName}
      ariaLabel={field.label}
      placeholder={field.placeholder ?? field.label}
      options={options}
      disabled={disabled}
      preserveDisabledAppearance
      onChange={(value) => {
        if (!field.unitSubcolumnKey) return;

        const option = options.find((currentOption) => currentOption.value === value);
        if (!option?.unit) return;

        form.setValue(
          `${baseName}.${row.index}.value.${field.unitSubcolumnKey}.unit` as TName<T>,
          // @ts-expect-error - dynamic editable-row unit path
          option.unit
        );
      }}
    />
  );
}
