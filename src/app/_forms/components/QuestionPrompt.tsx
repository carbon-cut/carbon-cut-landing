import { cn } from "@/lib/utils";
import Typography from "@/components/ui/typography";
import { ClassValue } from "clsx";
import React from "react";

type Props = {
  children: string | React.JSX.Element;
  className?: ClassValue;
};

function Question({ children, className }: Props) {
  return (
    <Typography asChild variant="subtitle" size="md" className={cn("mb-4 mt-4 block", className)}>
      <h5>{children}</h5>
    </Typography>
  );
}

export default Question;
