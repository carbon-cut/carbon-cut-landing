import {
  type ArrayPath,
  type FieldValues,
  type UseFormReturn,
  useFieldArray,
} from "react-hook-form";

import type { TName } from "@/components/ui/forms";
import type { EditableTableRows } from "./types";

export function useEditableTableRows<T extends FieldValues>({
  form,
  baseName,
  editableRows,
}: {
  form: UseFormReturn<T, undefined>;
  baseName: TName<T>;
  editableRows: EditableTableRows;
}) {
  const { fields, append, insert, remove } = useFieldArray({
    control: form.control,
    name: baseName as ArrayPath<T>,
  });
  const rowKeyFieldName = editableRows.rowKeyFieldName ?? "key";
  const appendRow = (row: Record<string, unknown>) => {
    // @ts-expect-error - dynamic table row structure comes from the surface config
    append(row, { shouldFocus: true });
  };
  const insertRow = (index: number, row: Record<string, unknown>) => {
    // @ts-expect-error - dynamic table row structure comes from the surface config
    insert(index, row, { shouldFocus: true });
  };

  return {
    fields,
    remove,
    rowKeyFieldName,
    appendRow,
    insertRow,
    addEmptyRow: () => appendRow({ [rowKeyFieldName]: "", value: {} }),
  };
}
