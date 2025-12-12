import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";

type Props = {
  children: string | React.JSX.Element;
  className?: ClassValue;
};

function Question({ children, className }: Props) {
  return (
    <h5 className={cn(" font-semibold text-base text-primary/80 my-4", className)}>{children}</h5>
  );
}

export default Question;
