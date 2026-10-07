"use client";

import { FieldValues, UseFormReturn } from "react-hook-form";

import { FormControl, FormField, TName } from "@/components/ui/forms";
import { Input } from "@/components/ui/input";

import { FieldShell } from "./CollectivityFieldShell";

type Props<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues, undefined>;
  name: TName<TFieldValues>;
  label: string;
  description?: string;
  accept?: string;
};

export function InventoryFieldFiles<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  description,
  accept,
}: Props<TFieldValues>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const value = Array.isArray(field.value as File[] | undefined)
          ? (field.value as File[])
          : [];
        const fileSummary = value.length ? value.map((file) => file.name).join(", ") : null;

        return (
          <FieldShell label={label} className="md:col-span-2">
            <FormControl>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept={accept}
                  multiple
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                  onChange={(event) => {
                    const files = Array.from(event.target.files ?? []);
                    field.onChange(files.length ? files : undefined);
                  }}
                  className="h-10 rounded-md bg-card"
                />
                <p className="text-xs text-secondary">
                  {fileSummary ?? description ?? "Aucun document joint"}
                </p>
              </div>
            </FormControl>
          </FieldShell>
        );
      }}
    />
  );
}
