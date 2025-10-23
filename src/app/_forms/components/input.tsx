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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
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
  info?: React.ReactNode;
  onChange?: (v: any) => void;
  size?: "xl"|"sm";
  disabled?: boolean;
  labelClassName?: string;
  valueControl?: (v: any) => boolean;
};

function Input<T extends FieldValues>({
  form,
  name,
  label,
  labelClassName,
  placeholder,
  description,
  type,
  unit,
  half = false,
  info = undefined,
  size = "xl",
  disabled = false,
  valueControl = (v: any) =>{
    if (v >= 0 || v === "") return true;
    return false;
  },
  onChange = () => {},
}: Props<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormItem>
            {label && <FormLabel data-state={fieldState.error && "error"} className={cn(
               `text-sm font-medium ${disabled ? 'text-muted-foreground data-[state=error]:text-destructive/60' : ''}`, labelClassName)}>{label}</FormLabel>}
            <FormControl>
              <div className={`w-full inline-block`}>
                <InputRoot
                  disabled={disabled}
                  className={`col-span-2 w-full ${size === 'xl' ? 'h-9' : 'h-8'} rounded-full text-xl bg-white 
                  ${fieldState.error ? 'outline-none ring-1 ring-destructive/60 ' : ''}
                  `}
                  placeholder={placeholder}
                  type={type}
                  {...field}
                  value={field.value ?? ""}
                  {...(type === "number"
                    ? {
                        onChange: (event) => {
                          const val = event.target.value;
                          if (valueControl(val)){
                          onChange(val);
                          return field.onChange?.(
                            parseInt(event.target.value, 0)
                          );}
                        },
                      }
                    : {
                        onChange: (event) => {
                          onChange(event.target.value);
                          return field.onChange(event.target.value);
                        },
                      })}
                      
                />
                <div className="grid grid-cols-2 h-fit">
                  {unit && <p className="self-end mb-2 ml-3">{unit}</p>}
                  {info && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          className="self-end place-self-start text-start  p-0 "
                          variant={"ghost"}
                        >
                          <Info />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent side="right" sideOffset={8}>
                        some notes
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
              </div>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage data-state={disabled && "disabled"} className="ml-3 data-[state=disabled]:text-destructive/60" />
          </FormItem>
        );
      }}
    />
  );
}

export default Input;
