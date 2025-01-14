import { cn } from "@/lib/utils";
import {ClassValue} from "clsx";
import React from "react";

type Props = {
  children: string | React.JSX.Element;
  className?: ClassValue;
};

function Question({ children, className }: Props) {
  return (
    <h5 className={cn("leading-7 font-semibold text-3xl text-primary my-4", className)}>
      {children}
    </h5>
  );
}

export default Question;
