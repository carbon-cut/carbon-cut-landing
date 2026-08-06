import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, TName } from "@/components/ui/forms";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T, any, undefined>;
  name: TName<T>;
  label?: string;
  required?: boolean;
  mandetory?: boolean;
  id: string;
  className?: ClassValue;
  labelClassName?: ClassValue;
}

function FieldCheckbox<T extends FieldValues>({
  id,
  form,
  name,
  className,
  label,
  required,
  mandetory,
  labelClassName,
}: Props<T>) {
  const isRequired = required ?? mandetory ?? false;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex items-center gap-3", className)}>
          <FormControl>
            <Checkbox id={id} checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          {label && (
            <FormLabel className={cn("", labelClassName)}>
              {label} {isRequired && <span className="text-destructive">*</span>}
            </FormLabel>
          )}
        </FormItem>
      )}
    />
  );
}

export default FieldCheckbox;
