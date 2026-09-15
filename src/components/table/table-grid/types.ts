import type { ReactNode } from "react";

import type { FieldValues, UseFormReturn } from "react-hook-form";

import type { TName } from "@/components/ui/forms";
import type {
  InventoryTableColumn,
  InventoryTableRow,
} from "@/app/[locale]/collectivity/[planId]/inventory/types";
import { Row } from "@tanstack/react-table";
import type {
  EditableTableRowField,
  EditableTableRows,
  EditableTableRowState,
} from "../editable-rows/types";

export type TableGridRow = InventoryTableRow & { id?: string };
export type TableGridColumn = InventoryTableColumn & { type?: "number" | "text"; id?: string };
export type TableGridCellRendererArgs<T extends FieldValues> = {
  form: UseFormReturn<T, undefined>;
  baseName: TName<T>;
  row: Row<TableGridRow>;
  column: TableGridColumn;
  name: TName<T>;
  selectedYear?: number;
  editableRows?: boolean;
};

export type TableGridCellRenderer<T extends FieldValues> = (
  args: TableGridCellRendererArgs<T>
) => ReactNode;

export type TableGridProps<T extends FieldValues> = {
  title?: string;
  description?: string;
  className?: string;
  rows: TableGridRow[];
  columns: TableGridColumn[];
  form: UseFormReturn<T, undefined>;
  baseName: TName<T>;
  selectedYear?: number;
  yearSelector?: {
    datasetKey: string;
    years: number[];
    initialYear?: number;
    ariaLabel?: string;
    className?: string;
  };
  editableRows?:
    | EditableTableRows
    | {
        minRows: number;
        onRemoveRow: (index: number) => void;
      };
  editableRowState?: EditableTableRowState;
  rowFields?: EditableTableRowField[];
  addRow?: {
    label: string;
    onAdd: () => void;
  };
  renderCell?: TableGridCellRenderer<T>;
};
