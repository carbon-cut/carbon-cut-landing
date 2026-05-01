"use client";

import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { BlockTableProps } from "./types";
import { Trash2 } from "lucide-react";
import {
  renderYearBlockCalculatedCell,
  renderYearBlockEditableCell,
  renderYearBlockReadonlyCell,
} from "./cells";

type BlockTableRow = { key: string; label: string };
type BlockTableCellContext = CellContext<BlockTableRow, unknown>;

type CreateYearBlockColumnsArgs = {
  block: BlockTableProps["block"];
  columns: BlockTableProps["columns"];
  yearLabel: string;
  editableColumnCount: number;
  getValue: (rowKey: string, columnKey: string) => string;
  getCalculatedValue: (rowKey: string) => string;
  onRemoveColumn: (blockKey: string, columnKey: string) => void;
  onColumnLabelChange: (blockKey: string, columnKey: string, label: string) => void;
  onValueChange: BlockTableProps["onValueChange"];
  year: BlockTableProps["year"];
};

export function createYearBlockColumns({
  block,
  columns,
  yearLabel,
  editableColumnCount,
  getValue,
  getCalculatedValue,
  onRemoveColumn,
  onColumnLabelChange,
  onValueChange,
  year,
}: CreateYearBlockColumnsArgs): ColumnDef<BlockTableRow>[] {
  return [
    {
      id: "label",
      header: () => <span className="sr-only">Ligne</span>,
      cell: ({ row }: BlockTableCellContext) => row.original.label,
    },
    ...columns.map((column) => ({
      id: column.key,
      header: () =>
        block.editableColumns && !column.calculated ? (
          <span className="flex items-center gap-2">
            <Input
              value={column.label}
              aria-label={`Nom de colonne ${block.title}`}
              className="h-8 min-w-[9rem] rounded-lg bg-background px-2 text-sm font-semibold"
              onChange={(event) => onColumnLabelChange(block.key, column.key, event.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              title="Supprimer la colonne"
              aria-label={`Supprimer la colonne ${column.label}`}
              disabled={editableColumnCount <= 1}
              onClick={() => onRemoveColumn(block.key, column.key)}
            >
              <Trash2 aria-hidden="true" />
            </Button>
          </span>
        ) : (
          column.label
        ),
      meta: {
        className: column.className,
        align: "center" as const,
        tone: column.calculated ? ("secondary" as const) : ("default" as const),
      },
      cell: ({ row }: BlockTableCellContext) =>
        column.calculated
          ? renderYearBlockCalculatedCell({
              value: getCalculatedValue(row.original.key),
              rowLabel: row.original.label,
              yearLabel,
              columnLabel: column.label,
            })
          : column.editable === false
            ? renderYearBlockReadonlyCell({
                value: getValue(row.original.key, column.key),
              })
            : renderYearBlockEditableCell({
                value: getValue(row.original.key, column.key),
                year,
                blockKey: block.key,
                rowKey: row.original.key,
                columnKey: column.key,
                onValueChange,
              }),
    })),
  ];
}
