import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-[transform,box-shadow,background-color,color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:rounded-full disabled:pointer-events-none disabled:opacity-50 disabled:transform-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-linear-1 text-primary-foreground shadow-sm hover:-translate-y-px hover:shadow-md active:translate-y-0",
        cta: "bg-linear-1 text-primary-foreground shadow-sm hover:-translate-y-1 hover:scale-[1.03] hover:shadow-md active:translate-y-0 active:scale-[0.99] [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-1",
        footer:
          "relative overflow-hidden bg-linear-1 text-primary-foreground shadow-sm hover:shadow-md active:shadow-sm before:absolute before:inset-y-0 before:left-0 before:w-10 before:-translate-x-12 before:skew-x-[-20deg] before:bg-white/20 before:content-[''] before:transition-transform before:duration-300 hover:before:translate-x-[220%]",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-primary/15 bg-background text-primary shadow-sm hover:-translate-y-px hover:border-primary/25 hover:bg-card active:translate-y-0",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        none: "",
      },
      size: {
        default: "h-10 px-4 py-2.5",
        sm: "h-8 rounded-full px-3 text-xs",
        lg: "h-10 rounded-full px-8 py-6",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={
          variant === "none" ? className : cn(buttonVariants({ variant, size, className }))
        }
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
