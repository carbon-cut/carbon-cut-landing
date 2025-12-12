import React from "react";
import { RadioGroup, RadioGroupItem, RadioGroupItemCheck } from "../radio-group";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { FormLabel } from "../forms";
import { cn } from "@/lib/utils";

type Props<T extends string> = {
  state: T;
  setState: (v: T) => void;
  options: { label: string; value: T }[];
  className?: string;
};

function SegmentedControl<T extends string>({ state, setState, options, className }: Props<T>) {
  return (
    <RadioGroup
      value={state}
      onValueChange={(v) => {
        setState(v as T);
      }}
      className={cn("inline-flex rounded-lg bg-gray-300 p-1 md:w-2/3 max-w-md", className)}
    >
      {options.map(({ label, value }) => (
        <RadioGroupPrimitive.Item asChild key={value} value={value}>
          <FormLabel
            className={`flex flex-1 items-center justify-center px-6 md:py-3 py-1 rounded-md text-sm font-medium transition-all duration-200 text-center cursor-pointer ${
              value === state
                ? "bg-[#00A261] text-white shadow-sm"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            <span className="cursor-pointer">{label}</span>
          </FormLabel>
        </RadioGroupPrimitive.Item>
      ))}
    </RadioGroup>
  );
}

export default SegmentedControl;
