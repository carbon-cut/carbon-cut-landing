import { FieldValues, UseFormReturn } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  TName,
} from "@/components/ui/forms";

export function InventoryFieldCheckbox<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  description,
}: {
  form: UseFormReturn<TFieldValues, undefined>;
  name: TName<TFieldValues>;
  label: string;
  description?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormControl>
            <Checkbox
              checked={field.value === true}
              label={label}
              onCheckedChange={(checked) => field.onChange(checked === true)}
            />
          </FormControl>
          {description ? <FormDescription>{description}</FormDescription> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
