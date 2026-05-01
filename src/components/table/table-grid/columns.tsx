"use client";

import type { CellContext, ColumnDef } from "@tanstack/react-table";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

import { TName } from "@/components/ui/forms";
import { getTableGridFieldName, renderTableGridInputCell } from "./cells";
import type { TableGridRow, TableGridCellRenderer } from "./types";

type CreateTableGridColumnsArgs<T extends FieldValues> = {
  columns: Array<{ key: string; label: string; className?: string }>;
  form: UseFormReturn<T, undefined>;
  baseName: TName<T>;
  renderCell?: TableGridCellRenderer<T>;
  selectedYear?: number;
  editableRows?: {
    minRows: number;
    rowCount: number;
    onRemoveRow: (rowKey: string) => void;
  };
};

export function createTableGridColumns<T extends FieldValues>({
  columns,
  form,
  baseName,
  renderCell = renderTableGridInputCell,
  selectedYear,
  editableRows,
}: CreateTableGridColumnsArgs<T>) {
  const tableColumns: ColumnDef<TableGridRow>[] = [
    {
      id: "label",
      header: () => <span className="sr-only">Ligne</span>,
      cell: ({ row }: CellContext<TableGridRow, unknown>) => row.original.label,
    },
    ...columns.map((column, columnIndex) => ({
      id: column.key,
      header: () => column.label,
      meta: {
        align: "center" as const,
        className: column.className,
      },
      cell: ({ row }: CellContext<TableGridRow, unknown>) =>
        renderCell({
          form,
          baseName,
          row: row.original,
          columnKey: column.key,
          columnLabel: column.label,
          columnIndex,
          name: getTableGridFieldName({
            baseName,
            rowKey: row.original.key,
            columnKey: column.key,
            selectedYear,
          }),
          selectedYear,
        }),
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
        <Button
          type="button"
          variant="ghost"
          size="icon"
          title="Supprimer"
          aria-label={`Supprimer ${row.original.label}`}
          disabled={editableRows.rowCount <= editableRows.minRows}
          onClick={() => editableRows.onRemoveRow(row.original.key)}
        >
          <Trash2 aria-hidden="true" />
        </Button>
      ),
    });
  }

  return tableColumns;
}
