"use client";

import { useEffect, useState } from "react";
import type { CellContext, ColumnDef } from "@tanstack/react-table";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { Trash2 } from "lucide-react";

import { TName } from "@/components/ui/forms";
import { InventoryTableIconButton } from "../InventoryTableHeader";
import InventoryTableInput from "../InventoryTableInput";
import InventoryTableSelect from "../InventoryTableSelect";
import { NumberInputCell, TextInputCell } from "./cells";
import type { YearMetricsRow, YearMetricsCellRenderer, YearMetricsColumn } from "./types";

function FixedColumnHeader<T extends FieldValues>({
  form,
  baseName,
  column,
}: {
  form: UseFormReturn<T, undefined>;
  baseName: TName<T>;
  column: YearMetricsColumn;
}) {
  const fieldSectorPath = `${baseName}.fixed.${column.key}.sector` as TName<T>;
  const [fieldSector] = useState(form.getValues(fieldSectorPath));

  useEffect(() => {
    if (fieldSector === undefined && column.sector) {
      form.setValue(
        fieldSectorPath,
        // @ts-expect-error - initialization of dynamic territorial energy sector path
        column.sector
      );
    }
  }, [column.sector, fieldSector, fieldSectorPath, form]);

  return (
    <span>
      {column.label}
      {column.metaLabel ? (
        <span className="block text-xs font-normal text-muted-foreground">{column.metaLabel}</span>
      ) : null}
    </span>
  );
}

type CreateYearMetricsColumnsArgs<T extends FieldValues> = {
  columns: YearMetricsColumn[];
  form: UseFormReturn<T, undefined>;
  baseName: TName<T>;
  renderCell?: YearMetricsCellRenderer<T>;
  selectedYear?: number;
  editableRows?: {
    minRows: number;
    rowCount: number;
    onRemoveRow: (index: number) => void;
  };
};

export function createYearMetricsColumns<T extends FieldValues>({
  columns,
  form,
  baseName,
  selectedYear,
  editableRows,
}: CreateYearMetricsColumnsArgs<T>) {
  const tableColumns: ColumnDef<YearMetricsRow>[] = [
    {
      id: "label",
      header: () => <span className="sr-only">Ligne</span>,
      cell: ({ row }: CellContext<YearMetricsRow, unknown>) => row.original.label,
    },
    ...columns.map((column, columnIndex) => ({
      id: column.id ?? column.key,
      header: () =>
        column.kind === "custom" ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <InventoryTableInput
                form={form}
                name={(column.metaFieldName ?? baseName) as TName<T>}
                placeholder={column.label}
              />
              {column.onRemoveColumn ? (
                <InventoryTableIconButton
                  type="button"
                  title="Supprimer"
                  aria-label="Supprimer"
                  onClick={column.onRemoveColumn}
                >
                  <Trash2 aria-hidden="true" />
                </InventoryTableIconButton>
              ) : null}
            </div>
            {column.metaOptions ? (
              <InventoryTableSelect
                form={form}
                name={
                  `${String(column.metaFieldName ?? "").replace(/\.label$/, ".sector")}` as TName<T>
                }
                options={column.metaOptions}
                placeholder={column.metaPlaceholder}
              />
            ) : null}
          </div>
        ) : (
          <FixedColumnHeader form={form} baseName={baseName} column={column} />
        ),
      meta: {
        align: "center" as const,
        className: column.className,
      },
      cell: ({ row }: CellContext<YearMetricsRow, unknown>) => {
        const renderCell = column.type === "text" ? TextInputCell : NumberInputCell;
        return renderCell({
          form,
          baseName,
          row: row,
          column: column,
          name: baseName,
          selectedYear,
        });
      },
    })),
  ];

  if (editableRows) {
    tableColumns.push({
      id: "__actions",
      header: () => <span className="sr-only">Actions</span>,
      meta: {
        className: "w-12",
        align: "center" as const,
      },
      cell: ({ row }: CellContext<YearMetricsRow, unknown>) => (
        <InventoryTableIconButton
          type="button"
          title="Supprimer"
          aria-label={`Supprimer ${row.original.label}`}
          disabled={editableRows.rowCount <= editableRows.minRows}
          onClick={() => {
            console.log("removed", row.index);
            editableRows.onRemoveRow(row.index);
          }}
        >
          <Trash2 aria-hidden="true" />
        </InventoryTableIconButton>
      ),
    });
  }

  return tableColumns;
}
