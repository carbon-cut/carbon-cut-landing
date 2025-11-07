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
import Unit from "./unit";

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
  size?: "xl"|"sm";
  disabled?: boolean;
  labelClassName?: string;
  valueControl?: (v: any) => boolean;
  className?: string;
  fallback?: boolean;
};

function Input<T extends FieldValues>({
  form,
  name,
  label,
  labelClassName,
  placeholder,
  description,
  type,
  unit= <></>,
  info = undefined,
  size = "xl",
  disabled = false,
  className,
  fallback = false,
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
              <div className={cn(`w-full inline-block`, className)}>
                <InputRoot
                  disabled={disabled}
                  className={cn(`w-full ${size === 'xl' ? 'h-9 text-xl' : 'h-8 !text-xs'} rounded-full  bg-white 
                  ${fieldState.error ? 'outline-none ring-1 ring-destructive/60 ' : ''}
                  `, '')}
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
                  {unit}
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
            <FormMessage className={labelClassName} 
            fallback={fallback} data-state={disabled && "disabled"}  />
          </FormItem>
        );
      }}
    />
  );
}

export default Input;
