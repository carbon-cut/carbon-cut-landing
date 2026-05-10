"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { type FieldValues, useFieldArray } from "react-hook-form";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useInventoryContext } from "@/app/collectivity/_inventaire/context/inventory-context";
import InventoryTanstackTable from "../tanstack";
import { createMatrixTableColumns } from "./columns";
import type { MatrixTableProps, MatrixTableRow } from "./types";
import { RecordMatrixSchema } from "@/app/collectivity/_inventaire/InventorySchema/_shared";

type MatrixFormRow = RecordMatrixSchema[number];

export default function MatrixTable<T extends FieldValues>({
  title,
  rows,
  form,
  baseName,
  years: yearsOverride,
  renderYearCell,
  editableRows,
}: MatrixTableProps<T>) {
  const { years: inventoryYears } = useInventoryContext();
  const years = yearsOverride ?? inventoryYears;
  const [initCols, setInitCols] = useState(false);

  useEffect(() => {
    if (!editableRows) return;
    const array = form.getValues(baseName);
    if (array === undefined) {
      setInitCols(true);
    }
  }, [baseName, editableRows, form]);

  const { fields, append, remove } = useFieldArray<{ array: RecordMatrixSchema }, "array">({
    // @ts-expect-error - cause we are being tricky
    control: form.control,
    name: baseName as "array",
  });

  useEffect(() => {
    if (initCols) {
      // @ts-expect-error - initialization of field array value
      append(
        rows.map(({ key }) => ({ key, value: {} })),
        { shouldFocus: false }
      );
      setInitCols(false);
    }
  }, [append, rows, initCols]);

  const tableRows: MatrixTableRow[] = useMemo(() => {
    if (!editableRows) return rows;
    return fields.map((field, index) => ({
      key: field.key,
      label: field.key,
      unit: editableRows.unit,
    }));
  }, [rows, editableRows, fields]);

  const handleAddRow = () => {
    if (!editableRows) return;

    append({
      key: "",
      value: {
        value: {},
        unit: editableRows.unit,
      },
    } as MatrixFormRow);
  };

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
    <div className="space-y-3">
      {editableRows ? (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            title={editableRows.addLabel}
            aria-label={editableRows.addLabel}
            className="h-8 rounded-full px-3 shadow-none"
            onClick={handleAddRow}
          >
            <Plus aria-hidden="true" />
            {editableRows.addLabel}
          </Button>
        </div>
      ) : null}
      <InventoryTanstackTable
        title={title}
        rows={tableRows}
        columns={columns}
        getRowId={(row) => row.key}
        stickyColumnIds={["label"]}
      />
    </div>
  );
}
