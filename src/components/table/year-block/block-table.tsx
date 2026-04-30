"use client";

import { useCallback, useMemo } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";

import InventoryTanstackTable from "../tanstack";
import { createYearBlockColumns } from "./columns";
import { formatTableNumber, parseTableNumber } from "./helpers";
import type { BlockTableProps } from "./types";

export default function BlockTable({
  block,
  columns,
  year,
  yearLabel,
  values,
  headerAddon,
  onAddColumn,
  onRemoveColumn,
  onColumnLabelChange,
  onValueChange,
}: BlockTableProps) {
  const editableColumnCount = columns.filter((column) => !column.calculated).length;
  const getValue = useCallback(
    (rowKey: string, columnKey: string) =>
      values[`${year}::${block.key}::${rowKey}::${columnKey}`] ?? "",
    [block.key, values, year]
  );

  const getCalculatedValue = useCallback(
    (rowKey: string) => {
      const total = columns.reduce<number | null>((sum, column) => {
        if (column.calculated) return sum;

        const parsedValue = parseTableNumber(getValue(rowKey, column.key));
        if (parsedValue === null) return sum;

        return (sum ?? 0) + parsedValue;
      }, null);

      return total === null ? "" : formatTableNumber(total);
    },
    [columns, getValue]
  );

  const tableColumns = useMemo(
    () =>
      createYearBlockColumns({
        block,
        columns,
        yearLabel,
        editableColumnCount,
        getValue,
        getCalculatedValue,
        onAddColumn,
        onRemoveColumn,
        onColumnLabelChange,
        onValueChange,
        year,
      }),
    [
      block,
      columns,
      editableColumnCount,
      getCalculatedValue,
      getValue,
      onAddColumn,
      onColumnLabelChange,
      onRemoveColumn,
      onValueChange,
      year,
      yearLabel,
    ]
  );

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Typography asChild variant="sectionTitle" size="sm">
          <h5>{block.title}</h5>
        </Typography>
        {block.editableColumns ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            title="Ajouter une colonne"
            aria-label={`Ajouter une colonne ${block.title}`}
            className="h-8 rounded-full px-3 shadow-none"
            onClick={() => onAddColumn(block.key)}
          >
            <Plus aria-hidden="true" />
            Ajouter une colonne
          </Button>
        ) : null}
      </div>
      {headerAddon ? <div>{headerAddon}</div> : null}
      {block.note ? (
        <Typography asChild variant="caption" size="sm" className="text-secondary">
          <p>{block.note}</p>
        </Typography>
      ) : null}
      <InventoryTanstackTable
        rows={block.rows}
        columns={tableColumns}
        getRowId={(row) => row.key}
        stickyColumnIds={["label"]}
        headerRowClassName="z-20"
        stickyHeaderClassName="min-w-[124px]"
      />
    </section>
  );
}
