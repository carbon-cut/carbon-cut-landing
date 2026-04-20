import * as React from "react";

import { Input, type InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const CollectivityInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <Input ref={ref} className={cn("h-10 rounded-md", className)} {...props} />
  )
);

CollectivityInput.displayName = "CollectivityInput";

export default CollectivityInput;
