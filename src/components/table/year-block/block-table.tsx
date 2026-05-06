"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";

import InventoryTanstackTable from "../tanstack";
import { createYearBlockColumns } from "./columns";
import type { BlockTableFormProps } from "./types";
import { ArrayPath, FieldValues, useFieldArray } from "react-hook-form";
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
      // @ts-expect-error - initialization of field array value
      append(block.columns.map(({ key }) => ({ key, value: {} })));
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
      <div className="flex flex-wrap items-center gap-2">
        <Typography asChild variant="sectionTitle" size="sm">
          <h5>{block.title}</h5>
        </Typography>
        {block.editableColumns ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            title="Ajouter une colonne"
            aria-label={`Ajouter une colonne ${block.title}`}
            className="h-8 rounded-full px-3 shadow-none"
            onClick={() =>
              // @ts-expect-error - append new column with empty key and value
              append({ key: "", value: {} })
            }
          >
            <Plus aria-hidden="true" />
            Ajouter une colonne
          </Button>
        ) : null}
      </div>
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
