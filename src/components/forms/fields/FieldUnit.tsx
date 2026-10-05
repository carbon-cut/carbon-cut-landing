import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  unit: string;
  className?: string;
};

function FieldUnit({ unit, className }: Props) {
  return (
    <div
      className={cn(
        "flex items-center rounded-md border border-input bg-muted px-3 text-sm font-medium",
        className
      )}
    >
      <span className="mx-auto">{unit}</span>
    </div>
  );
}

export default FieldUnit;
