"use client";

import { useEffect, useState } from "react";
import { useWatch, type FieldValues } from "react-hook-form";

import InventoryTableInput from "../InventoryTableInput";
import { InventoryTableHeader } from "../InventoryTableHeader";
import { FieldHelp } from "@/components/ui/field-help";
import type { ScalarTableProps } from "./types";

export default function ScalarTable<T extends FieldValues>({
  title,
  form,
  fields,
}: ScalarTableProps<T>) {
  return (
    <section className="space-y-3">
      <InventoryTableHeader title={title} />
      <div className="overflow-hidden rounded-2xl border border-border/10 bg-card">
        {fields.map((field, index) => (
          <ScalarTableRow
            key={field.key}
            form={form}
            field={field}
            isLast={index === fields.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

function ScalarTableRow<T extends FieldValues>({
  form,
  field,
  isLast,
}: {
  form: ScalarTableProps<T>["form"];
  field: ScalarTableProps<T>["fields"][number];
  isLast: boolean;
}) {
  const watchedUnit = useWatch({
    control: form.control,
    name: field.unitName,
  });
  const [fieldUnit] = useState(form.getValues(field.unitName));

  useEffect(() => {
    if (fieldUnit === undefined || fieldUnit === "") {
      form.setValue(
        field.unitName,
        // @ts-expect-error - scalar table unit path is dynamic
        field.unit
      );
    }
  }, [fieldUnit]);

  return (
    <div
      className={`grid gap-3 px-4 py-3 md:grid-cols-[minmax(0,1fr)_18rem] ${isLast ? "" : "border-b border-border/10"}`}
    >
      <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
        <span>{field.label}</span>
        {field.helper ? <FieldHelp content={field.helper} /> : null}
      </div>
      <InventoryTableInput
        form={form}
        name={field.valueName}
        type={field.type ?? "number"}
        unitAdornment={watchedUnit}
      />
    </div>
  );
}
