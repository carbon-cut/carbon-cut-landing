import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const typographyVariants = cva("", {
  variants: {
    variant: {
      default: "text-foreground leading-normal tracking-normal",
      title: "font-bold text-primary leading-[0.95] tracking-[-0.04em]",
      subtitle: "font-medium text-primary leading-[1.25] tracking-[-0.02em]",
      description: "font-light text-secondary",
    },
    size: {
      default: "",
      huge: "font-extrabold text-3xl md:text-6xl lg:text-7xl",
      xl: "text-3xl md:text-4xl lg:text-5xl",
      md: "text-lg md:text-xl lg:text-2xl",
      sm: "text-sm md:text-base lg:text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
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
