import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariantsClasses = {
  default:
    "border-transparent text-foreground [background-image:linear-gradient(#D3D3D3_0_0),linear-gradient(99.94deg,#A09F9F_42.55%,rgba(0,0,0,0)_92.4%)] [background-clip:padding-box,border-box] [background-origin:border-box]",
  secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  accent: "border-accent/30 bg-accent/8 text-accent hover:bg-accent/12",
  destructive:
    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
  ghost: "border-transparent bg-transparent text-foreground/70",
  outline: "border-border bg-card/72 text-foreground",
};

const badgeVariants = cva(
  "inline-flex items-center rounded-full border font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: badgeVariantsClasses,
      size: {
        default: "px-2 py-0.5 text-[11px]",
        micro: "px-0 py-0 text-[10px] uppercase tracking-[0.16em]",
        lg: "px-3 py-1 text-xs shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      tabIndex={props.tabIndex ?? 0}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
