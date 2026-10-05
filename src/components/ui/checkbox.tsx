"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { FormLabel } from "./forms";

type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  label?: React.ReactNode;
};

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, label, ...props }, ref) => (
    <CheckboxPrimitive.Root ref={ref} asChild {...props}>
      <button
        className={cn(
          "group flex cursor-pointer items-center gap-2 text-left focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed",
          className
        )}
      >
        <span
          className={cn(
            "flex h-4 w-4 flex-none flex-col items-center justify-center gap-2 rounded-sm border-2 border-solid border-neutral-300 bg-default-background",
            "group-hover:border-brand-600 group-hover:bg-brand-50",
            "group-active:border-brand-600",
            "group-focus-visible:border-brand-600",
            "group-aria-[checked=true]:border group-aria-[checked=true]:border-brand-600 group-aria-[checked=true]:bg-brand-600",
            "group-hover:group-aria-[checked=true]:border-brand-500 group-hover:group-aria-[checked=true]:bg-brand-500",
            "group-active:group-aria-[checked=true]:border-brand-500 group-active:group-aria-[checked=true]:bg-brand-500",
            "group-focus-visible:group-aria-[checked=true]:border-brand-500 group-focus-visible:group-aria-[checked=true]:bg-brand-500",
            "group-disabled:group-aria-[checked=false]:border-neutral-200 group-disabled:group-aria-[checked=false]:bg-neutral-100",
            "group-disabled:group-aria-[checked=true]:opacity-70"
          )}
        >
          <CheckboxPrimitive.Indicator className="flex items-center justify-center">
            <Check className="hidden size-3.5 text-white group-aria-[checked=true]:inline-flex" />
          </CheckboxPrimitive.Indicator>
        </span>
        {label ? (
          <span className="text-body text-default-font group-disabled:text-subtext-color">
            {label}
          </span>
        ) : null}
      </button>
    </CheckboxPrimitive.Root>
  )
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

const CheckboxItem = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    label: string;
  }
>(({ className, label, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      `flex items-center pl-3 rounded-lg w-full h-14 border-2 ${
        props.checked ? "border-slate-600" : "hover:bg-gray-500/20"
      }`,
      className
    )}
    {...props}
  >
    <div className="border border-black !w-4 !h-4">
      <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </div>
    <FormLabel className="!mt-0 ml-2">{label}</FormLabel>
  </CheckboxPrimitive.Root>
));

CheckboxItem.displayName = "checkboxItem";

export { Checkbox, CheckboxItem };
