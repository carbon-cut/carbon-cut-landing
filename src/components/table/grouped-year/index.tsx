"use client";

import { useMemo } from "react";

import { type ArrayPath, type FieldValues, useFieldArray } from "react-hook-form";
import { Plus } from "lucide-react";

import { useInventoryContext } from "@/app/collectivity/[planId]/inventory/context/inventory-context";
import { InventoryTableActionButton, InventoryTableHeader } from "../InventoryTableHeader";
import InventoryTanstackTable from "../tanstack";
import { createGroupedYearColumns } from "./columns";
import type { GroupedYearEditableRows, GroupedYearTableProps } from "./types";
import type { TName } from "@/components/ui/forms";

function EditableInventoryGroupedYearTable<T extends FieldValues>({
  title,
  description,
  rows,
  subcolumns,
  form,
  baseName,
  editableRows,
  rowFields,
}: GroupedYearTableProps<T> & { baseName: TName<T>; editableRows: GroupedYearEditableRows }) {
  const { years } = useInventoryContext();
  const { fields, append, insert, remove } = useFieldArray({
    control: form.control,
    name: baseName as ArrayPath<T>,
  });
  const rowKeyFieldName = editableRows.rowKeyFieldName ?? "key";
  const appendRow = (row: Record<string, unknown>) => {
    // @ts-expect-error - dynamic grouped-year row structure depends on surface config
    append(row, { shouldFocus: true });
  };
  const insertRow = (index: number, row: Record<string, unknown>) => {
    // @ts-expect-error - dynamic grouped-year row structure depends on surface config
    insert(index, row, { shouldFocus: true });
  };
  const handleAddRow = () => {
    appendRow({ [rowKeyFieldName]: "", value: {} });
  };

  const tableRows = useMemo(
    () =>
      fields.map((field, index) => ({
        key: field.id,
        label: `${editableRows?.rowLabelPrefix ?? ""} ${index + 1}`.trim(),
        unit: null,
      })),
    [editableRows?.rowLabelPrefix, fields]
  );

  const columns = useMemo(
    () =>
      createGroupedYearColumns({
        years,
        subcolumns,
        form,
        baseName,
        editableRows,
        rowFields,
        onRemoveRow: remove,
        rowCount: tableRows.length,
        fieldRows: fields,
      }),
    [baseName, editableRows, fields, form, remove, rowFields, subcolumns, tableRows.length, years]
  );

  return (
    <div className="space-y-3">
      <InventoryTableHeader title={title} description={description} />
      <InventoryTanstackTable
        rows={tableRows}
        columns={columns}
        getRowId={(row) => row.key}
        stickyColumnIds={rowFields?.[0] ? [rowFields[0].key] : []}
      />
      <div className="flex items-center justify-between gap-3 rounded-b-xl bg-surface-warm/60 p-3">
        <div className="min-w-0 flex-1">
          {editableRows.renderFooterContent?.({
            rowKeyFieldName,
            rows: fields,
            appendRow,
            insertRow,
          })}
        </div>
        {editableRows.showAddButton !== false ? (
          <InventoryTableActionButton
            type="button"
            title={editableRows.addLabel}
            aria-label={editableRows.addLabel}
            onClick={handleAddRow}
          >
            <Plus aria-hidden="true" />
            {editableRows.addLabel}
          </InventoryTableActionButton>
        ) : null}
      </div>
    </div>
  );
}

function StaticInventoryGroupedYearTable<T extends FieldValues>({
  title,
  description,
  rows,
  subcolumns,
  form,
  baseName,
  baseNameBySubcolumn,
  loadingRows,
}: GroupedYearTableProps<T>) {
  const { years } = useInventoryContext();
  const isLoadingRows = Boolean(loadingRows?.isLoading);
  const tableRows = useMemo(
    () =>
      isLoadingRows
        ? Array.from({ length: loadingRows?.count ?? 0 }, (_, index) => ({
            key: `skeleton-${index}`,
            label: "",
            unit: null,
          }))
        : rows,
    [isLoadingRows, loadingRows?.count, rows]
  );

  const columns = useMemo(
    () =>
      createGroupedYearColumns({
        years,
        subcolumns,
        form,
        baseName,
        baseNameBySubcolumn,
        isLoadingRows,
        rowCount: tableRows.length,
      }),
    [baseName, baseNameBySubcolumn, form, isLoadingRows, subcolumns, tableRows.length, years]
  );

  return (
    <div className="space-y-3">
      <InventoryTableHeader title={title} description={description} />
      <InventoryTanstackTable
        rows={tableRows}
        columns={columns}
        getRowId={(row) => row.key}
        stickyColumnIds={["label"]}
      />
    </div>
  );
}

export default function InventoryGroupedYearTable<T extends FieldValues>(
  props: GroupedYearTableProps<T>
) {
  if (props.editableRows) {
    return (
      <EditableInventoryGroupedYearTable
        {...props}
        baseName={props.baseName!}
        editableRows={props.editableRows}
      />
    );
  }

  return <StaticInventoryGroupedYearTable {...props} />;
}
