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
};

function Input<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  description,
  type,
  unit,
  half = false,
  info = undefined,
  size = "xl",
  onChange = () => {},
}: Props<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            {label && <FormLabel className="text-lg font-bold" >{label}</FormLabel>}
            <FormControl>
              <div className={`w-full inline-block`}>
                <InputRoot
                  className={`col-span-2 w-full ${size === 'xl' ? 'h-12' : 'h-8'} rounded-full text-3xl bg-white`}
                  placeholder={placeholder}
                  type={type}
                  {...field}
                  {...(type === "number"
                    ? {
                        onChange: (event) => {
                          onChange(event.target.value);
                          return field.onChange?.(
                            parseInt(event.target.value, 0),
                          );
                        },
                      }
                    : {
                        onChange: (event) => {
                          onChange(event.target.value);
                          return field.onChange(event.target.value);
                        },
                      })}
                      
                />
                <div className="grid grid-cols-2">
                  <p className="self-end mb-2 ml-3">{unit}</p>
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
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export default Input;
