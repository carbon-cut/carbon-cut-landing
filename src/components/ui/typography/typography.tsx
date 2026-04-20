import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

/**
 * Product-first typography usage:
 * - Page heading: variant="title" size="xl"
 * - Section heading: variant="subtitle" size="lg"
 * - Body copy: variant="default" | "description" size="md" | "sm"
 * - Label/meta text: variant="label" | "caption" | "muted" size="xs" | "sm"
 * - Marketing hero (opt-in): variant="marketingTitle" size="huge"
 *
 * Migration note:
 * - `size="huge"` is deprecated (kept as a compatibility alias for marketing hero usage).
 * - `variant="marketingTitle" | "marketingSubtitle"` are homepage/marketing-only opt-ins.
 * - Prefer `size="xl"` + explicit responsive overrides for future page-level headings.
 */
const typographyVariants = cva("", {
  variants: {
    variant: {
      default: "text-foreground leading-6 tracking-normal",
      title: "font-semibold text-foreground leading-tight tracking-normal",
      subtitle: "font-medium text-foreground leading-snug tracking-normal",
      description: "font-normal text-secondary leading-6 tracking-normal",
      body: "font-normal text-secondary leading-7 tracking-normal",
      label: "font-medium text-foreground leading-5 tracking-normal",
      sectionTitle: "font-semibold text-foreground leading-6 tracking-normal",
      eyebrow: "font-medium uppercase leading-4 tracking-[0.2em]",
      caption: "font-normal text-secondary leading-5 tracking-normal",
      muted: "font-normal text-foreground/70 leading-5 tracking-normal",
      marketingTitle: "font-bold text-foreground leading-[1.02] tracking-[-0.015em]",
      marketingSubtitle: "font-medium text-foreground leading-[1.2] tracking-[-0.01em]",
    },
    size: {
      default: "text-base",
      huge: "font-extrabold text-3xl md:text-6xl lg:text-7xl",
      xl: "text-2xl md:text-3xl",
      "2xl": "text-[1.875rem]",
      lg: "text-xl md:text-2xl",
      md: "text-base",
      body: "text-[15px]",
      sm: "text-sm",
      xs: "text-xs",
      xxs: "text-[10px] leading-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});
interface Props
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof typographyVariants> {
  asChild?: boolean;
}

const Typography = React.forwardRef<HTMLDivElement, Props>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";

    return (
      <Comp ref={ref} {...props} className={cn(typographyVariants({ variant, size }), className)} />
    );
  }
);

Typography.displayName = "Typography";

export default Typography;
