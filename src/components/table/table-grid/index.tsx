"use client";

import { useMemo } from "react";
import { useEffect, useState } from "react";

import type { FieldValues } from "react-hook-form";

import InventoryTanstackTable from "../tanstack";
import { InventoryTableActionButton, InventoryTableHeader } from "../InventoryTableHeader";
import { createTableGridColumns } from "./columns";
import type { TableGridProps, TableGridRow } from "./types";
import { Plus } from "lucide-react";
import InventoryYearSelector from "@/app/[locale]/collectivity/[planId]/inventory/components/InventoryYearSelector";
import type { EditableTableRows } from "../editable-rows/types";
import { useEditableTableRows } from "../editable-rows/useEditableTableRows";

function hasEditableRowFields(
  editableRows: TableGridProps<FieldValues>["editableRows"]
): editableRows is EditableTableRows {
  return Boolean(editableRows && "addLabel" in editableRows);
}

function useTableGridYear(
  yearSelector: TableGridProps<FieldValues>["yearSelector"],
  selectedYearProp?: number
) {
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    yearSelector?.initialYear ?? yearSelector?.years[0]
  );

  useEffect(() => {
    if (!yearSelector?.years.length || selectedYearProp !== undefined) return;

    setSelectedYear((currentYear) =>
      currentYear && yearSelector.years.includes(currentYear)
        ? currentYear
        : (yearSelector.initialYear ?? yearSelector.years[0])
    );
  }, [selectedYearProp, yearSelector?.initialYear, yearSelector?.years]);

  return { selectedYear: selectedYearProp ?? selectedYear, setSelectedYear };
}

export default function TableGrid<T extends FieldValues>({
  title,
  description,
  className,
  rows,
  columns,
  form,
  baseName,
  editableRows,
  renderCell,
  yearSelector,
  selectedYear,
  addRow,
  rowFields,
  editableRowState,
}: TableGridProps<T>) {
  if (hasEditableRowFields(editableRows)) {
    return (
      <EditableTableGrid
        title={title}
        description={description}
        className={className}
        columns={columns}
        form={form}
        baseName={baseName}
        editableRows={editableRows}
        rowFields={rowFields}
        renderCell={renderCell}
        yearSelector={yearSelector}
        selectedYear={selectedYear}
        editableRowState={editableRowState}
      />
    );
  }

  return (
    <StaticTableGrid
      title={title}
      description={description}
      className={className}
      rows={rows}
      columns={columns}
      form={form}
      baseName={baseName}
      editableRows={editableRows}
      renderCell={renderCell}
      yearSelector={yearSelector}
      selectedYear={selectedYear}
      addRow={addRow}
    />
  );
}

function StaticTableGrid<T extends FieldValues>({
  title,
  description,
  className,
  rows,
  columns,
  form,
  baseName,
  editableRows,
  renderCell,
  yearSelector,
  selectedYear: selectedYearProp,
  addRow,
}: Omit<TableGridProps<T>, "rowFields">) {
  const { selectedYear, setSelectedYear } = useTableGridYear(yearSelector, selectedYearProp);

  const tableColumns = useMemo(
    () => {
      const legacyEditableRows =
        editableRows && !("addLabel" in editableRows)
          ? { ...editableRows, rowCount: rows.length }
          : undefined;

      return createTableGridColumns({
        columns: columns,
        form,
        baseName,
        editableRows: legacyEditableRows,
        renderCell,
        selectedYear,
      });
    },
    [baseName, columns, editableRows, form, renderCell, rows.length, selectedYear]
  );

  return (
    <section className={className ?? "space-y-3"}>
      <InventoryTableHeader
        title={title}
        description={description}
        endContent={
          <>
            {yearSelector ? (
              <InventoryYearSelector
                datasetKey={yearSelector.datasetKey}
                years={yearSelector.years}
                selectedYear={selectedYear}
                onSelectYear={setSelectedYear}
                ariaLabel={yearSelector.ariaLabel}
                className={yearSelector.className}
              />
            ) : null}

            {addRow ? (
              <InventoryTableActionButton
                type="button"
                /* onClick={addRow.onAdd} */ onPointerDown={(event) => {
                  event.preventDefault();
                  addRow.onAdd();
                }}
              >
                <Plus aria-hidden="true" />
                {addRow.label}
              </InventoryTableActionButton>
            ) : null}
          </>
        }
      />
      <InventoryTanstackTable
        rows={rows}
        columns={tableColumns}
        getRowId={(row) => row.id ?? row.key}
        stickyColumnIds={["label"]}
      />
    </section>
  );
}

function EditableTableGrid<T extends FieldValues>(
  props: Omit<TableGridProps<T>, "rows" | "addRow" | "editableRows"> & {
  editableRows: EditableTableRows;
  }
) {
  const { editableRowState } = props;

  if (editableRowState) {
    return <EditableTableGridContent {...props} editableRowState={editableRowState} />;
  }

  return <OwnedEditableTableGrid {...props} />;
}

function OwnedEditableTableGrid<T extends FieldValues>(
  props: Omit<TableGridProps<T>, "rows" | "addRow" | "editableRows"> & {
    editableRows: EditableTableRows;
  }
) {
  const editableRowState = useEditableTableRows({
    form: props.form,
    baseName: props.baseName,
    editableRows: props.editableRows,
  });

  return <EditableTableGridContent {...props} editableRowState={editableRowState} />;
}

function EditableTableGridContent<T extends FieldValues>({
  title,
  description,
  className,
  columns,
  form,
  baseName,
  editableRows,
  rowFields,
  renderCell,
  yearSelector,
  selectedYear: selectedYearProp,
  editableRowState,
}: Omit<TableGridProps<T>, "rows" | "addRow" | "editableRows"> & {
  editableRows: EditableTableRows;
  editableRowState: import("../editable-rows/types").EditableTableRowState;
}) {
  const { selectedYear, setSelectedYear } = useTableGridYear(yearSelector, selectedYearProp);
  const { fields, remove, rowKeyFieldName, appendRow, insertRow, addEmptyRow } = editableRowState;
  const rows: TableGridRow[] = useMemo(
    () => fields.map((field) => ({ key: field.id, label: "", unit: null })),
    [fields]
  );
  const tableColumns = useMemo(
    () =>
      createTableGridColumns({
        columns,
        form,
        baseName,
        editableRows: { ...editableRows, rowCount: rows.length, onRemoveRow: remove },
        rowFields,
        fieldRows: fields,
        renderCell,
        selectedYear,
      }),
    [baseName, columns, editableRows, fields, form, remove, renderCell, rowFields, rows.length, selectedYear]
  );

  return (
    <section className={className ?? "space-y-3"}>
      <InventoryTableHeader
        title={title}
        description={description}
        endContent={
          <>
            {yearSelector ? (
              <InventoryYearSelector
                datasetKey={yearSelector.datasetKey}
                years={yearSelector.years}
                selectedYear={selectedYear}
                onSelectYear={setSelectedYear}
                ariaLabel={yearSelector.ariaLabel}
                className={yearSelector.className}
              />
            ) : null}
          </>
        }
      />
      <InventoryTanstackTable
        rows={rows}
        columns={tableColumns}
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
            onClick={addEmptyRow}
          >
            <Plus aria-hidden="true" />
            {editableRows.addLabel}
          </InventoryTableActionButton>
        ) : null}
      </div>
    </section>
  );
}
