"use client";

import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import type { FieldValues } from "react-hook-form";

import { renderGroupedYearInputCell, renderGroupedYearRowSelectCell } from "./cells";
import type { GroupedYearTableProps } from "./types";
import type {
  InventoryTableColumn,
  InventoryTableRow,
} from "@/app/collectivity/[planId]/inventory/types";
import { InventoryTableIconButton } from "../InventoryTableHeader";

type GroupedYearCellContext = CellContext<InventoryTableRow, unknown>;

type CreateGroupedYearColumnsArgs<T extends FieldValues> = Pick<
  GroupedYearTableProps<T>,
  "form" | "baseName" | "baseNameBySubcolumn" | "editableRows" | "rowFields"
> & {
  years: number[];
  subcolumns: InventoryTableColumn[];
  onRemoveRow?: (index: number) => void;
  rowCount: number;
};

export function createGroupedYearColumns<T extends FieldValues>({
  years,
  subcolumns,
  form,
  baseName,
  baseNameBySubcolumn,
  editableRows,
  rowFields = [],
  onRemoveRow,
  rowCount,
}: CreateGroupedYearColumnsArgs<T>) {
  const columns: ColumnDef<InventoryTableRow>[] = [
    ...(editableRows
      ? rowFields.map((field) => ({
          id: field.key,
          header: () => field.label,
          meta: {
            align: "center" as const,
            className: "min-w-[180px]",
          },
          cell: ({ row }: GroupedYearCellContext) =>
            renderGroupedYearRowSelectCell({
              form,
              baseName: baseName!,
              row,
              field,
            }),
        }))
      : [
          {
            id: "label",
            header: () => <span className="sr-only">Ligne</span>,
            cell: ({ row }: GroupedYearCellContext) => row.original.label,
          },
        ]),
    ...years.map((year) => ({
      id: String(year),
      header: () => String(year),
      meta: {
        align: "center" as const,
        className: "min-w-[220px]",
      },
      columns: subcolumns.map((subcolumn) => ({
        id: `${year}-${subcolumn.key}`,
        header: () => subcolumn.label,
        meta: {
          align: "center" as const,
          tone: "secondary" as const,
          className: `min-w-[110px] py-2 ${subcolumn.className ?? ""}`.trim(),
        },
        cell: ({ row }: GroupedYearCellContext) =>
          renderGroupedYearInputCell({
            form,
            baseName: baseNameBySubcolumn?.[subcolumn.key] ?? baseName!,
            rowKey: editableRows ? String(row.index) : row.original.key,
            year,
            subcolumnKey: baseNameBySubcolumn ? undefined : subcolumn.key,
            unit: subcolumn.unit ?? row.original.unit,
            editableRows: editableRows !== undefined,
          }),
      })),
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
      cell: ({ row }: GroupedYearCellContext) => {
        const canRemove = rowCount > (editableRows.minRows ?? 0);

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
