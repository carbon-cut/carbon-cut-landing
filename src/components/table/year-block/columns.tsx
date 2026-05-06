"use client";

import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

import { renderYearBlockEditableCell } from "./cells";
import { InventoryFieldInput } from "@/app/collectivity/_components/fields";
import {
  FieldValues,
  UseFieldArrayRemove,
  UseFieldArrayReturn,
  UseFormReturn,
} from "react-hook-form";
import { TName } from "@/components/ui/forms";
import {
  InventoryTableRow,
  InventoryYearBlockTableBlock,
} from "@/app/collectivity/_inventaire/types";
import { Button } from "@/components/ui/button";

type BlockTableRow = InventoryTableRow;
type BlockTableCellContext = CellContext<BlockTableRow, unknown>;

type CreateYearBlockColumnsArgs<T extends FieldValues> = {
  block: InventoryYearBlockTableBlock;
  year: number;
  onRemoveColumn: UseFieldArrayRemove;
  form: UseFormReturn<T, any>;
  tableName: TName<T>;
  fields: UseFieldArrayReturn<any, any, any>["fields"];
};

export function createYearBlockColumns<T extends FieldValues>({
  block,
  year,
  form,
  tableName,
  fields,
  onRemoveColumn,
}: CreateYearBlockColumnsArgs<T>): ColumnDef<BlockTableRow>[] {
  return [
    {
      id: "label",
      header: () => <span className="sr-only">Ligne</span>,
      cell: ({ row }: BlockTableCellContext) => row.original.label,
    },
    ...fields.map((column, index) => {
      const columnName = `${tableName}.${index}` as TName<T>;
      const columnLabel = form.getValues(`${columnName}.key` as TName<T>);
      return {
        id: column.id,
        header: () =>
          block.editableColumns ? (
            <span className="flex items-center gap-2">
              <InventoryFieldInput
                aria-label={`Nom de colonne ${block.title}`}
                className="h-8 min-w-[9rem] rounded-lg bg-background px-2 text-sm font-semibold"
                form={form}
                name={`${columnName}.key` as TName<T>}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                title="Supprimer la colonne"
                aria-label={`Supprimer la colonne ${columnLabel}`}
                onClick={() => onRemoveColumn(index)}
                disabled={columnLabel === "total"}
              >
                <Trash2 aria-hidden="true" />
              </Button>
            </span>
          ) : (
            columnLabel
          ),
        cell: ({ row }: BlockTableCellContext) =>
          renderYearBlockEditableCell({
            selectedYear: year,
            row: row.original,
            form,
            baseName: columnName,
          }),
      };
    }),
  ];
}
