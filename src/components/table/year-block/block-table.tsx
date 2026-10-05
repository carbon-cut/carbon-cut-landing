"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import Typography from "@/components/ui/typography";

import { InventoryTableActionButton, InventoryTableHeader } from "../InventoryTableHeader";
import InventoryTanstackTable from "../tanstack";
import { createYearBlockColumns } from "./columns";
import type { BlockTableFormProps } from "./types";
import { ArrayPath, FieldArray, FieldValues, useFieldArray } from "react-hook-form";
import { TName } from "@/components/ui/forms";

export default function BlockTable<T extends FieldValues>({
  block,
  columns,
  year,
  headerAddon,
  form,
  baseName,
}: BlockTableFormProps<T>) {
  const [initCols, setInitCols] = useState(false);

  const tableName = `${baseName}.${block.key}` as TName<T>;

  useEffect(() => {
    const array = form.getValues(tableName);
    if (array === undefined) {
      setInitCols(true);
    }
  }, [columns, form, tableName]);

  const { fields, append, remove } = useFieldArray({
    name: tableName as ArrayPath<T>,
    control: form.control,
  });
  useEffect(() => {
    if (initCols) {
      append(
        block.columns.map(({ key }) => ({ key, value: {} })) as FieldArray<T, ArrayPath<T>>[],
        { shouldFocus: false }
      );
      setInitCols(false);
    }
  }, [append, block.columns, initCols]);

  const tableColumns = useMemo(
    () =>
      createYearBlockColumns({
        block,
        year,
        onRemoveColumn: remove,
        form,
        tableName,
        fields,
      }),
    [block, year, form, tableName, fields, remove]
  );

  return (
    <section className="space-y-3">
      <InventoryTableHeader
        title={block.title}
        titleAs="h5"
        endContent={
          block.editableColumns ? (
            <InventoryTableActionButton
              type="button"
              title="Ajouter une colonne"
              aria-label={`Ajouter une colonne ${block.title}`}
              onClick={() => append({ key: "", value: {} } as FieldArray<T, ArrayPath<T>>)}
            >
              <Plus aria-hidden="true" />
              Ajouter une colonne
            </InventoryTableActionButton>
          ) : null
        }
      />
      {headerAddon ? <div>{headerAddon}</div> : null}
      {block.note ? (
        <Typography asChild variant="caption" size="sm" className="text-secondary">
          <p>{block.note}</p>
        </Typography>
      ) : null}
      <InventoryTanstackTable
        rows={block.rows}
        columns={tableColumns}
        getRowId={(row) => row.key}
        stickyColumnIds={["label"]}
        headerRowClassName="z-20"
        stickyHeaderClassName="min-w-[124px]"
      />
    </section>
  );
}
