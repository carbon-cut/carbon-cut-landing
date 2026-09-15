"use client";

import type { CellContext, ColumnDef } from "@tanstack/react-table";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { Trash2 } from "lucide-react";

import { TName } from "@/components/ui/forms";
import { InventoryTableIconButton } from "../InventoryTableHeader";
import { NumberInputCell, TextInputCell } from "./cells";
import type { TableGridRow, TableGridCellRenderer, TableGridColumn } from "./types";
import type { EditableTableRowField } from "../editable-rows/types";
import { renderEditableTableRowSelectCell } from "../editable-rows/cells";

type CreateTableGridColumnsArgs<T extends FieldValues> = {
  columns: TableGridColumn[];
  form: UseFormReturn<T, undefined>;
  baseName: TName<T>;
  renderCell?: TableGridCellRenderer<T>;
  selectedYear?: number;
  editableRows?: {
    minRows?: number;
    rowCount: number;
    onRemoveRow: (index: number) => void;
    canRemoveRow?: (row: unknown, index: number) => boolean;
    isFieldDisabled?: (row: unknown, fieldKey: string, index: number) => boolean;
  };
  rowFields?: EditableTableRowField[];
  fieldRows?: unknown[];
};

export function createTableGridColumns<T extends FieldValues>({
  columns,
  form,
  baseName,
  renderCell,
  selectedYear,
  editableRows,
  rowFields = [],
  fieldRows = [],
}: CreateTableGridColumnsArgs<T>) {
  const tableColumns: ColumnDef<TableGridRow>[] = [
    ...(editableRows
      ? rowFields.map((field) => ({
          id: field.key,
          header: () => field.headerLabel ?? field.label,
          meta: {
            align: "center" as const,
          },
          cell: ({ row }: CellContext<TableGridRow, unknown>) =>
            renderEditableTableRowSelectCell({
              form,
              baseName,
              row,
              field,
              disabled: editableRows.isFieldDisabled?.(fieldRows[row.index], field.key, row.index),
            }),
        }))
      : [
          {
            id: "label",
            header: () => <span className="sr-only">Ligne</span>,
            cell: ({ row }: CellContext<TableGridRow, unknown>) => row.original.label,
          },
        ]),
    ...columns.map((column, columnIndex) => ({
      id: column.id ?? column.key,
      header: () => column.label,
      meta: {
        align: "center" as const,
        className: column.className,
      },
      cell: ({ row }: CellContext<TableGridRow, unknown>) => {
        if (renderCell) {
          return renderCell({
            form,
            baseName,
            row,
            column,
            name: baseName,
            selectedYear,
            editableRows: editableRows !== undefined,
          });
        }

        const defaultCellRenderer = column.type === "text" ? TextInputCell : NumberInputCell;
        return defaultCellRenderer({
          form,
          baseName,
          row: row,
          column: column,
          name: baseName,
          selectedYear,
        });
      },
    })),
  ];

  if (editableRows) {
    tableColumns.push({
      id: "__actions",
      header: () => <span className="sr-only">Actions</span>,
      meta: {
        className: "w-12",
        align: "center" as const,
      },
      cell: ({ row }: CellContext<TableGridRow, unknown>) => (
        <InventoryTableIconButton
          type="button"
          title="Supprimer"
          aria-label={`Supprimer ${row.original.key}`}
          disabled={
            editableRows.rowCount <= (editableRows.minRows ?? 0) ||
            editableRows.canRemoveRow?.(fieldRows[row.index], row.index) === false
          }
          onClick={() => {
            editableRows.onRemoveRow(row.index);
          }}
        >
          <Trash2 aria-hidden="true" />
        </InventoryTableIconButton>
      ),
    });
  }

  return tableColumns;
}
