"use client";

import { FieldValues, UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  TName,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/forms";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type InputType =
  | React.HTMLInputTypeAttribute
  | undefined
  | "calendar"
  | "combox"
  | "boolean";

interface props<FormShema extends FieldValues> {
  form: UseFormReturn<FormShema, undefined>;
  name: TName<FormShema>;
  label?: string | undefined;
  mandetory?: boolean;
  type?: InputType;
  data: { label: string; value: string }[];
}

export function FormRadio<FormShema extends FieldValues>({
  form,
  name,
  label,
  mandetory = true,
  type,
  data,
}: props<FormShema>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        console.log(field.value);

        return (
          <FormItem className="space-y-3 w-full">
            {label && (
              <FormLabel className="mb-1 font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive form-label text-lg">
                {label} {mandetory && <span className="text-red-500">*</span>}
              </FormLabel>
            )}
            <FormControl>
              <RadioGroup
                defaultValue={field.value}
                className="flex flex-col space-y-1"
                onValueChange={onChange(name, form, type, field.onChange)}
              >
                {data.map((element, index) => (
                  <FormItem
                    key={index}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem
                        checked={checked(type, element, field.value)}
                        value={element.value}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {element.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage className="text-red-800 max-w-full" />
          </FormItem>
        );
      }}
    />
  );
}

function checked(
  type: InputType,
  element: { label: string; value: string },
  fieldValue?: unknown ,
): boolean | undefined {
  switch (type) {
    case "boolean":
      return (
        (element.value === "true" && fieldValue) ||
        (element.value === "false" && fieldValue === false)
      ) ? true : false;
    default:
      return element.value === fieldValue;
  }
}

function onChange<FormShema extends FieldValues>(
  name: TName<FormShema>,
  form: UseFormReturn<FormShema, undefined>,
  type: InputType,
  fieldOnChange: (v: any) => void,
): (v: any) => void {
  switch (type) {
    case "boolean":
      return (v: string) => {
        fieldOnChange(v === "true");
      };
    case "default":
      return fieldOnChange;
  }
  return fieldOnChange;
}
