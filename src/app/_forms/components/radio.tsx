import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/forms";
import {
  RadioGroup,
  RadioGroupItemCheck,
  RadioGroupItemSwitch,
} from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import {ClassValue} from "clsx";
import React from "react";
import { UseFormReturn } from "react-hook-form";

type Props = {
  options: {
    label: string;
    value: string;
  }[];
  form: UseFormReturn<any, undefined>;
  name: string;
  className?: ClassValue;
  required?: boolean;
  setState?: (v: any) => void;
};
function Radio({ className, options, form, name, required = false, setState }: Props) {
  const selected = (fieldvalue: string, value: string) => fieldvalue === value;
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              className={cn(
                "w-3/6 mx-auto flex flex-row flex-wrap justify-between ", className)
              }
              defaultValue={field.value}
              onValueChange={(v) => {field.onChange(v); setState?.(v)}}
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
                      value={option.value}
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
        </FormItem>
      )}
    />
  );
}

export default Radio;
