import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel } from "@/components/ui/forms";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandInput } from "@/components/ui/command";
import { MenuList } from "@/components/ui/menuList";
import { ClassValue } from "clsx";
import { useScopedI18n } from "@/locales/client";

interface props {
  form: UseFormReturn<any, undefined>;
  name: string;
  label?: string | undefined;
  mandetory?: boolean;
  type?: React.HTMLInputTypeAttribute | undefined | "calendar" | "combox";
  data: { value: any; label: string }[];
  setValue?: (v: any) => void;
  disabled?: boolean;
  className?: ClassValue;
  labelClassName?: ClassValue;
}

const FormMultiCombox: React.FC<props> = ({
  form,
  name,
  label,
  mandetory = false,
  disabled = false,
  data,
  setValue = () => {},
  className,
  labelClassName,
}) => {
  const t = useScopedI18n("components.forms.combox");
  const [filteredOptions, setFilteredOptions] = React.useState(data);
  useEffect(() => {
    if (form && name) form.register(name);
  }, [form, name]);

  const handleSearch = (search: string) => {
    setFilteredOptions(
      data.filter(
        (option) =>
          option.value.toLowerCase().includes(search.toLowerCase() ?? []) ||
          option.label.toLowerCase().includes(search.toLowerCase() ?? [])
      )
    );
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("", className)}>
          {label && (
            <FormLabel aria-disabled={disabled} className={cn(`${disabled ? '!text-muted-foreground/60' : ''}`, labelClassName)}>
              {label} {mandetory && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                disabled={disabled}
                variant={"outline"}
                type="button"
                className={cn(
                  "hover:text-muted-foreground w-full pl-3 text-left font-normal rounded-full bg-white disabled:hover:bg-white disabled:cursor-not-allowed disabled:pointer-events-auto",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value
                  ? data.find((elem) => field.value === elem.value)?.label
                  : t("value", { label })}
                <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Command shouldFilter={false}>
                <CommandInput
                  onValueChange={handleSearch}
                  placeholder={t("placeholder", { label })}
                />
                <CommandEmpty>{t("notFound", { label })}</CommandEmpty>

                <MenuList
                  options={filteredOptions}
                  onSelectOption={(element: any) => {
                    setValue(element.value);
                    form.setValue(name, element.value);
                  }}
                  selectedValue={field.value}
                />
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
};

export default FormMultiCombox;
