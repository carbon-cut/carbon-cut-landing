import type { CellContext, ColumnDef } from "@tanstack/react-table";
import type { FieldValues, UseFormReturn } from "react-hook-form";

import { TName } from "@/components/ui/forms";

import InventoryTableInput from "../InventoryTableInput";
import type { MatrixTableRow } from "./types";

type MatrixCellContext = CellContext<MatrixTableRow, unknown>;

type CreateColumnsArgs<T extends FieldValues> = {
  years: number[];
  baseName: TName<T>;
  form: UseFormReturn<T, undefined>;
};

export function createMatrixTableColumns<T extends FieldValues>({
  years,
  baseName,
  form,
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
      cell: ({ row }: MatrixCellContext) => (
        <InventoryTableInput
          type="number"
          form={form}
          name={`${baseName}.${row.original.key}.${year}` as TName<T>}
        />
      ),
    })),
  ];

  return columns;
}
