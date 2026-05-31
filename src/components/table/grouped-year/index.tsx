"use client";

import { useMemo } from "react";

import { type ArrayPath, type FieldValues, useFieldArray } from "react-hook-form";
import { Plus } from "lucide-react";

import { useInventoryContext } from "@/app/collectivity/_inventaire/context/inventory-context";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import InventoryTanstackTable from "../tanstack";
import { createGroupedYearColumns } from "./columns";
import type { GroupedYearEditableRows, GroupedYearTableProps } from "./types";
import type { TName } from "@/components/ui/forms";

function EditableInventoryGroupedYearTable<T extends FieldValues>({
  title,
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
      }),
    [baseName, editableRows, form, remove, rowFields, subcolumns, tableRows.length, years]
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-3 lg:flex-nowrap">
        {title ? (
          <Typography className="my-auto" asChild variant="sectionTitle" size="sm">
            <h4>{title}</h4>
          </Typography>
        ) : null}
        <Button
          type="button"
          variant="outline"
          size="sm"
          title={editableRows?.addLabel}
          aria-label={editableRows?.addLabel}
          className="h-8 rounded-full px-3 shadow-none"
          onClick={() =>
            append(
              // @ts-expect-error - initialize dynamic grouped-year row fields lazily
              { key: "", value: {} },
              { shouldFocus: true }
            )
          }
        >
          <Plus aria-hidden="true" />
          {editableRows?.addLabel}
        </Button>
      </div>
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
    <InventoryTanstackTable
      title={title}
      rows={rows}
      columns={columns}
      getRowId={(row) => row.key}
      stickyColumnIds={["label"]}
    />
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
