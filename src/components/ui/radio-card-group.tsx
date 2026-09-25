"use client";

import * as React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type RadioCardOption<T extends string> = {
  value: T;
  label: string;
  description: string;
  disabled?: boolean;
};

type RadioCardGroupProps<T extends string> = {
  value: T;
  onValueChange: (value: T) => void;
  options: RadioCardOption<T>[];
  className?: string;
};

function RadioCardGroup<T extends string>({
  value,
  onValueChange,
  options,
  className,
}: RadioCardGroupProps<T>) {
  return (
    <RadioGroup
      value={value}
      onValueChange={(nextValue) => onValueChange(nextValue as T)}
      className={cn("grid h-auto w-full grid-cols-2 gap-2 mobile:grid-cols-1", className)}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className="flex h-full w-full cursor-pointer items-center gap-3 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-3 has-[[data-state=checked]]:border-brand-300 has-[[data-state=checked]]:bg-brand-50 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50"
        >
          <RadioGroupItem value={option.value} disabled={option.disabled} />
          <span className="flex flex-col items-start gap-1">
            <Typography variant="bodyBold" className="text-default-font">
              {option.label}
            </Typography>
            <Typography variant="captionSubframe" className="text-subtext-color">
              {option.description}
            </Typography>
          </span>
        </label>
      ))}
    </RadioGroup>
  );
}

export default RadioCardGroup;
