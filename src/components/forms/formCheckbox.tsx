import React from "react";
import { FormControl, FormField, FormItem, FormLabel, TName } from "../ui/forms";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { ClassValue,  } from "clsx";
import { cn } from "@/lib/utils";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T,any , undefined>;
  name: TName<T>;
  label?: string | undefined;
  mandetory?: boolean;
  placeholder?: string;
  id: string;
  className?: ClassValue;
  labelClassName?: ClassValue;
}

function FormCheckbox<T extends FieldValues>({ id, form, name, className, label, mandetory, labelClassName }: Props<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex items-center gap-3', className)}>
          <FormControl>
            <Checkbox
              id={id}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          {label && (
            <FormLabel className={cn('', labelClassName)}>
              {label} {mandetory && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
        </FormItem>
      )}
    />
  );
}

export default FormCheckbox;
