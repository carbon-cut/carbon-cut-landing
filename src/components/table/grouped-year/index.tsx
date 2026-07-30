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
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: baseName as ArrayPath<T>,
  });
  const rowKeyFieldName = editableRows.rowKeyFieldName ?? "key";

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
      <InventoryTableHeader
        title={title}
        description={description}
        endContent={
          <InventoryTableActionButton
            type="button"
            title={editableRows?.addLabel}
            aria-label={editableRows?.addLabel}
            onClick={() =>
              append(
                // @ts-expect-error - initialize dynamic grouped-year row fields lazily
                { [rowKeyFieldName]: "", value: {} },
                { shouldFocus: true }
              )
            }
          >
            <Plus aria-hidden="true" />
            {editableRows?.addLabel}
          </InventoryTableActionButton>
        }
      />
      <InventoryTanstackTable
        rows={tableRows}
        columns={columns}
        getRowId={(row) => row.key}
        stickyColumnIds={rowFields?.[0] ? [rowFields[0].key] : []}
      />
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
}: GroupedYearTableProps<T>) {
  const { years } = useInventoryContext();

  const columns = useMemo(
    () =>
      createGroupedYearColumns({
        years,
        subcolumns,
        form,
        baseName,
        baseNameBySubcolumn,
        rowCount: rows.length,
      }),
    [baseName, baseNameBySubcolumn, form, rows.length, subcolumns, years]
  );

  return (
    <div className="space-y-3">
      <InventoryTableHeader title={title} description={description} />
      <InventoryTanstackTable
        rows={rows}
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
