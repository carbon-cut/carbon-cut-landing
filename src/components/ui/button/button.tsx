import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-[box-shadow,background-color,color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover hover:shadow-md",
        cta: "bg-linear-primary-diagonal text-primary-foreground shadow-sm hover:shadow-md active:shadow-sm [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-0.5",
        footer:
          "relative overflow-hidden bg-linear-primary-diagonal text-primary-foreground shadow-sm hover:shadow-md active:shadow-sm before:absolute before:inset-y-0 before:left-0 before:w-10 before:-translate-x-12 before:skew-x-[-20deg] before:bg-white/20 before:content-[''] before:transition-transform before:duration-300 hover:before:translate-x-[220%]",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-primary-border bg-primary-subtle text-primary shadow-sm hover:border-primary hover:bg-primary-subtle-hover",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-3 text-sm",
        sm: "h-9 px-3 text-sm",
        lg: "h-11 px-6 text-sm",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantProps<typeof buttonVariants>["variant"] | SubframeVariant;
  size?: VariantProps<typeof buttonVariants>["size"] | SubframeSize;
  asChild?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

type SubframeVariant =
  | "brand-primary"
  | "brand-secondary"
  | "brand-tertiary"
  | "neutral-primary"
  | "neutral-secondary"
  | "neutral-tertiary"
  | "destructive-primary"
  | "destructive-secondary"
  | "destructive-tertiary"
  | "inverse";

type SubframeSize = "small" | "medium" | "large";

const subframeVariants: Record<SubframeVariant, string> = {
  "brand-primary": "bg-brand-600 text-white hover:bg-brand-500 active:bg-brand-600",
  "brand-secondary": "bg-brand-50 text-brand-700 hover:bg-brand-100 active:bg-brand-50",
  "brand-tertiary": "bg-transparent text-brand-700 hover:bg-brand-50 active:bg-brand-100",
  "neutral-primary": "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 active:bg-neutral-100",
  "neutral-secondary":
    "border border-solid border-neutral-border bg-default-background text-neutral-700 hover:bg-neutral-50 active:bg-default-background",
  "neutral-tertiary": "bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200",
  "destructive-primary": "bg-error-600 text-white hover:bg-error-500 active:bg-error-600",
  "destructive-secondary": "bg-error-50 text-error-800 hover:bg-error-100 active:bg-error-50",
  "destructive-tertiary": "bg-transparent text-error-800 hover:bg-error-50 active:bg-error-100",
  inverse: "bg-transparent text-white hover:bg-white/20 active:bg-white/25",
};

const subframeSizes: Record<SubframeSize, string> = {
  small: "h-6 gap-1 px-2 text-caption-bold font-caption-bold",
  medium: "h-8 px-3 text-body-bold font-body-bold",
  large: "h-10 px-4 text-body-bold font-body-bold",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, icon, iconRight, children, ...props }, ref) => {
    if (variant && variant in subframeVariants) {
      const sourceVariant = variant as SubframeVariant;
      const sourceSize = (size ?? "medium") as SubframeSize;

      return (
        <button
          ref={ref}
          type={props.type ?? "button"}
          className={[
            "flex cursor-pointer items-center justify-center gap-2 rounded-md border-none px-3 text-left disabled:cursor-default disabled:bg-neutral-200 disabled:text-neutral-400",
            subframeVariants[sourceVariant],
            subframeSizes[sourceSize],
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {icon ? (
            <span
              className={`flex ${
                sourceSize === "large" ? "text-heading-3 font-heading-3" : "text-body font-body"
              }`}
            >
              {icon}
            </span>
          ) : null}
          {children ? <span className="whitespace-nowrap">{children}</span> : null}
          {iconRight ? (
            <span
              className={`flex ${
                sourceSize === "large" ? "text-heading-3 font-heading-3" : "text-body font-body"
              }`}
            >
              {iconRight}
            </span>
          ) : null}
        </button>
      );
    }

    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({
            variant: variant as VariantProps<typeof buttonVariants>["variant"],
            size: size as VariantProps<typeof buttonVariants>["size"],
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
