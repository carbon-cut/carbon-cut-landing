import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  TName,
} from "@/components/ui/forms";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
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

interface Props<T extends FieldValues> {
  form: UseFormReturn<T, undefined>;
  name: TName<T>;
  label?: string | undefined;
  mandetory?: boolean;
  type?: React.HTMLInputTypeAttribute | undefined | "calendar" | "combox";
  data: { value: any; label: string }[];
}

function FormCombox<T extends FieldValues>({
  form,
  name,
  label,
  mandetory = true,
  data,
}: Props<T>) {

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && (
            <FormLabel className="mb-1 font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive form-label text-lg">
              {label} {mandetory && <span className="text-red-500">*</span>}
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
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value
                      ? data.find((elem) => elem.value === elem.value)?.label
                      : label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
                <FormMessage className="text-red-800 max-w-full" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Command>
                <CommandInput placeholder={ label } />
                <CommandList>
                  <CommandEmpty>notFound</CommandEmpty>
                  <CommandGroup>
                    {data.map((element) => (
                      <CommandItem
                        value={element.value}
                        key={element.value}
                        onSelect={() => {
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
