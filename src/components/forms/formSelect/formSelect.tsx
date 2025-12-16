import React from "react";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  TName,
  TValue,
} from "../../ui/forms";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
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
  fallback?: boolean;
  size?: "sm" | "xl";
  onChange?: (v: string) => void;
  disabled?: boolean;
}

function FormSelect<T extends FieldValues, E extends FieldPath<T>>({
  form,
  name,
  label,
  placeholder,
  mandetory,
  data,
  labelClassName,
  fallback = false,
  size = "xl",
  disabled = false,
  onChange = () => {},
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
            <FormLabel
              data-state={fieldState.error && "error"}
              className={cn(
                `text-sm font-medium ${
                  disabled ? "text-muted-foreground data-[state=error]:text-destructive/60" : ""
                }`,
                labelClassName
              )}
              data-disabled={disabled}
            >
              {label} {mandetory && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <Select
            disabled={disabled}
            onValueChange={(_) => {
              field.onChange(_);
              onChange(_);
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger
                data-size={"none"}
                onClick={() => {
                  setOpen(true);
                }}
                disabled={disabled}
                key={`${open}`}
                className={`rounded-full w-full  
                text-left font-normal bg-white text-ellipsis
                 ${fieldState.error ? "outline-none ring-1 ring-destructive/60 " : open ? "outline-4 ring-1 ring-ring" : ""}
                 ${size === "sm" ? "h-8 [&_span]:text-xs [&_svg]:size-3.5" : "h-9"}
                 `}
              >
                <SelectValue placeholder={placeholder ?? t("value", { placeholder })} />
              </SelectTrigger>
            </FormControl>
            <SelectContent onFocus={(_) => setOpen(true)} onCloseAutoFocus={(_) => setOpen(false)}>
              {data.map((ele, index) => (
                <SelectItem key={index} value={ele.value}>
                  {ele.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage
            data-state={disabled && "disabled"}
            fallback={fallback}
            className={labelClassName}
          />
        </FormItem>
      )}
    />
  );
}

export default FormSelect;
