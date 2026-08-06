import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  primary: React.ReactNode;
  secondary: React.ReactNode;
  className?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
};

/**
 * Target B archetype helper (#10):
 * Consistent 2-control row (e.g. input + unit select) with stable spans.
 */
export default function QuestionFieldPair({
  primary,
  secondary,
  className,
  primaryClassName,
  secondaryClassName,
}: Props) {
  return (
    <div className={cn("grid grid-cols-12 gap-x-3 gap-y-3", className)}>
      <div className={cn("col-span-7", primaryClassName)}>{primary}</div>
      <div className={cn("col-span-5", secondaryClassName)}>{secondary}</div>
    </div>
  );
}
