import type { FieldValues, UseFormReturn } from "react-hook-form";

import type { TName } from "@/components/ui/forms";
import type { InventoryGroupedYearTableData } from "@/app/collectivity/[planId]/inventory/types";
import type { MatrixRowField } from "../matrix/types";

export type GroupedYearEditableRows = {
  addLabel: string;
  minRows?: number;
  rowLabelPrefix?: string;
  rowKeyFieldName?: string;
  canRemoveRow?: (row: unknown, index: number) => boolean;
  isFieldDisabled?: (row: unknown, fieldKey: string, index: number) => boolean;
};

export type GroupedYearRowField = MatrixRowField & {
  unitSubcolumnKey?: string;
  getOptions?: (args: {
    form: UseFormReturn<any, undefined>;
    rowIndex: number;
  }) => Array<{ value: string; label: string; unit?: string }>;
};

export type GroupedYearTableProps<T extends FieldValues> = InventoryGroupedYearTableData & {
  form: UseFormReturn<T, undefined>;
  baseName?: TName<T>;
  baseNameBySubcolumn?: Record<string, TName<T>>;
  editableRows?: GroupedYearEditableRows;
  rowFields?: GroupedYearRowField[];
};
