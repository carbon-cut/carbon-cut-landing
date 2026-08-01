"use client";

import { useMemo } from "react";
import type { FieldValues } from "react-hook-form";

import { FieldHelp } from "@/components/ui/field-help";
import InventoryTanstackTable from "../tanstack";
import Typography from "@/components/ui/typography";
import { createScalarTableColumns } from "./columns";
import type { ScalarTableProps, ScalarTableRow } from "./types";

export default function ScalarTable<T extends FieldValues>({
  title,
  help,
  form,
  fields,
}: ScalarTableProps<T>) {
  const rows = useMemo<ScalarTableRow<T>[]>(
    () =>
      fields.map((field) => ({
        key: field.key,
        field,
      })),
    [fields]
  );

  const columns = useMemo(() => createScalarTableColumns(form), [form]);

  return (
    <section className="space-y-2">
      <div className="flex items-start gap-2">
        <Typography variant="sectionTitle" size="lg">
          {title}
        </Typography>
        {help ? <FieldHelp content={help} side="right" align="start" /> : null}
      </div>
      <InventoryTanstackTable
        rows={rows}
        columns={columns}
        getRowId={(row) => row.key}
        stickyColumnIds={["label"]}
      />
    </section>
  );
}
