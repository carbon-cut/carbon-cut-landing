"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { FormLabel } from "./forms";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      `peer h-4 w-4 shrink-0 rounded-sm border
       border-primary shadow focus-visible:outline-none
      focus-visible:ring-1 focus-visible:ring-ring
      disabled:cursor-not-allowed disabled:opacity-50
      hover:bg-section-transport/30
      data-[state=checked]:bg-section-transport
      data-[state=checked]:border-section-transport
      data-[state=checked]:text-primary-foreground`,
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
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
      className,
    )}
    {...props}
  >
    <div className="border border-black !w-4 !h-4">
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </div>
    <FormLabel className="!mt-0 ml-2">{label}</FormLabel>
  </CheckboxPrimitive.Root>
));

CheckboxItem.displayName = "checkboxItem";

export { Checkbox, CheckboxItem };
