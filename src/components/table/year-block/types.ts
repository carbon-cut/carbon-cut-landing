import type { ReactNode } from "react";

import type {
  InventoryColumnLabel,
  InventoryYear,
  InventoryYearBlockTableBlock,
} from "@/app/collectivity/_inventaire/types";

export type InventoryTableValues = Record<string, string>;
export type InventoryBlockColumns = Record<string, InventoryColumnLabel[]>;

export type YearBlockTableProps = {
  title: string;
  description?: string;
  blocks: InventoryYearBlockTableBlock[];
  getValue: (blockKey: string, rowKey: string, columnKey: string, yearValue: number) => string;
  renderBlockHeaderAddon?: (block: InventoryYearBlockTableBlock) => ReactNode;
};

export type BlockTableProps = {
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
};
