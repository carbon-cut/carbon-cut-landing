import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandInput } from "@/components/ui/command";
import { FormField, FormItem, FormLabel, FormMessage, TName, TValue } from "@/components/ui/forms";
import { MenuList } from "@/components/ui/menuList";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useScopedI18n } from "@/locales/client";
import { ClassValue } from "clsx";
import { ChevronsUpDown, Loader2 } from "lucide-react";
import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface Props<T extends FieldValues, N extends TName<T> = TName<T>> {
  form: UseFormReturn<T, undefined>;
  name: N;
  label?: string;
  required?: boolean;
  mandetory?: boolean;
  options: { value: TValue<T, N>; label: React.ReactNode; labelText?: string }[];
  setValue?: (v: any) => void;
  disabled?: boolean;
  className?: ClassValue;
  labelClassName?: ClassValue;
  fallback?: boolean;
  loading: boolean;
  bannedOptions?: any[];
}

function FieldMultiCombobox<T extends FieldValues>({
  form,
  name,
  label,
  required,
  mandetory,
  disabled = false,
  options,
  setValue = () => {},
  className,
  labelClassName,
  fallback = false,
  loading = false,
  bannedOptions = [],
}: Props<T>) {
  const t = useScopedI18n("components.forms.combox");
  const [filteredOptions, setFilteredOptions] = React.useState(options);
  const [open, setOpen] = React.useState(false);

  const isRequired = required ?? mandetory ?? false;

  React.useEffect(() => {
    if (form && name) form.register(name);
  }, [form, name]);

  React.useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const handleSearch = (search: string) => {
    const normalizedSearch = search.toLowerCase();
    setFilteredOptions(
      options.filter(
        (option) =>
          String(option.value ?? "")
            .toLowerCase()
            .includes(normalizedSearch) ||
          (option.labelText ?? (typeof option.label === "string" ? option.label : ""))
            .toLowerCase()
            .includes(normalizedSearch)
      )
    );
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn("", className)}>
          {label && (
            <FormLabel data-state={fieldState.error && "error"} className={cn("", labelClassName)}>
              {label} {isRequired && <span className="text-destructive">*</span>}
            </FormLabel>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                key={`${open}`}
                disabled={disabled}
                variant="outline"
                type="button"
                className={`w-full rounded-full bg-card p-3 text-left font-normal text-ellipsis
                ${field.value ? "" : "text-muted-foreground"}
                ${
                  fieldState.error
                    ? "outline-none ring-1 ring-destructive/60"
                    : open
                      ? "outline-4 ring-1 ring-ring"
                      : ""
                }`}
              >
                {(() => {
                  const selectedOption = options.find((elem) => field.value === elem.value);
                  const selectedLabel = selectedOption?.label;
                  return (
                    <span
                      className={cn(
                        "w-10/12 min-w-0 overflow-hidden",
                        selectedLabel && typeof selectedLabel !== "string"
                          ? "whitespace-normal"
                          : "truncate"
                      )}
                    >
                      {selectedLabel ?? t("value", { label })}
                    </span>
                  );
                })()}
                <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0"
              align="start"
              onFocus={() => setOpen(true)}
              onCloseAutoFocus={() => setOpen(false)}
            >
              <Command shouldFilter={false}>
                <CommandInput
                  onValueChange={handleSearch}
                  placeholder={t("placeholder", { label })}
                />
                {loading ? (
                  <div className="flex items-center gap-2 px-4 py-6 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("loading")}
                  </div>
                ) : (
                  <>
                    <CommandEmpty>{t("notFound", { label })}</CommandEmpty>
                    <MenuList
                      options={filteredOptions}
                      bannedOptions={bannedOptions}
                      onSelectOption={(element: any) => {
                        setValue(element.value);
                        form.setValue(name, element.value);
                      }}
                      selectedValue={field.value}
                    />
                  </>
                )}
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage fallback={fallback} />
        </FormItem>
      )}
    />
  );
}

export default FieldMultiCombobox;
