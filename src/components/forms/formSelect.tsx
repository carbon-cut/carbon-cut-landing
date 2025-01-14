import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/forms";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  form: UseFormReturn<any, undefined>;
  name: string;
  label?: string | undefined;
  mandetory?: boolean;
  data: { label: string; value: string }[];
  placeholder?: string;
}

function FormSelect({
  form,
  name,
  label,
  placeholder,
  mandetory,
  data,
}: Props) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="mb-1 font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive form-label text-lg">
              {label} {mandetory && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
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
