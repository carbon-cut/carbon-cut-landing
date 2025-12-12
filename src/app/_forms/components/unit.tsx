import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  unit: string;
  className?: string;
};

function Unit({ unit, className }: Props) {
  return (
    <div
      className={cn(
        "flex items-center  px-3 bg-gray-50 rounded-md border border-input text-sm font-medium",
        className
      )}
    >
      <span className="mx-auto">{unit}</span>
    </div>
  );
}

export default Unit;
