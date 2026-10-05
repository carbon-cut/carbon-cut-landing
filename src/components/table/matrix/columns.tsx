import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

import { InventoryFieldInput } from "@/app/[locale]/collectivity/_components/fields";
import { InventoryTableIconButton } from "../InventoryTableHeader";
import { renderMatrixRowSelectCell, renderMatrixYearInputCell } from "./cells";
import type { MatrixEditableRows, MatrixRowField, MatrixTableRow } from "./types";
import type { MatrixYearCellRenderer } from "./types";
import { TName } from "@/components/ui/forms";

type MatrixCellContext = CellContext<MatrixTableRow, unknown>;
const emptyRowFields: MatrixRowField[] = [];

type CreateColumnsArgs<T extends FieldValues> = {
  years: number[];
  baseName: TName<T>;
  renderYearCell?: MatrixYearCellRenderer<T>;
  form: UseFormReturn<T, undefined>;
  editableRows?: MatrixEditableRows;
  rowFields?: MatrixRowField[];
  onRemoveRow?: (index: number) => void;
  rowCount: number;
};

export function createMatrixTableColumns<T extends FieldValues>({
  years,
  baseName,
  form,
  renderYearCell = renderMatrixYearInputCell,
  editableRows,
  rowFields = emptyRowFields,
  onRemoveRow,
  rowCount,
}: CreateColumnsArgs<T>) {
  const columns: ColumnDef<MatrixTableRow>[] = [
    {
      id: "label",
      meta: {
        className: "min-w-40 max-w-40",
      },
      header: () => <span className="sr-only">Ligne</span>,
      cell: ({ row }: MatrixCellContext) =>
        editableRows ? (
          editableRows.unremovableRowKeys.includes(row.original.key) ? (
            <span className="px-2 text-sm font-semibold">{row.original.label}</span>
          ) : (
            <div className="min-w-0 w-full">
              <InventoryFieldInput
                aria-label={`Nom de ligne ${row.original.label}`}
                className="h-8 min-w-0 rounded-lg bg-background px-2 text-sm font-semibold"
                form={form}
                name={`${baseName}.${row.index}.key` as TName<T>}
              />
            </div>
          )
        ) : (
          row.original.label
        ),
    },
    ...rowFields.map((field) => ({
      id: field.key,
      header: () => field.label,
      meta: {
        align: "center" as const,
      },
      cell: ({ row }: MatrixCellContext) => {
        if (field.type === "select") {
          return renderMatrixRowSelectCell({
            form,
            baseName,
            row,
            field,
            editableRows: editableRows !== undefined,
          });
        }

        return null;
      },
    })),
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
          <InventoryTableIconButton
            type="button"
            title="Supprimer"
            aria-label={`Supprimer ${row.original.label}`}
            disabled={!canRemove}
            onClick={() => onRemoveRow(row.index)}
          >
            <Trash2 aria-hidden="true" />
          </InventoryTableIconButton>
        );
      },
    });
  }

  return columns;
}
