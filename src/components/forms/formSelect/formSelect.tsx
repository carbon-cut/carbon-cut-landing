import React, { useEffect } from "react";
import { FieldPath, FieldValues, set, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  TName,
  TValue
} from "../../ui/forms";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useScopedI18n } from "@/locales/client";
import { cn } from "@/lib/utils";

interface Props<T extends FieldValues, E extends FieldPath<T>> {
  form: UseFormReturn<T, any, undefined>;
  name: E;
  label?: string | undefined;
  mandetory?: boolean;
  data: { label: string; value: TValue<T, E> }[];
  placeholder?: string;
  labelClassName?: string;
}

function FormSelect<T extends FieldValues, E extends FieldPath<T>>({
  form,
  name,
  label,
  placeholder,
  mandetory,
  data,
  labelClassName
}: Props<T, E>) {
  const t = useScopedI18n("components.forms.combox");

  const [open, setOpen] = React.useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && (
            <FormLabel data-state={fieldState.error && "error"} className={cn('', labelClassName)}>
              {label} {mandetory && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <Select onValueChange={(_) => {console.log(_) ;field.onChange(_)}} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger 
              onClick={e=>{setOpen(true)}}
              key={`${open}`}
              className={`rounded-full w-full pl-3 
                text-left font-normal bg-white
                 ${fieldState.error ? 'outline-none ring-1 ring-destructive/60 ' : open ? 'outline-4 ring-1 ring-ring' : ''}`} >
                <SelectValue  placeholder={placeholder ?? t("value", { placeholder })}  />
              </SelectTrigger>
            </FormControl>
            <SelectContent onFocus={_=>setOpen(true)} onCloseAutoFocus={_=>setOpen(false)}>
              {data.map((ele, index) => (
                <SelectItem key={index} value={ele.value}>
                  {ele.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="data-[state=disabled]:text-destructive/60" />
        </FormItem>
      )}
    />
  );
}

export default FormSelect;
