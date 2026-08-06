import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  primary: React.ReactNode;
  secondary: React.ReactNode;
  className?: string;
};

/**
 * Target B archetype helper (#9):
 * Two unit-bearing inputs stacked with a consistent rhythm.
 */
export default function QuestionUnitPair({ primary, secondary, className }: Props) {
  return (
    <div className={cn("space-y-3", className)}>
      {primary}
      {secondary}
    </div>
  );
}
