"use client";

import type { CellContext, ColumnDef } from "@tanstack/react-table";
import type { FieldValues } from "react-hook-form";

import { renderGroupedYearInputCell } from "./cells";
import type { GroupedYearTableProps } from "./types";
import type { InventoryTableColumn, InventoryTableRow } from "@/app/collectivity/_inventaire/types";

type GroupedYearCellContext = CellContext<InventoryTableRow, unknown>;

type CreateGroupedYearColumnsArgs<T extends FieldValues> = Pick<
  GroupedYearTableProps<T>,
  "form" | "baseName" | "baseNameBySubcolumn"
> & {
  years: number[];
  subcolumns: InventoryTableColumn[];
};

export function createGroupedYearColumns<T extends FieldValues>({
  years,
  subcolumns,
  form,
  baseName,
  baseNameBySubcolumn,
}: CreateGroupedYearColumnsArgs<T>) {
  const columns: ColumnDef<InventoryTableRow>[] = [
    {
      id: "label",
      header: () => <span className="sr-only">Ligne</span>,
      cell: ({ row }: GroupedYearCellContext) => row.original.label,
    },
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
          className: "min-w-[110px] py-2",
        },
        cell: ({ row }: GroupedYearCellContext) =>
          renderGroupedYearInputCell({
            form,
            baseName: baseNameBySubcolumn?.[subcolumn.key] ?? baseName!,
            rowKey: row.original.key,
            year,
            subcolumnKey: baseNameBySubcolumn ? undefined : subcolumn.key,
            unit: subcolumn.unit ?? row.original.unit,
          }),
      })),
    })),
  ];

  return columns;
}
