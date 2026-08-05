import type { ReactNode } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

import type { TName } from "@/components/ui/forms";
import type { InventoryGroupedYearTableData } from "@/app/collectivity/[planId]/inventory/types";
import type { MatrixRowField } from "../matrix/types";

export type GroupedYearEditableRows = {
  addLabel: string;
  showAddButton?: boolean;
  minRows?: number;
  rowLabelPrefix?: string;
  rowKeyFieldName?: string;
  canRemoveRow?: (row: unknown, index: number) => boolean;
  isFieldDisabled?: (row: unknown, fieldKey: string, index: number) => boolean;
  renderFooterContent?: (args: {
    rowKeyFieldName: string;
    rows: unknown[];
    appendRow: (row: Record<string, unknown>) => void;
    insertRow: (index: number, row: Record<string, unknown>) => void;
  }) => ReactNode;
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
  loadingRows?: {
    isLoading: boolean;
    count: number;
  };
  rowFields?: GroupedYearRowField[];
};
