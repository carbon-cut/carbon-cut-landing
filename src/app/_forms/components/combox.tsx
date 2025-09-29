import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/forms";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useScopedI18n } from "@/locales/client";
import { type ClassValue } from "clsx"

interface props {
  form: UseFormReturn<any, undefined>;
  name: string;
  label?: string | undefined;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute | undefined | "calendar" | "combox";
  data: { value: any; label: string }[];
  setValue?: (v: any) => void;
  className?: ClassValue;
  disabled?: boolean;
}

const FormCombox: React.FC<props> = ({
  form,
  name,
  label,
  required = false,
  data,
  setValue = (v) => {},
  className,
  disabled = false,
}) => {
  const t = useScopedI18n("components.forms.combox");

  useEffect(() => {
    if (form && name) form.register(name);
  }, [form, name]);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", className)}>
          {label && (
            <FormLabel className="text-sm font-semibold">
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <div>
                <FormControl>
                  <Button
                    variant={"outline"}
                    type="button"
                    className={cn(
                      "w-full pl-3 text-left font-normal rounded-full bg-white disabled:hover:bg-white disabled:hover:text-muted-foreground disabled:cursor-not-allowed disabled:pointer-events-auto",
                      !field.value && "text-muted-foreground",
                    )}
                    disabled={disabled}
                  >
                    {field.value
                      ? data.find((elem) => field.value === elem.value)?.label
                      : t("value", { label })}
                    <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
                <FormMessage className="text-red-800 max-w-full" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Command>
                <CommandInput placeholder={t("placeholder", { label })} />
                <CommandList>
                  <CommandEmpty>{t("notFound", { label })}</CommandEmpty>
                  <CommandGroup>
                    {data.map((element, index) => (
                      <CommandItem
                        className={`${element.value === field.value ? '!bg-card-primary-foreground':''}`}
                        value={element.value}
                        key={index}
                        onSelect={() => {
                          setValue(element.value);
                          form.setValue(name, element.value);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            element.value === field.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {element.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
};

export default FormCombox;
