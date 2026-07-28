import type { ReactNode } from "react";

import type { FieldValues, UseFormReturn } from "react-hook-form";

import type { TName } from "@/components/ui/forms";
import type {
  InventoryTableColumn,
  InventoryTableRow,
} from "@/app/collectivity/[planId]/inventory/types";
import { Row } from "@tanstack/react-table";

export type YearMetricsRow = InventoryTableRow & { id?: string };
export type YearMetricsColumn = InventoryTableColumn & {
  type?: "number" | "text";
  id?: string;
  kind?: "fixed" | "custom";
  index?: number;
  sector?: string;
  metaLabel?: string;
  metaFieldName?: TName<any>;
  metaOptions?: Array<{ value: string; label: string }>;
  metaPlaceholder?: string;
  onRemoveColumn?: () => void;
};
export type YearMetricsCellRendererArgs<T extends FieldValues> = {
  form: UseFormReturn<T, undefined>;
  baseName: TName<T>;
  row: Row<YearMetricsRow>;
  column: YearMetricsColumn;
  name: TName<T>;
  selectedYear?: number;
};

export type YearMetricsCellRenderer<T extends FieldValues> = (
  args: YearMetricsCellRendererArgs<T>
) => ReactNode;

export type YearMetricsTableProps<T extends FieldValues> = {
  title?: string;
  description?: string;
  className?: string;
  selectedYear?: number;
  rows: YearMetricsRow[];
  columns: YearMetricsColumn[];
  form: UseFormReturn<T, undefined>;
  baseName: TName<T>;
  yearSelector?: {
    years: number[];
    initialYear?: number;
    ariaLabel?: string;
    className?: string;
  };
  editableRows?: {
    minRows: number;
    onRemoveRow: (index: number) => void;
  };
  addRow?: {
    label: string;
    onAdd: () => void;
  };
  renderCell?: YearMetricsCellRenderer<T>;
};
