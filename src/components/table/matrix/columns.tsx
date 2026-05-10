import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import type { FieldArrayPath, FieldValues, UseFormReturn } from "react-hook-form";

import { InventoryFieldInput } from "@/app/collectivity/_components/fields";
import { Button } from "@/components/ui/button";
import { renderMatrixYearInputCell } from "./cells";
import type { MatrixEditableRows, MatrixTableRow } from "./types";
import type { MatrixYearCellRenderer } from "./types";
import { TName } from "@/components/ui/forms";

type MatrixCellContext = CellContext<MatrixTableRow, unknown>;

type CreateColumnsArgs<T extends FieldValues> = {
  years: number[];
  baseName: TName<T>;
  renderYearCell?: MatrixYearCellRenderer<T>;
  form: UseFormReturn<T, undefined>;
  editableRows?: MatrixEditableRows;
  onRemoveRow?: (index: number) => void;
  rowCount: number;
};

export function createMatrixTableColumns<T extends FieldValues>({
  years,
  baseName,
  form,
  renderYearCell = renderMatrixYearInputCell,
  editableRows,
  onRemoveRow,
  rowCount,
}: CreateColumnsArgs<T>) {
  const columns: ColumnDef<MatrixTableRow>[] = [
    {
      id: "label",
      header: () => <span className="sr-only">Ligne</span>,
      cell: ({ row }: MatrixCellContext) =>
        editableRows ? (
          editableRows.unremovableRowKeys.includes(row.original.key) ? (
            <span className="px-2 text-sm font-semibold">{row.original.label}</span>
          ) : (
            <InventoryFieldInput
              aria-label={`Nom de ligne ${row.original.label}`}
              className="h-8 min-w-[9rem] rounded-lg bg-background px-2 text-sm font-semibold"
              form={form}
              name={`${baseName}.${row.index}.key` as TName<T>}
            />
          )
        ) : (
          row.original.label
        ),
    },
    ...years.map((year) => ({
      id: String(year),
      header: () => String(year),
      meta: {
        align: "center" as const,
        kind: "year",
      },
      cell: ({ row }: MatrixCellContext) =>
        renderYearCell({
          year,
          row: row,
          form,
          baseName,
          editableRows: editableRows !== undefined,
        }),
    })),
  ];

  if (editableRows && onRemoveRow) {
    columns.push({
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      meta: {
        align: "center" as const,
        className: "w-12",
      },
      cell: ({ row }: MatrixCellContext) => {
        const isLocked = editableRows.unremovableRowKeys.includes(row.original.key);
        const canRemove = !isLocked && rowCount > (editableRows.minRows ?? 0);

        return (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            title="Supprimer"
            aria-label={`Supprimer ${row.original.label}`}
            disabled={!canRemove}
            onClick={() => onRemoveRow(row.index)}
          >
            <Trash2 aria-hidden="true" />
          </Button>
        );
      },
    });
  }

  return columns;
}
