"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import {
  InventoryDataTable,
  InventoryDataTableHead,
  InventoryDataTableHeaderRow,
  InventoryDataTableRow,
  TableBody,
  TableHeader,
} from "./InventoryDataTable";
import InventoryTableInput from "./InventoryTableInput";
import { useInventoryContext } from "../context/inventory-context";
import type { InventoryColumnLabel, InventoryYear, InventoryYearBlockTableBlock } from "../types";

type InventoryTableValues = Record<string, string>;
type InventoryBlockColumns = Record<string, InventoryColumnLabel[]>;

function getCellKey(yearValue: number, blockKey: string, rowKey: string, columnKey: string) {
  return `${yearValue}::${blockKey}::${rowKey}::${columnKey}`;
}

function parseTableNumber(value: string) {
  const normalizedValue = value.trim().replace(/\s/g, "").replace(",", ".");
  const parsedValue = Number(normalizedValue);

  return Number.isFinite(parsedValue) ? parsedValue : null;
}

function formatTableNumber(value: number) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(3)));
}

function createInitialColumns(blocks: InventoryYearBlockTableBlock[]) {
  return blocks.reduce<InventoryBlockColumns>((columnsByBlock, block) => {
    columnsByBlock[block.key] = block.columns;
    return columnsByBlock;
  }, {});
}

function BlockTable({
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
}: {
  block: InventoryYearBlockTableBlock;
  columns: InventoryColumnLabel[];
  year: InventoryYear;
  yearLabel: string;
  values: InventoryTableValues;
  headerAddon?: ReactNode;
  onAddColumn: (blockKey: string) => void;
  onRemoveColumn: (blockKey: string, columnKey: string) => void;
  onColumnLabelChange: (blockKey: string, columnKey: string, label: string) => void;
  onValueChange: (
    yearValue: number,
    blockKey: string,
    rowKey: string,
    columnKey: string,
    value: string
  ) => void;
}) {
  const editableColumnCount = columns.filter((column) => !column.calculated).length;
  const getValue = (rowKey: string, columnKey: string) =>
    values[getCellKey(year, block.key, rowKey, columnKey)] ?? "";

  const getCalculatedValue = (rowKey: string) => {
    const total = columns.reduce<number | null>((sum, column) => {
      if (column.calculated) return sum;

      const parsedValue = parseTableNumber(getValue(rowKey, column.key));
      if (parsedValue === null) return sum;

      return (sum ?? 0) + parsedValue;
    }, null);

    return total === null ? "" : formatTableNumber(total);
  };

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
      <InventoryDataTable>
        <TableHeader>
          <InventoryDataTableHeaderRow stickySrLabel="Ligne">
            {columns.map((column) => (
              <InventoryDataTableHead
                key={column.key}
                className={cn("min-w-[124px]", column.className)}
              >
                {block.editableColumns && !column.calculated ? (
                  <span className="flex items-center gap-2">
                    <Input
                      value={column.label}
                      aria-label={`Nom de colonne ${block.title}`}
                      className="h-8 min-w-[9rem] rounded-lg bg-background px-2 text-sm font-semibold"
                      onChange={(event) =>
                        onColumnLabelChange(block.key, column.key, event.target.value)
                      }
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
                )}
              </InventoryDataTableHead>
            ))}
          </InventoryDataTableHeaderRow>
        </TableHeader>
        <TableBody>
          {block.rows.map((row) => (
            <InventoryDataTableRow
              key={row.key}
              label={row.label}
              cells={columns.map((column) => ({
                key: `${row.key}-${column.key}`,
                className: column.className,
                content: column.calculated ? (
                  <div
                    aria-label={`${row.label} ${yearLabel} ${column.label}`}
                    className="flex h-9 min-w-[40px] items-center justify-end rounded-lg border border-border/15 bg-yellow-200 px-3 text-sm font-semibold text-foreground"
                  >
                    {getCalculatedValue(row.key)}
                  </div>
                ) : column.editable === false ? (
                  <div className="flex h-9 min-w-[40px] items-center rounded-lg border border-border/15 bg-muted/40 px-3 text-sm text-secondary">
                    {getValue(row.key, column.key)}
                  </div>
                ) : (
                  <InventoryTableInput
                    value={getValue(row.key, column.key)}
                    onValueChange={(value) =>
                      onValueChange(year, block.key, row.key, column.key, value)
                    }
                  />
                ),
              }))}
            />
          ))}
        </TableBody>
      </InventoryDataTable>
    </section>
  );
}

export default function InventoryYearBlockTables({
  title,
  description,
  blocks,
  getValue,
  renderBlockHeaderAddon,
}: {
  title: string;
  description?: string;
  blocks: InventoryYearBlockTableBlock[];
  getValue: (blockKey: string, rowKey: string, columnKey: string, yearValue: number) => string;
  renderBlockHeaderAddon?: (block: InventoryYearBlockTableBlock) => ReactNode;
}) {
  const { years } = useInventoryContext();
  const [selectedYearValue, setSelectedYearValue] = useState(years[0] ?? 0);
  const selectedYear = years.find((year) => year === selectedYearValue) ?? years[0];
  const initialColumns = useMemo(() => createInitialColumns(blocks), [blocks]);
  const [columnsByBlock, setColumnsByBlock] = useState(initialColumns);

  useEffect(() => {
    if (!years.length) return;

    setSelectedYearValue((currentYearValue) =>
      years.some((year) => year === currentYearValue) ? currentYearValue : years[0]
    );
  }, [years]);

  useEffect(() => {
    setColumnsByBlock((currentColumnsByBlock) => {
      let hasNewBlock = false;
      const nextColumnsByBlock = { ...currentColumnsByBlock };

      for (const block of blocks) {
        if (nextColumnsByBlock[block.key]) continue;

        nextColumnsByBlock[block.key] = block.columns;
        hasNewBlock = true;
      }

      return hasNewBlock ? nextColumnsByBlock : currentColumnsByBlock;
    });
  }, [blocks]);

  const initialValues = useMemo(() => {
    const nextValues: InventoryTableValues = {};

    for (const year of years) {
      for (const block of blocks) {
        for (const row of block.rows) {
          for (const column of block.columns) {
            if (column.calculated) continue;

            nextValues[getCellKey(year, block.key, row.key, column.key)] = getValue(
              block.key,
              row.key,
              column.key,
              year
            );
          }
        }
      }
    }

    return nextValues;
  }, [blocks, getValue, years]);
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    setValues((currentValues) => {
      let hasNewValue = false;
      const nextValues = { ...currentValues };

      for (const [key, value] of Object.entries(initialValues)) {
        if (key in nextValues) continue;

        nextValues[key] = value;
        hasNewValue = true;
      }

      return hasNewValue ? nextValues : currentValues;
    });
  }, [initialValues]);

  const handleValueChange = (
    yearValue: number,
    blockKey: string,
    rowKey: string,
    columnKey: string,
    value: string
  ) => {
    setValues((currentValues) => ({
      ...currentValues,
      [getCellKey(yearValue, blockKey, rowKey, columnKey)]: value,
    }));
  };

  const handleAddColumn = (blockKey: string) => {
    setColumnsByBlock((currentColumnsByBlock) => {
      const columns = currentColumnsByBlock[blockKey] ?? [];
      const totalColumnIndex = columns.findIndex((column) => column.calculated);
      const insertionIndex = totalColumnIndex === -1 ? columns.length : totalColumnIndex;
      const customColumnCount = columns.filter((column) => column.key.startsWith("custom-")).length;
      const nextColumn = {
        key: `custom-${Date.now()}`,
        label: `??? ${customColumnCount + 1}`,
      };

      return {
        ...currentColumnsByBlock,
        [blockKey]: [
          ...columns.slice(0, insertionIndex),
          nextColumn,
          ...columns.slice(insertionIndex),
        ],
      };
    });
  };

  const handleRemoveColumn = (blockKey: string, columnKey: string) => {
    setColumnsByBlock((currentColumnsByBlock) => {
      const columns = currentColumnsByBlock[blockKey] ?? [];
      const editableColumnCount = columns.filter((column) => !column.calculated).length;

      if (editableColumnCount <= 1) return currentColumnsByBlock;

      return {
        ...currentColumnsByBlock,
        [blockKey]: columns.filter((column) => column.key !== columnKey),
      };
    });
  };

  const handleColumnLabelChange = (blockKey: string, columnKey: string, label: string) => {
    setColumnsByBlock((currentColumnsByBlock) => ({
      ...currentColumnsByBlock,
      [blockKey]: (currentColumnsByBlock[blockKey] ?? []).map((column) =>
        column.key === columnKey ? { ...column, label } : column
      ),
    }));
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Typography asChild variant="sectionTitle" size="sm">
            <h4>{title}</h4>
          </Typography>
          {description ? (
            <Typography asChild variant="body" size="body" className="mt-2">
              <p>{description}</p>
            </Typography>
          ) : null}
        </div>
        <div role="tablist" aria-label="Annees" className="flex flex-wrap justify-end gap-3">
          {years.map((year) => (
            <button
              key={year}
              type="button"
              role="tab"
              aria-selected={year === selectedYear}
              className={cn(
                "text-sm font-semibold text-secondary underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                year === selectedYear ? "text-foreground underline" : ""
              )}
              onClick={() => setSelectedYearValue(year)}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {selectedYear ? (
        <section className="space-y-6">
          {blocks.map((block) => (
            <BlockTable
              key={`${selectedYear}-${block.key}`}
              block={block}
              columns={columnsByBlock[block.key] ?? block.columns}
              year={selectedYear}
              yearLabel={String(selectedYear)}
              values={values}
              headerAddon={renderBlockHeaderAddon?.(block)}
              onAddColumn={handleAddColumn}
              onRemoveColumn={handleRemoveColumn}
              onColumnLabelChange={handleColumnLabelChange}
              onValueChange={handleValueChange}
            />
          ))}
        </section>
      ) : null}
    </section>
  );
}
