import React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { FormLabel } from "../forms";
import { cn } from "@/lib/utils";

type Props<T extends string> = {
  state: T;
  setState: (v: T) => void;
  options: { label: string; value: T }[];
  className?: string;
  tone?: "transport" | "energy" | "food" | "neutral";
};

function SegmentedControl<T extends string>({
  state,
  setState,
  options,
  className,
  tone = "neutral",
}: Props<T>) {
  const activeClass =
    tone === "transport"
      ? "bg-section-transport text-primary-foreground"
      : tone === "energy"
        ? "bg-section-energy text-primary-foreground"
        : tone === "food"
          ? "bg-section-food text-primary-foreground"
          : "bg-foreground text-background";

  return (
    <RadioGroupPrimitive.Root
      value={state}
      onValueChange={(v) => setState(v as T)}
      className={cn(
        "inline-flex w-full max-w-md rounded-full border border-input bg-muted/50 p-1",
        className
      )}
    >
      {options.map(({ label, value }) => (
        <RadioGroupPrimitive.Item asChild key={value} value={value}>
          <FormLabel
            className={cn(
              "flex flex-1 cursor-pointer items-center justify-center rounded-full px-4 py-2 text-center text-sm font-medium transition-colors",
              value === state
                ? cn(activeClass, "shadow-sm")
                : "text-foreground/80 hover:text-foreground"
            )}
          >
            <span className="cursor-pointer">{label}</span>
          </FormLabel>
        </RadioGroupPrimitive.Item>
      ))}
    </RadioGroupPrimitive.Root>
  );
}

export default SegmentedControl;
