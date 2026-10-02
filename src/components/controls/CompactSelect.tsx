"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type CompactSelectOption = {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
};

type CompactSelectProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder: string;
  options: CompactSelectOption[];
  leadingIcon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
};

export default function CompactSelect({
  value,
  onValueChange,
  placeholder,
  options,
  leadingIcon,
  className,
  disabled,
  loading = false,
  ...triggerProps
}: CompactSelectProps) {
  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled || loading}
    >
      <SelectPrimitive.Trigger
        data-slot="compact-select-trigger"
        className={cn(
          "flex h-6 max-w-full flex-none cursor-pointer items-center justify-center gap-1 rounded-md border border-solid border-neutral-border bg-default-background px-2 text-left text-caption-bold font-caption-bold text-neutral-700 hover:bg-neutral-50 active:bg-default-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:cursor-default disabled:bg-neutral-200 disabled:text-neutral-400",
          className
        )}
        {...triggerProps}
      >
        {leadingIcon ? (
          <span className="flex shrink-0 text-body font-body" aria-hidden="true">
            {leadingIcon}
          </span>
        ) : null}
        <span className="grow truncate whitespace-nowrap">
          <SelectPrimitive.Value placeholder={placeholder} />
        </span>
        <SelectPrimitive.Icon asChild>
          <ChevronDownIcon className="size-3 shrink-0" aria-hidden="true" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          data-slot="compact-select-content"
          position="popper"
          align="start"
          sideOffset={4}
          className="z-50 flex max-h-80 min-w-48 flex-col items-start overflow-y-auto rounded-md border border-solid border-neutral-border bg-default-background px-1 py-1 shadow-lg"
        >
          <SelectPrimitive.Viewport className="w-full">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className="group flex h-8 w-full cursor-pointer items-center gap-2 rounded-md px-3 outline-none hover:bg-neutral-100 active:bg-neutral-50 data-[highlighted]:bg-neutral-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                {option.icon ? (
                  <span
                    className="flex shrink-0 text-body font-body text-default-font"
                    aria-hidden="true"
                  >
                    {option.icon}
                  </span>
                ) : null}
                <SelectPrimitive.ItemText>
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-body font-body text-default-font">
                    {option.label}
                  </span>
                </SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

export type { CompactSelectOption, CompactSelectProps };
