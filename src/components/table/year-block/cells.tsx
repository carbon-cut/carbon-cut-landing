"use client";

import InventoryTableInput from "../InventoryTableInput";
import type { BlockTableProps } from "./types";

type YearBlockEditableCellArgs = {
  value: string;
  year: BlockTableProps["year"];
  blockKey: string;
  rowKey: string;
  columnKey: string;
  onValueChange: BlockTableProps["onValueChange"];
};

type YearBlockReadonlyCellArgs = {
  value: string;
};

type YearBlockCalculatedCellArgs = {
  value: string;
  rowLabel: string;
  yearLabel: string;
  columnLabel: string;
};

export function renderYearBlockEditableCell({
  value,
  year,
  blockKey,
  rowKey,
  columnKey,
  onValueChange,
}: YearBlockEditableCellArgs) {
  return (
    <InventoryTableInput
      value={value}
      onValueChange={(nextValue) => onValueChange(year, blockKey, rowKey, columnKey, nextValue)}
    />
  );
}

export function renderYearBlockReadonlyCell({ value }: YearBlockReadonlyCellArgs) {
  return (
    <div className="flex h-9 min-w-[40px] items-center rounded-lg border border-border/15 bg-muted/40 px-3 text-sm text-secondary">
      {value}
    </div>
  );
}

export function renderYearBlockCalculatedCell({
  value,
  rowLabel,
  yearLabel,
  columnLabel,
}: YearBlockCalculatedCellArgs) {
  return (
    <div
      aria-label={`${rowLabel} ${yearLabel} ${columnLabel}`}
      className="flex h-9 min-w-[40px] items-center justify-end rounded-lg border border-border/15 bg-yellow-200 px-3 text-sm font-semibold text-foreground"
    >
      {value}
    </div>
  );
}
