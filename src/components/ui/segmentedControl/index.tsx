import React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import Typography from "../typography";
import { cn } from "@/lib/utils";

type Option<T extends string> = {
  label: string;
  value: T;
  icon?: React.ReactNode;
  disabled?: boolean;
};

type Props<T extends string> = {
  state: T;
  setState: (value: T) => void;
  options: Option<T>[];
  className?: string;
  /** @deprecated Kept for existing consumers; the Subframe-aligned control is neutral. */
  tone?: "transport" | "energy" | "food" | "neutral";
};

function SegmentedControl<T extends string>({ state, setState, options, className }: Props<T>) {
  return (
    <RadioGroupPrimitive.Root
      value={state}
      onValueChange={(value) => setState(value as T)}
      className={cn(
        "flex items-center gap-0.5 overflow-hidden rounded-md bg-neutral-100 p-0.5",
        className
      )}
    >
      {options.map(({ label, value, icon, disabled }) => (
        <RadioGroupPrimitive.Item asChild key={value} value={value} disabled={disabled}>
          <label className="flex h-7 w-full cursor-pointer items-center justify-center gap-2 rounded-md px-2 py-1 active:bg-neutral-100 data-[state=checked]:bg-default-background data-[state=checked]:shadow-sm data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50">
            {icon ? (
              <span
                className={cn(
                  "flex size-3.5 [&_svg]:size-3.5",
                  value === state ? "text-default-font" : "text-subtext-color"
                )}
              >
                {icon}
              </span>
            ) : null}
            <Typography
              variant="captionBold"
              className={cn(
                "whitespace-nowrap",
                value === state ? "text-default-font" : "text-subtext-color"
              )}
            >
              {label}
            </Typography>
          </label>
        </RadioGroupPrimitive.Item>
      ))}
    </RadioGroupPrimitive.Root>
  );
}

export default SegmentedControl;
