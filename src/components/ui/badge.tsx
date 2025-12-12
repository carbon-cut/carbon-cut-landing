import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariantsClasses = {
  default: " text-primary hover:bg-primary/80",
  secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  destructive:
    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
  outline: "text-foreground",
};

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-s font-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: badgeVariantsClasses,
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      tabIndex={props.tabIndex ?? 0}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
      style={{
        ...(variant === "default"
          ? {
              background:
                "linear-gradient(#D3D3D3 0 0) padding-box,  linear-gradient(99.94deg, #A09F9F 42.55%, rgba(0, 0, 0, 0) 92.4%) border-box",
              border: "1px solid transparent",
              borderRadius: "9999px", // Equivalent to rounded-full
            }
          : {}),
      }}
    />
  );
}

export { Badge, badgeVariants };
