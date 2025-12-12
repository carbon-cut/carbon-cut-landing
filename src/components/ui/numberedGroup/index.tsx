"use client";

import * as React from "react";
import * as NumberedGroupPrimitive from "./root";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const NumberedGroup = React.forwardRef<
  React.ElementRef<typeof NumberedGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NumberedGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <NumberedGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} ref={ref} />
  );
});
NumberedGroup.displayName = NumberedGroupPrimitive.Root.displayName;

const NumberedGroupItem = React.forwardRef<
  React.ElementRef<typeof NumberedGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof NumberedGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <NumberedGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <NumberedGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </NumberedGroupPrimitive.Indicator>
    </NumberedGroupPrimitive.Item>
  );
});
NumberedGroupItem.displayName = NumberedGroupPrimitive.Item.displayName;

const NumberedGroupItemCheck = React.forwardRef<
  React.ElementRef<typeof NumberedGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof NumberedGroupPrimitive.Item> & {
    fieldValue: number;
  }
>(({ className, fieldValue, ...props }, ref) => {
  return (
    <NumberedGroupPrimitive.Item
      ref={ref}
      className={cn(" h-4 w-4 text-primary disabled:opacity-50", className)}
      {...props}
    >
      <p>{fieldValue}</p>
    </NumberedGroupPrimitive.Item>
  );
});
NumberedGroupItemCheck.displayName = NumberedGroupPrimitive.Item.displayName;

export { NumberedGroup, NumberedGroupItem, NumberedGroupItemCheck };
