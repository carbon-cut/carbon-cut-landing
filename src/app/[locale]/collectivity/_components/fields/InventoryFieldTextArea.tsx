import * as React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { FormControl, FormField, TName } from "@/components/ui/forms";
import { FieldShell } from "./CollectivityFieldShell";
import CollectivityTextarea from "./CollectivityTextarea";

export function InventoryFieldTextarea<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  placeholder,
}: {
  form: UseFormReturn<TFieldValues, undefined>;
  name: TName<TFieldValues>;
  label: string;
  placeholder?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FieldShell label={label} className="md:col-span-2">
          <FormControl>
            <CollectivityTextarea {...field} placeholder={placeholder} />
          </FormControl>
        </FieldShell>
      )}
    />
  );
}
