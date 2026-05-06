import type { ReactNode } from "react";

import type {
  InventoryTableColumn,
  InventoryYear,
  InventoryYearBlockTableBlock,
} from "@/app/collectivity/_inventaire/types";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { TName } from "@/components/ui/forms";

export type InventoryBlockColumns = Record<string, InventoryTableColumn[]>;

export type YearBlockTableProps = {
  title: string;
  description?: string;
  blocks: InventoryYearBlockTableBlock[];
  renderBlockHeaderAddon?: (block: InventoryYearBlockTableBlock) => ReactNode;
};

export type YearBlockTableFormProps<T extends FieldValues> = YearBlockTableProps & {
  form: UseFormReturn<T, any>;
  baseName: TName<T>;
};

export type BlockTableProps = {
  block: InventoryYearBlockTableBlock;
  columns: InventoryTableColumn[];
  year: InventoryYear;
  yearLabel: string;
  headerAddon?: ReactNode;
  onAddColumn: (blockKey: string) => void;
  onRemoveColumn: (blockKey: string, columnKey: string) => void;
  onColumnLabelChange: (blockKey: string, columnKey: string, label: string) => void;
};

export type BlockTableFormProps<T extends FieldValues> = BlockTableProps & {
  form: UseFormReturn<T, any>;
  baseName: TName<T>;
};
