import React from "react";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/forms";
import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { ClassValue,  } from "clsx";
import { cn } from "@/lib/utils";

interface Props {
  form: UseFormReturn<any, undefined>;
  name: string;
  label?: string | undefined;
  mandetory?: boolean;
  placeholder?: string;
  id: string;
  className?: ClassValue;
  labelClassName?: ClassValue;
}

function FormCheckbox({ id, form, name, className, label, mandetory, labelClassName }: Props) {
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
