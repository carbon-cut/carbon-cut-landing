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
 * - Product screens based on the Subframe scale: use the additive, complete roles
 *   `heading1`, `heading2`, `heading3`, `bodySubframe`, `bodyBold`,
 *   `captionSubframe`, and `captionBold` without a `size` prop.
 *
 * Migration note:
 * - `size="huge"` is deprecated (kept as a compatibility alias for marketing hero usage).
 * - `variant="marketingTitle" | "marketingSubtitle"` are homepage/marketing-only opt-ins.
 * - Prefer `size="xl"` + explicit responsive overrides for future page-level headings.
 * - The Subframe-aligned roles copy the source sizes, line heights, weights, letter spacing,
 *   text colours, and Work Sans family. Manrope remains available as `font-manrope_sans` if
 *   the previous application default needs to be restored. They preserve existing Typography
 *   variants and may be adopted incrementally.
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
      muted: "font-normal text-foreground/60 leading-5 tracking-normal",
      marketingTitle: "font-bold text-foreground leading-[1.02] tracking-[-0.015em]",
      marketingSubtitle: "font-medium text-foreground leading-[1.2] tracking-[-0.01em]",
      heading1: "text-heading-1 font-heading-1 mobile:text-heading-2 mobile:font-heading-2",
      heading2: "text-heading-2 font-heading-2",
      heading3: "text-heading-3 font-heading-3",
      bodySubframe: "text-body font-body",
      bodyBold: "text-body-bold font-body-bold",
      captionSubframe: "text-caption font-caption",
      captionBold: "text-caption-bold font-caption-bold",
    },
    size: {
      default: "text-base",
      huge: "font-extrabold text-3xl md:text-6xl lg:text-7xl",
      xl: "text-2xl",
      "2xl": "text-[1.875rem]",
      lg: "text-lg",
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
    const isSubframeRole = [
      "heading1",
      "heading2",
      "heading3",
      "bodySubframe",
      "bodyBold",
      "captionSubframe",
      "captionBold",
    ].includes(variant ?? "");
    const resolvedSize = size ?? (isSubframeRole ? null : undefined);
    const variantClassName = typographyVariants({ variant, size: resolvedSize });
    const resolvedClassName = isSubframeRole
      ? [variantClassName, className].filter(Boolean).join(" ")
      : cn(variantClassName, className);

    return <Comp ref={ref} {...props} className={resolvedClassName} />;
  }
);

Typography.displayName = "Typography";

export default Typography;
