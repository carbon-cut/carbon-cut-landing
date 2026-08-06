import type { CellContext, ColumnDef } from "@tanstack/react-table";
import type { FieldValues } from "react-hook-form";

import { FieldHelp } from "@/components/ui/field-help";
import { renderScalarValueCell } from "./cells";
import type { ScalarTableRow, ScalarTableProps } from "./types";

type ScalarCellContext<T extends FieldValues> = CellContext<ScalarTableRow<T>, unknown>;

export function createScalarTableColumns<T extends FieldValues>(
  form: ScalarTableProps<T>["form"]
): ColumnDef<ScalarTableRow<T>>[] {
  return [
    {
      id: "label",
      meta: {
        className: "min-w-40 max-w-40",
      },
      header: () => <span className="sr-only">Ligne</span>,
      cell: ({ row }: ScalarCellContext<T>) => (
        <div className="flex items-center gap-1.5">
          <span>{row.original.field.label}</span>
          {row.original.field.helper ? <FieldHelp content={row.original.field.helper} /> : null}
        </div>
      ),
    },
    {
      id: "value",
      header: () => <span className="sr-only">Valeur</span>,
      meta: {
        align: "center" as const,
      },
      cell: ({ row }: ScalarCellContext<T>) => renderScalarValueCell({ form, row }),
    },
  ];
}
