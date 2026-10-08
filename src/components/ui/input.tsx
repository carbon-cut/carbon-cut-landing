import * as React from "react";

import { cn } from "@/lib/utils";

export type InputIcon = React.ReactNode;
type InputProps = React.ComponentProps<"input"> & {
  icon?: InputIcon;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    const resolvedClassName = cn(
      `flex h-8 w-full rounded-md border border-solid border-neutral-border bg-default-background
      px-3 py-0 transition-colors file:border-0 file:bg-transparent
      text-body font-body text-default-font file:text-body file:font-body file:text-default-font placeholder-subframe
      focus-visible:border-brand-600 focus-visible:outline-none aria-invalid:border-error-600
      disabled:cursor-not-allowed disabled:opacity-50`,
      className,
      icon && "pl-3"
    );
    return (
      <div className="relative w-full">
        <input type={type} className={resolvedClassName} ref={ref} {...props} />
        {icon ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-2 top-1/2 flex size-4 -translate-y-1/2 translate-x-0 items-center justify-center text-subtext-color [&>svg]:size-4"
          >
            {icon}
          </span>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          `flex w-full rounded-md border border-input bg-transparent 
          px-3 py-1 shadow-sm transition-colors file:border-0 
          file:bg-transparent file:text-sm file:font-medium file:text-foreground
          placeholder:text-muted-foreground 
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
          aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20
          disabled:cursor-not-allowed disabled:opacity-50 text-sm `,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Input";

export { Input, Textarea, type InputProps };
