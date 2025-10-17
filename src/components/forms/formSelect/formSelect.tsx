import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  TName,
} from "../../ui/forms";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useScopedI18n } from "@/locales/client";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T, undefined>;
  name: TName<T>;
  label?: string | undefined;
  mandetory?: boolean;
  data: { label: string; value: string }[];
  placeholder?: string;
  labelClassName?: string;
}

function FormSelect<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  mandetory,
  data,
  labelClassName
}: Props<T>) {
  const t = useScopedI18n("components.forms.combox");
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className={labelClassName}>
              {label} {mandetory && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger  className="rounded-full w-full pl-3 text-left font-normal bg-white" >
                <SelectValue  placeholder={t("value", { placeholder })}  />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data.map((ele, index) => (
                <SelectItem key={index} value={ele.value}>
                  {ele.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="text-red-800 max-w-full" />
        </FormItem>
      )}
    />
  );
}

export default FormSelect;
