import React from "react";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, TValue } from "../../ui/forms";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { useScopedI18n } from "@/locales/client";
import { cn } from "@/lib/utils";

interface Props<T extends FieldValues, E extends FieldPath<T>> {
  form: UseFormReturn<T, any, undefined>;
  name: E;
  label?: string;
  /**
   * Controls visual rendering of the label while keeping the accessibility label.
   * - "visible": normal label
   * - "hidden": takes up space but is visually hidden (keeps grid alignment)
   * - "srOnly": screen-reader only (no layout space)
   */
  labelVisibility?: "visible" | "hidden" | "srOnly";
  required?: boolean;
  mandetory?: boolean;
  data: { label: string; value: TValue<T, E> }[];
  placeholder?: string;
  labelClassName?: string;
  fallback?: boolean;
  size?: "sm" | "xl";
  attachedFields?: FieldPath<T>[];
  isError?: boolean;
  disabled?: boolean;
}

function FieldSelect<T extends FieldValues, E extends FieldPath<T>>({
  form,
  name,
  label,
  labelVisibility = "visible",
  placeholder,
  required,
  mandetory,
  data,
  labelClassName,
  fallback = false,
  size = "xl",
  attachedFields = [],
  isError = false,
  disabled = false,
}: Props<T, E>) {
  const t = useScopedI18n("components.forms.combox");

  const [open, setOpen] = React.useState(false);
  const {
    trigger,
    formState: { isSubmitted },
  } = form;

  const isRequired = required ?? mandetory ?? false;

  const verifyAttachedFields = () => {
    if (isSubmitted || isError) {
      void trigger(attachedFields);
    }
  };

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
                labelVisibility === "hidden" ? "opacity-0 select-none" : "",
                labelVisibility === "srOnly" ? "sr-only" : "",
                labelClassName
              )}
            >
              {label} {isRequired && <span className="text-destructive">*</span>}
            </FormLabel>
          )}
          <Select
            disabled={disabled}
            onValueChange={(value) => {
              field.onChange(value);
              verifyAttachedFields();
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger
                disabled={disabled}
                data-size={"none"}
                onClick={(e) => {
                  if (disabled) return;
                  setOpen(true);
                }}
                key={`${open}`}
                className={`rounded-full w-full  
                text-left font-normal bg-white text-ellipsis
                 ${disabled ? "bg-muted text-muted-foreground cursor-not-allowed opacity-70" : ""}
                 ${fieldState.error ? "outline-none ring-1 ring-destructive/60 " : open && !disabled ? "outline-4 ring-1 ring-ring" : ""}
                 ${size === "sm" ? "h-8 [&_span]:text-xs [&_svg]:size-3.5" : "h-9"}
                 `}
              >
                <SelectValue placeholder={placeholder ?? t("value")} />
              </SelectTrigger>
            </FormControl>
            <SelectContent onFocus={() => setOpen(true)} onCloseAutoFocus={() => setOpen(false)}>
              {data.map((ele, index) => (
                <SelectItem key={index} value={String(ele.value)}>
                  {ele.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage fallback={fallback} className={labelClassName} />
        </FormItem>
      )}
    />
  );
}

export default FieldSelect;
