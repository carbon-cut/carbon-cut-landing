import { cn } from "@/lib/utils";
import React from "react";

function FormTitle(props: React.PropsWithChildren<{ className?: string }>) {
  return <h3 className={cn("text-lg font-semibold mb-2", props.className)}>{props.children}</h3>;
}

export default FormTitle;
