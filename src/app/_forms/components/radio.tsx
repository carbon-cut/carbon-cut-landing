import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  TName,
} from "@/components/ui/forms";
import { RadioGroup, RadioGroupItemSwitch } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T, undefined>;
  options: {
    label: string;
    value: string | number | boolean;
  }[];
  name: TName<T>;
  className?: ClassValue;
  required?: boolean;
  setState?: (v: any) => void;
};
function Radio<T extends FieldValues>({
  form,
  name,
  options,
  className = "",
  required = false,
  setState = undefined,
}: Props<T>) {
  const selected = (fieldvalue: string | number | boolean, value: string | number | boolean) =>
    fieldvalue === value;
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              className={cn("w-3/6 mx-auto flex flex-row flex-wrap justify-between ", className)}
              onValueChange={(v) => {
                field.onChange(v);
                setState?.(v);
              }}
              {...form.register(name)}
            >
              {options?.map((option, index) => (
                <FormLabel
                  key={index}
                  htmlFor={`r${index}`}
                  className={`flex items-center pl-3 rounded-lg w-5/12 h-14 ${
                    selected(field.value, option.value)
                      ? "border-slate-600"
                      : "hover:bg-gray-500/20"
                  }`}
                >
                  <FormControl>
                    <RadioGroupItemSwitch
                      value={option.value as string}
                      id={`r${index}`}
                      label={option.label}
                      checked={selected(field.value, option.value)}
                    />
                  </FormControl>
                  <FormLabel className="ml-2" htmlFor={`r${index}`}>
                    {option.label}
                  </FormLabel>
                </FormLabel>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage className="ml-3" />
        </FormItem>
      )}
    />
  );
}

export default Radio;
