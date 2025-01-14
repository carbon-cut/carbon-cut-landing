import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  TName,
} from "@/components/ui/forms";
import { InputProps, Input as InputRoot } from "@/components/ui/input";
import React, { useEffect } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T, undefined>;
  name: TName<T>;
  placeholder?: string;
  label?: string;
  description?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  unit?: string;
  half?: boolean;
  inputProps?: InputProps;
  setChange?: React.Dispatch<React.SetStateAction<boolean>>;
};

function TableInput<T extends FieldValues>({
  inputProps,
  form,
  name,
  label,
  placeholder,
  description,
  type,
  unit,
  setChange = () => {},
}: Props<T>) {
  useEffect(() => {
    if (form && name) form.register(name);
  }, [form, name]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { onChange, ...rest } }) => {
        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <div>
                <InputRoot
                  {...inputProps}
                  onChange={(e) => {
                    setChange((prev) => !prev);
                    onChange(e);
                  }}
                  className=""
                  placeholder={placeholder}
                  type={type}
                  {...rest}
                  value={inputProps?.value ?? rest.value ?? ""}
                />
                <p className="self-end mb-2 ml-3">{unit}</p>
              </div>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export default TableInput;
