import type { ReactNode } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

export type EditableTableRows = {
  addLabel: string;
  showAddButton?: boolean;
  minRows?: number;
  rowLabelPrefix?: string;
  rowKeyFieldName?: string;
  canRemoveRow?: (row: unknown, index: number) => boolean;
  isFieldDisabled?: (row: unknown, fieldKey: string, index: number) => boolean;
  renderFooterContent?: (args: {
    rowKeyFieldName: string;
    rows: unknown[];
    appendRow: (row: Record<string, unknown>) => void;
    insertRow: (index: number, row: Record<string, unknown>) => void;
  }) => ReactNode;
};

export type EditableTableRowState = {
  fields: Array<{ id: string }>;
  remove: (index: number) => void;
  rowKeyFieldName: string;
  appendRow: (row: Record<string, unknown>) => void;
  insertRow: (index: number, row: Record<string, unknown>) => void;
  addEmptyRow: () => void;
};

export type EditableTableRowField = {
  key: string;
  label: string;
  headerLabel?: ReactNode;
  type: "select";
  placeholder?: string;
  options: Array<{ value: string; label: string; unit?: string }>;
  unitSubcolumnKey?: string;
  getOptions?: (args: {
    form: UseFormReturn<FieldValues, undefined>;
    rowIndex: number;
  }) => Array<{ value: string; label: string; unit?: string }>;
};
