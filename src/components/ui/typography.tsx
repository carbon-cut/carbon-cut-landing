import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const typographyVariants = cva("tracking-tight", {
  variants: {
    variant: {
      default: "",
      title: "font-bold text-primary",
      subtitle: "text-primary font-normal ",
      description: "font-light text-secondary",
      secondary:
        "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "",
      huge: "text-6xl lg:text-7xl",
      xl: "text-4xl lg:text-5xl",
      md: "text-xl lg:text-2xl",
      sm: "text-sm lg:text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
}

const Typography = React.forwardRef<HTMLDivElement, Props>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";

    return (
      <Comp
        ref={ref}
        {...props}
        className={cn(typographyVariants({ variant, size }), className)}
      />
    );
  }
);

export default Typography;
