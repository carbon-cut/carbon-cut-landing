"use client";

import { useEffect, useMemo, useState } from "react";

import { type FieldValues, useFieldArray } from "react-hook-form";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useInventoryContext } from "@/app/collectivity/_inventaire/context/inventory-context";
import InventoryTanstackTable from "../tanstack";
import { createMatrixTableColumns } from "./columns";
import type { MatrixTableProps, MatrixTableRow } from "./types";
import { RecordMatrixSchema } from "@/app/collectivity/_inventaire/InventorySchema/_shared";
import Typography from "@/components/ui/typography/typography";

type MatrixFormRow = RecordMatrixSchema[number];
const emptyRowFields: NonNullable<MatrixTableProps<FieldValues>["rowFields"]> = [];

export default function MatrixTable<T extends FieldValues>({
  title,
  rows,
  form,
  baseName,
  years: yearsOverride,
  renderYearCell,
  editableRows,
  rowFields = emptyRowFields,
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

  const initialRowFieldValues = useMemo(
    () => Object.fromEntries(rowFields.map((field) => [field.key, ""])),
    [rowFields]
  );

  useEffect(() => {
    if (initCols) {
      append(
        rows.map(({ key, unit }) => ({
          key,
          value: {
            value: {},
            unit: unit ?? editableRows?.unit ?? "",
            ...initialRowFieldValues,
          },
        })),
        { shouldFocus: false }
      );
      setInitCols(false);
    }
  }, [append, editableRows?.unit, initialRowFieldValues, rows, initCols]);

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
        ...initialRowFieldValues,
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
        rowFields,
        onRemoveRow: remove,
        rowCount: tableRows.length,
      }),
    [baseName, editableRows, form, remove, renderYearCell, rowFields, tableRows.length, years]
  );

  return (
    <div className="space-y-2">
      {editableRows ? (
        <div className="flex flex-wrap items-start justify-between gap-2 lg:flex-nowrap">
          {title ? (
            <Typography className="my-auto" asChild variant="sectionTitle" size="sm">
              <h4>{title}</h4>
            </Typography>
          ) : null}
          <div className="">
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
        </div>
      ) : null}
      <InventoryTanstackTable
        title={editableRows ? undefined : title}
        rows={tableRows}
        columns={columns}
        getRowId={(row) => row.key}
        stickyColumnIds={["label"]}
      />
    </div>
  );
}
