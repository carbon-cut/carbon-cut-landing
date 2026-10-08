import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-[box-shadow,background-color,color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover hover:shadow-md",
        //cta: "bg-linear-primary-diagonal text-primary-foreground shadow-sm hover:shadow-md active:shadow-sm [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-0.5",
        //footer:
        //"relative overflow-hidden bg-linear-primary-diagonal text-primary-foreground shadow-sm hover:shadow-md active:shadow-sm before:absolute before:inset-y-0 before:left-0 before:w-10 before:-translate-x-12 before:skew-x-[-20deg] before:bg-white/20 before:content-[''] before:transition-transform before:duration-300 hover:before:translate-x-[220%]",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-primary-border bg-primary-subtle text-primary shadow-sm hover:border-primary hover:bg-primary-subtle-hover",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-brand-600/40 hover:text-accent-foreground",
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
  loading?: boolean;
}

export type SubframeVariant =
  | "brand-primary"
  | "brand-secondary"
  | "brand-tertiary"
  | "neutral-primary"
  | "neutral-secondary"
  | "neutral-tertiary"
  | "destructive-primary"
  | "destructive-secondary"
  | "destructive-tertiary"
  | "inverse"
  | "link-neutral"
  | "link-brand"
  | "link-inverse"
  | "cta"
  | "footer";

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
  "destructive-tertiary":
    "bg-transparent text-error-700 hover:bg-error-50 active:bg-error-100 disabled:cursor-default disabled:bg-transparent disabled:text-error-700/40",
  inverse: "bg-transparent text-white hover:bg-white/20 active:bg-white/25",
  "link-neutral": "",
  "link-brand": "",
  "link-inverse": "",
  cta: "bg-linear-primary-diagonal text-primary-foreground shadow-sm hover:shadow-md active:shadow-sm [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-0.5",
  footer:
    "relative overflow-hidden bg-linear-primary-diagonal text-primary-foreground shadow-sm hover:shadow-md active:shadow-sm before:absolute before:inset-y-0 before:left-0 before:w-10 before:-translate-x-12 before:skew-x-[-20deg] before:bg-white/20 before:content-[''] before:transition-transform before:duration-300 hover:before:translate-x-[220%]",
};

const subframeSizes: Record<SubframeSize, string> = {
  small: "h-6 gap-1 px-2 text-caption-bold font-caption-bold",
  medium: "h-8 px-3 text-body-bold font-body-bold",
  large: "h-10 px-4 text-body-bold font-body-bold",
};

function isSubframeVariant(variant: ButtonProps["variant"]): variant is SubframeVariant {
  return variant != null && variant in subframeVariants;
}

function isSubframeSize(size: ButtonProps["size"]): size is SubframeSize {
  return size === "small" || size === "medium" || size === "large";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      icon,
      iconRight,
      children,
      loading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    if (variant === "link-neutral" || variant === "link-brand" || variant === "link-inverse") {
      const sourceSize = (size ?? "medium") as SubframeSize;
      const contentClassName = cn(
        "text-body font-body text-neutral-700 group-hover/link-button:text-brand-700 group-disabled/link-button:text-neutral-400 group-hover/link-button:group-disabled/link-button:text-neutral-400",
        sourceSize === "small" && "text-caption font-caption",
        sourceSize === "large" && "text-heading-3 font-heading-3",
        variant === "link-brand" && "text-brand-700",
        variant === "link-inverse" && "text-white group-hover/link-button:text-white"
      );

      return (
        <button
          ref={ref}
          type={props.type ?? "button"}
          className={cn(
            "group/link-button flex cursor-pointer items-center gap-1 border-none bg-transparent text-left disabled:cursor-default",
            className
          )}
          disabled={disabled || loading}
          {...props}
        >
          {icon ? <span className={cn("flex", contentClassName)}>{icon}</span> : null}
          {children ? (
            <span
              className={cn(
                contentClassName,
                "group-hover/link-button:underline group-hover/link-button:group-disabled/link-button:no-underline"
              )}
            >
              {children}
            </span>
          ) : null}
          {iconRight ? <span className={cn("flex", contentClassName)}>{iconRight}</span> : null}
        </button>
      );
    }

    if (isSubframeVariant(variant)) {
      const sourceVariant = variant;
      const sourceSize = (size ?? "medium") as SubframeSize;
      const Comp = asChild ? Slot : "button";

      return (
        <Comp
          ref={ref}
          {...(!asChild ? { type: props.type ?? "button" } : {})}
          className={cn(
            "flex cursor-pointer items-center justify-center gap-2 rounded-md border-none px-3 text-left disabled:cursor-default disabled:bg-neutral-200 disabled:text-neutral-400",
            subframeVariants[sourceVariant],
            subframeSizes[sourceSize],
            className
          )}
          disabled={disabled || loading}
          {...props}
        >
          {icon ? (
            <span
              className={`flex shrink-0 ${
                sourceSize === "large" ? "text-heading-3 font-heading-3" : "text-body font-body"
              }`}
            >
              {icon}
            </span>
          ) : null}
          {children ? (
            asChild ? (
              <Slottable>{children}</Slottable>
            ) : (
              <span className="min-w-0 truncate">{children}</span>
            )
          ) : null}
          {iconRight ? (
            <span
              className={`flex shrink-0 ${
                sourceSize === "large" ? "text-heading-3 font-heading-3" : "text-body font-body"
              }`}
            >
              {iconRight}
            </span>
          ) : null}
        </Comp>
      );
    }

    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({
            variant: isSubframeVariant(variant) ? null : variant,
            size: isSubframeSize(size) ? null : size,
            className,
          })
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
