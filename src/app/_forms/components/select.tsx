import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/forms";
import {
  SelectContent,
  SelectItem,
  Select as SelectRoot,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

type Props = {
  options: {
    label: string;
    value: string;
  }[];
  form: UseFormReturn<any, undefined>;
  name: string;
  onChange?: (v: any) => void;
  placeholder?: string;
  label?: string;
  description?: string;
};

function Select({
  options,
  form,
  name,
  placeholder,
  label,
  description,
  onChange = () => {},
}: Props) {
  useEffect(() => {
    if (form && name) form.register(name);
  }, [form, name]);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <SelectRoot
            onValueChange={(v) => {
              onChange(v);
              field.onChange(v);
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option, index) => (
                <SelectItem key={index} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default Select;
