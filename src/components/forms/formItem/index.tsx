import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/forms";
import { Input } from "@/components/ui/input";
import React, { cloneElement, InputHTMLAttributes } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

interface props {
  form: UseFormReturn<any, undefined>;
  name: string;
  label?: string | undefined;
  mandetory?: boolean;
  type?: React.HTMLInputTypeAttribute | undefined | "calendar" | "combox";
  children?: (f: ControllerRenderProps<any, string>) => React.ReactNode;
  readOnly?: boolean;
}

const FormComponent: React.FC<props> = ({
  form,
  name,
  label,
  mandetory = true,
  type = "text",
  children,
  readOnly,
}) => {
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
          <FormControl>
            {!children ? (
              <Input
                readOnly={readOnly}
                type={type}
                className="w-[240px] pl-3 text-left font-normal"
                {...field}
              />
            ) : (
              children({ ...field })
            )}
          </FormControl>
          <FormMessage className="text-red-800" style={{ maxWidth: "150px" }} />
        </FormItem>
      )}
    />
  );
};

export default FormComponent;
