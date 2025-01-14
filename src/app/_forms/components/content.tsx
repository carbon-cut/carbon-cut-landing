import { cn } from "@/lib/utils";
import React, {JSX} from "react";

type Props = {
  children: JSX.Element | JSX.Element[];
  className?: string;
};

function Content({ children, className  }: Props) {
  return <div className={cn("px-12 mb-4", className)}>{children}</div>;
}

export default Content;
