import * as React from "react";

import { Textarea } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type CollectivityTextareaProps = React.ComponentProps<typeof Textarea>;

const CollectivityTextarea = React.forwardRef<HTMLTextAreaElement, CollectivityTextareaProps>(
  ({ className, ...props }, ref) => (
    <Textarea
      ref={ref}
      className={cn("min-h-[150px] rounded-md px-3 py-3", className)}
      {...props}
    />
  )
);

CollectivityTextarea.displayName = "CollectivityTextarea";

export default CollectivityTextarea;
