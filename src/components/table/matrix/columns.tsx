import type { CellContext, ColumnDef } from "@tanstack/react-table";
import type { FieldValues, UseFormReturn } from "react-hook-form";

import { TName } from "@/components/ui/forms";
import { renderMatrixYearInputCell } from "./cells";
import type { MatrixTableRow } from "./types";
import type { MatrixYearCellRenderer } from "./types";

type MatrixCellContext = CellContext<MatrixTableRow, unknown>;

type CreateColumnsArgs<T extends FieldValues> = {
  years: number[];
  baseName: TName<T>;
  renderYearCell?: MatrixYearCellRenderer<T>;
  form: UseFormReturn<T, undefined>;
};

export function createMatrixTableColumns<T extends FieldValues>({
  years,
  baseName,
  form,
  renderYearCell = renderMatrixYearInputCell,
}: CreateColumnsArgs<T>) {
  const columns: ColumnDef<MatrixTableRow>[] = [
    {
      id: "label",
      header: () => <span className="sr-only">Ligne</span>,
      cell: ({ row }: MatrixCellContext) => row.original.label,
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
          row: row.original,
          form,
          baseName,
        }),
    })),
  ];

  return columns;
}
