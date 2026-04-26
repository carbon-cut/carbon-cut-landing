"use client";

import { CollectivityInput } from "../../_components/fields";

const numericValuePattern = /^-?[\d\s]+(?:[.,]\d+)?(?:\s+(.+))?$/;

function parseInventoryValue(value: string) {
  const trimmedValue = value.trim();
  const match = trimmedValue.match(numericValuePattern);

  if (!match) {
    return {
      inputType: "text" as const,
      value: trimmedValue,
      unit: undefined,
    };
  }

  const numericPart = trimmedValue.slice(0, trimmedValue.length - (match[1]?.length ?? 0)).trim();
  const normalizedValue = numericPart.replace(/\s/g, "").replace(",", ".");
  const parsedValue = Number(normalizedValue);

  if (Number.isNaN(parsedValue)) {
    return {
      inputType: "text" as const,
      value: trimmedValue,
      unit: undefined,
    };
  }

  return {
    inputType: "number" as const,
    value: normalizedValue,
    unit: match[1],
  };
}

export default function InventoryTableInput({
  defaultValue,
  value,
  onValueChange,
}: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  const parsedValue = parseInventoryValue(value ?? defaultValue ?? "");

  return (
    <CollectivityInput
      className="h-9 min-w-[40px] rounded-lg border-border/15 bg-muted/50  px-3 text-sm shadow-none md:min-w-[40px]"
      {...(value === undefined
        ? { defaultValue: parsedValue.value }
        : { value: parsedValue.value })}
      type={parsedValue.inputType}
      unitAdornment={parsedValue.unit}
      unitAdornmentPlacement="end"
      onChange={(event) => onValueChange?.(event.target.value)}
    />
  );
}
