import * as React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { FormControl, FormField, TName } from "@/components/ui/forms";
import CollectivitySelect from "./CollectivitySelect";
import { FieldShell } from "./CollectivityFieldShell";

export function InventoryFieldSelect<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  options,
}: {
  form: UseFormReturn<TFieldValues, undefined>;
  name: TName<TFieldValues>;
  label: string;
  placeholder: string;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FieldShell label={label}>
          <FormControl>
            <CollectivitySelect
              value={field.value ?? ""}
              onValueChange={field.onChange}
              placeholder={placeholder}
              options={options}
              className="w-full"
            />
          </FormControl>
        </FieldShell>
      )}
    />
  );
}
