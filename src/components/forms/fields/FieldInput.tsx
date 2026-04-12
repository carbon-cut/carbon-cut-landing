import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  TName,
} from "@/components/ui/forms";
import { Input as InputRoot } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import React, { useRef } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T, undefined>;
  name: TName<T>;
  placeholder?: string;
  label?: string;
  description?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  unit?: React.ReactNode;
  info?: React.ReactNode;
  onChange?: (v: any) => void;
  size?: "xl" | "sm";
  disabled?: boolean;
  labelClassName?: string;
  valueControl?: (v: any) => boolean;
  className?: string;
  fallback?: boolean;
  attachedFields?: TName<T>[];
  isError?: boolean;
};

function FieldInput<T extends FieldValues>({
  form,
  name,
  label,
  labelClassName,
  placeholder,
  description,
  type,
  unit = <></>,
  info,
  onChange,
  size = "xl",
  disabled = false,
  className,
  fallback = false,
  isError = false,
  attachedFields = [],
  valueControl = (v: any) => v >= 0 || v === "",
}: Props<T>) {
  const {
    trigger,
    formState: { isSubmitted },
  } = form;

  const verifyAttachedFields = () => {
    if (isSubmitted || isError) {
      void trigger(attachedFields);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

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
            >
              {label}
            </FormLabel>
          )}

          <div className={cn("w-full inline-block", className)}>
            <FormControl>
              <InputRoot
                disabled={disabled}
                className={cn(
                  `w-full ${size === "xl" ? "h-9" : "h-8 !text-xs"} rounded-full bg-card ${
                    fieldState.error ? "outline-none ring-1 ring-destructive/60" : ""
                  }`
                )}
                placeholder={placeholder}
                type={type}
                {...field}
                ref={(node) => {
                  inputRef.current = node;
                  field.ref(node);
                }}
                value={field.value ?? ""}
                {...(type === "number"
                  ? {
                      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                        const val = event.target.value;

                        if (val === "") {
                          field.onChange("");
                          onChange?.("");
                          verifyAttachedFields();
                          return;
                        }

                        if (!valueControl(val)) {
                          return;
                        }

                        const parsedValue = Number(val);
                        if (!Number.isNaN(parsedValue)) {
                          field.onChange(parsedValue);
                          onChange?.(parsedValue);
                          verifyAttachedFields();
                        }
                      },
                    }
                  : {
                      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                        field.onChange(event.target.value);
                        onChange?.(event.target.value);
                        verifyAttachedFields();
                      },
                    })}
              />
            </FormControl>

            <div className="grid grid-cols-2 h-fit">
              {unit}
              {info && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="self-end place-self-start p-0 text-start" variant="ghost">
                      <Info />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent side="right" sideOffset={8}>
                    {info}
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage
            className={labelClassName}
            fallback={fallback}
            data-state={disabled && "disabled"}
          />
        </FormItem>
      )}
    />
  );
}

export default FieldInput;
