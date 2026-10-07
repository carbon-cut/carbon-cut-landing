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

const subframeBadgeVariants = {
  brand: "border border-solid border-brand-100 bg-brand-100 text-brand-800",
  neutral: "border border-solid border-neutral-100 bg-neutral-100 text-neutral-700",
  error: "border border-solid border-error-100 bg-error-100 text-error-800",
  warning: "border border-solid border-warning-100 bg-warning-100 text-warning-800",
  success: "border border-solid border-success-100 bg-success-100 text-success-800",
} as const;

const badgeVariants = cva(
  "inline-flex items-center rounded-full border font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: badgeVariantsClasses,
      size: {
        default: "px-2 text-[11px]",
        micro: "px-0.5 py-0.5 text-[6px] uppercase tracking-[0.16em]",
        lg: "px-3 py-1 text-xs shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type LegacyBadgeVariant = keyof typeof badgeVariantsClasses;
type SubframeBadgeVariant = keyof typeof subframeBadgeVariants;

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: LegacyBadgeVariant | SubframeBadgeVariant;
  size?: VariantProps<typeof badgeVariants>["size"];
}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  const isSubframeVariant = variant !== undefined && variant in subframeBadgeVariants;
  const sourceClassName = isSubframeVariant
    ? [
        "flex h-6 items-center gap-1 rounded-md px-2 whitespace-nowrap text-caption font-caption",
        subframeBadgeVariants[variant as SubframeBadgeVariant],
        className,
      ]
        .filter(Boolean)
        .join(" ")
    : undefined;

  return (
    <div
      className={
        sourceClassName ??
        cn(badgeVariants({ variant: variant as LegacyBadgeVariant, size }), className)
      }
      {...props}
    />
  );
}

export { Badge, badgeVariants };
