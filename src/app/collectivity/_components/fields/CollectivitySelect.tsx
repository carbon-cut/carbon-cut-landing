"use client";

"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import { cn } from "@/lib/utils";

type CollectivitySelectOption = {
  value: string;
  label: string;
};

type CollectivitySelectProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder: string;
  options: CollectivitySelectOption[];
  className?: string;
  disabled?: boolean;
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
};

const CollectivitySelect = React.forwardRef<HTMLButtonElement, CollectivitySelectProps>(
  ({ value, onValueChange, placeholder, options, className, disabled, ...triggerProps }, ref) => {
    return (
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger
          ref={ref}
          className={cn("h-10 w-full rounded-md bg-card shadow-none", className)}
          {...triggerProps}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);

CollectivitySelect.displayName = "CollectivitySelect";

export default CollectivitySelect;
