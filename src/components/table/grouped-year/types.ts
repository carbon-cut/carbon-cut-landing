import type { FieldValues, UseFormReturn } from "react-hook-form";

import type { TName } from "@/components/ui/forms";
import type { InventoryGroupedYearTableData } from "@/app/[locale]/collectivity/[planId]/inventory/types";
import type { EditableTableRowField, EditableTableRows } from "../editable-rows/types";

export type GroupedYearEditableRows = EditableTableRows;
export type GroupedYearRowField = EditableTableRowField;

export type GroupedYearTableProps<T extends FieldValues> = InventoryGroupedYearTableData & {
  form: UseFormReturn<T, undefined>;
  baseName?: TName<T>;
  baseNameBySubcolumn?: Record<string, TName<T>>;
  editableRows?: GroupedYearEditableRows;
  loadingRows?: {
    isLoading: boolean;
    count: number;
  };
  rowFields?: GroupedYearRowField[];
};
