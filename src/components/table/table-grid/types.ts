import type { ReactNode } from "react";

import type { FieldValues, UseFormReturn } from "react-hook-form";

import type { TName } from "@/components/ui/forms";
import type { InventoryTableColumn, InventoryTableRow } from "@/app/collectivity/_inventaire/types";

export type TableGridRow = InventoryTableRow;

export type TableGridCellRendererArgs<T extends FieldValues> = {
  form: UseFormReturn<T, undefined>;
  baseName: TName<T>;
  row: TableGridRow;
  column: InventoryTableColumn;
  name: TName<T>;
  selectedYear?: number;
};

export type TableGridCellRenderer<T extends FieldValues> = (
  args: TableGridCellRendererArgs<T>
) => ReactNode;

export type TableGridProps<T extends FieldValues> = {
  title?: string;
  description?: string;
  className?: string;
  rows: TableGridRow[];
  columns: InventoryTableColumn[];
  form: UseFormReturn<T, undefined>;
  baseName: TName<T>;
  yearSelector?: {
    years: number[];
    initialYear?: number;
    ariaLabel?: string;
    className?: string;
  };
  editableRows?: {
    minRows: number;
    onRemoveRow: (rowKey: string) => void;
  };
  addRow?: {
    label: string;
    onAdd: () => void;
  };
  renderCell?: TableGridCellRenderer<T>;
};
