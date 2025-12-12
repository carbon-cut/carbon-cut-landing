import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  TName,
} from "@/components/ui/forms";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import React, { useEffect, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useScopedI18n } from "@/locales/client";
import { type ClassValue } from "clsx";

interface props<T extends FieldValues> {
  form: UseFormReturn<T, any>;
  name: TName<T>;
  label?: string | undefined;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute | undefined | "calendar" | "combox";
  data: { value: any; label: string }[];
  setValue?: (v: any) => void;
  className?: ClassValue;
  labelClassName?: ClassValue;
  disabled?: boolean;
  loading: boolean;
}

function FormCombox<T extends FieldValues>({
  form,
  name,
  label,
  required = false,
  data,
  setValue = (v) => {},
  className,
  disabled = false,
  labelClassName,
  loading = false,
}: props<T>) {
  const t = useScopedI18n("components.forms.combox");

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (form && name) form.register(name);
  }, [form, name]);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn("w-full", className)}>
          {label && (
            <FormLabel
              data-state={fieldState.error && "error"}
              className={cn(
                `text-sm font-medium 
              ${disabled ? "text-muted-foreground data-[state=error]:text-destructive/60" : ""}`,
                labelClassName
              )}
            >
              {label}
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
                      `w-full pl-3 text-left font-normal rounded-full bg-white disabled:hover:bg-white
                      disabled:hover:text-muted-foreground disabled:cursor-not-allowed disabled:pointer-events-auto
                      ${fieldState.error ? "outline-none ring-1 ring-destructive/60 " : ""}
                      `,
                      !field.value && "text-muted-foreground"
                    )}
                    disabled={disabled}
                  >
                    <span className="truncate">
                      {field.value
                        ? data.find((elem) => field.value === elem.value)?.label
                        : t("value", { label })}
                    </span>
                    <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Command>
                <CommandInput placeholder={t("placeholder", { label })} />
                <CommandList>
                  {loading ? (
                    <div className="flex items-center gap-2 px-4 py-6 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t("loading")}
                    </div>
                  ) : (
                    <>
                      <CommandEmpty>{t("notFound", { label })}</CommandEmpty>
                      <CommandGroup>
                        {data.map((element, index) => (
                          <CommandItem
                            className={`${
                              element.value === field.value ? "!bg-card-primary-foreground" : ""
                            }`}
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
                                element.value === field.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {element.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage
            data-state={disabled && "disabled"}
            className="ml-3 data-[state=disabled]:text-destructive/70"
          />
        </FormItem>
      )}
    />
  );
}

export default FormCombox;
