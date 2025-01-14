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
import { ClassValue } from "clsx";
import { Info } from "lucide-react";
import React, { useEffect } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

type Props<FormShema extends FieldValues> = {
  form: UseFormReturn<FormShema, undefined>;
  name: TName<FormShema>;
  placeholder?: string;
  label?: string;
  description?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  unit?: string;
  half?: boolean;
  info?: React.ReactNode;
  className?: ClassValue;
  onChange?: (v: any) => void;
  disabeled?: boolean;
};

function MinimalInput<FormShema extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  description,
  type,
  unit,
  info = undefined,
  className,
  disabeled = false,
  onChange = () => {},
}: Props<FormShema>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={cn("!mt-0", className)}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <div className="flex items-center justify-start h-full">
                <InputRoot
                  className="w-full min-w-8 max-w-16 border-0 border-b rounded-none flex h-fit  border-input bg-background px-1 py-0 text-sm placeholder:text-muted-foreground
                  focus:border-b-2
                  ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0
                  disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={placeholder}
                  disabled={disabeled}
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
                <div className="">
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

export default MinimalInput;
