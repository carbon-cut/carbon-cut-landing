import * as React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type CollectivityCheckboxProps = React.ComponentProps<typeof Checkbox>;

const CollectivityCheckbox = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  CollectivityCheckboxProps
>(({ className, ...props }, ref) => (
  <Checkbox
    ref={ref}
    className={cn(
      "rounded-[4px] border-border shadow-none hover:bg-primary/5 data-[state=checked]:border-primary data-[state=checked]:bg-primary",
      className
    )}
    {...props}
  />
));

CollectivityCheckbox.displayName = "CollectivityCheckbox";

export default CollectivityCheckbox;
