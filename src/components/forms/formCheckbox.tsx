import React from "react";
import { FormControl, FormField, FormItem } from "../ui/forms";
import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { ClassNameValue } from "tailwind-merge";
import { ClassValue, ClassArray } from "clsx";
import { cn } from "@/lib/utils";

interface Props {
  form: UseFormReturn<any, undefined>;
  name: string;
  label?: string | undefined;
  mandetory?: boolean;
  placeholder?: string;
  id: string;
  className?: ClassValue;
}

function FormCheckbox({ id, form, name, className }: Props) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormControl>
            <Checkbox
              id={id}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export default FormCheckbox;
