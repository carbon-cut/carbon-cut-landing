import { FormItem, FormLabel, FormMessage } from "@/components/ui/forms";
import { cn } from "@/lib/utils/utils";
import { ReactNode } from "react";

export function FieldShell({
  label,
  children,
  className,
  labelVisibility = "visible",
}: {
  label: string;
  children: ReactNode;
  className?: string;
  labelVisibility?: "visible" | "srOnly";
}) {
  return (
    <FormItem className={cn("space-y-2", className)}>
      <FormLabel
        className={cn(
          "text-xs font-medium uppercase tracking-wide text-secondary",
          labelVisibility === "srOnly" && "sr-only"
        )}
      >
        {label}
      </FormLabel>
      {children}
      <FormMessage fallback />
    </FormItem>
  );
}
