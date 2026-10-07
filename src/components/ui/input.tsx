import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const resolvedClassName = cn(
      `flex h-8 w-full rounded-md border border-solid border-neutral-border bg-default-background
      px-3 py-0 transition-colors file:border-0 file:bg-transparent
      text-body font-body text-default-font file:text-body file:font-body file:text-default-font placeholder-subframe
      focus-visible:border-brand-600 focus-visible:outline-none aria-invalid:border-error-600
      disabled:cursor-not-allowed disabled:opacity-50`,
      className
    );

    return <input type={type} className={resolvedClassName} ref={ref} {...props} />;
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

type InputProps = React.ComponentProps<"input">;
export { Input, Textarea, type InputProps };
