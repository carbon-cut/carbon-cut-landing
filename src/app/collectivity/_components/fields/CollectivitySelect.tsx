"use client";

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
};

export default function CollectivitySelect({
  value,
  onValueChange,
  placeholder,
  options,
  className,
}: CollectivitySelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={cn("h-10 w-full rounded-md bg-card shadow-none", className)}>
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
