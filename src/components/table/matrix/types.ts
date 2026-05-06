import type { FieldValues, UseFormReturn } from "react-hook-form";
import type { ReactNode } from "react";

import type { TName } from "@/components/ui/forms";

import type { InventoryTableRow } from "@/app/collectivity/_inventaire/types";

export type MatrixTableRow = InventoryTableRow;

export type MatrixYearCellRendererArgs<T extends FieldValues> = {
  year: number;
  row: MatrixTableRow;
  form: UseFormReturn<T, undefined>;
  baseName: TName<T>;
};

export type MatrixYearCellRenderer<T extends FieldValues> = (
  args: MatrixYearCellRendererArgs<T>
) => ReactNode;

export type MatrixTableProps<T extends FieldValues> = {
  title: string;
  rows: MatrixTableRow[];
  form: UseFormReturn<T, undefined>;
  baseName: TName<T>;
  renderYearCell?: MatrixYearCellRenderer<T>;
};
