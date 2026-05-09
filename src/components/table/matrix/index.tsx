"use client";

import { useEffect, useMemo, useState } from "react";

import {
  type ArrayPath,
  FieldArray,
  FieldArrayPath,
  FieldArrayPathValue,
  FieldValue,
  type FieldValues,
  useFieldArray,
  useWatch,
} from "react-hook-form";

import { useInventoryContext } from "@/app/collectivity/_inventaire/context/inventory-context";
import InventoryTanstackTable from "../tanstack";
import { createMatrixTableColumns } from "./columns";
import type { MatrixTableProps, MatrixTableRow } from "./types";
import { TName } from "@/components/ui/forms";
import { RecordMatrixSchema } from "@/app/collectivity/_inventaire/InventorySchema/_shared";

export default function MatrixTable<T extends FieldValues>({
  title,
  rows,
  form,
  baseName,
  renderYearCell,
  editableRows,
}: MatrixTableProps<T>) {
  const { years } = useInventoryContext();

  const [initCols, setInitCols] = useState(false);

  const tableName = baseName;

  useEffect(() => {
    if (!editableRows) return;
    const array = form.getValues(tableName);
    if (array === undefined) {
      setInitCols(true);
    }
  }, [form, tableName, editableRows]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: baseName as ArrayPath<RecordMatrixSchema>,
  });

  useEffect(() => {
    if (initCols && editableRows) {
      // @ts-expect-error - initialization of field array value
      append(rows.map(({ key }) => ({ key, value: { unit: editableRows.unit } })));
      setInitCols(false);
    }
  }, [append, initCols, rows]);

  const tableRows: MatrixTableRow[] = useMemo(() => {
    if (!editableRows) return rows;
    if (!fields) return [];
    console.log("fields", fields);
    return fields.map((field, index) => ({
      key: field.key,
      label: field.key,
      unit: editableRows.unit,
    }));
  }, [fields, rows, editableRows]);

  const columns = useMemo(
    () =>
      createMatrixTableColumns({
        years,
        baseName,
        form,
        renderYearCell,
        editableRows,
        onRemoveRow: remove,
        rowCount: tableRows.length,
      }),
    [baseName, editableRows, form, remove, renderYearCell, tableRows.length, years]
  );

  return (
    <InventoryTanstackTable
      title={title}
      rows={tableRows}
      columns={columns}
      getRowId={(row) => row.key}
      stickyColumnIds={["label"]}
    />
  );
}
