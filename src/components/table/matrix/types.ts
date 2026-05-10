import type { ReactNode } from "react";

import type { FieldValues, UseFormReturn } from "react-hook-form";

import type { TName } from "@/components/ui/forms";
import type { InventoryTableRow } from "@/app/collectivity/_inventaire/types";
import { Row } from "@tanstack/react-table";

export type MatrixTableRow = InventoryTableRow;

export type MatrixEditableRows = {
  addLabel: string;
  minRows?: number;
  unremovableRowKeys: readonly string[];
  unit: string;
};

export type MatrixYearCellRendererArgs<T extends FieldValues> = {
  year: number;
  row: Row<MatrixTableRow>;
  form: UseFormReturn<T, undefined>;
  baseName: TName<T>;
  editableRows?: boolean;
};

export type MatrixYearCellRenderer<T extends FieldValues> = (
  args: MatrixYearCellRendererArgs<T>
) => ReactNode;

export type MatrixTableProps<T extends FieldValues> = {
  title: string;
  rows: MatrixTableRow[];
  form: UseFormReturn<T, undefined>;
  baseName: TName<T>;
  years?: number[];
  renderYearCell?: MatrixYearCellRenderer<T>;
  editableRows?: MatrixEditableRows;
};
