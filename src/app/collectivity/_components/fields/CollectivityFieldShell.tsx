import { FormItem, FormLabel, FormMessage } from "@/components/ui/forms";
import { cn } from "@/lib/utils/utils";
import { ReactNode } from "react";

export function FieldShell({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <FormItem className={cn("space-y-2", className)}>
      <FormLabel className="text-xs font-medium uppercase tracking-wide text-secondary">
        {label}
      </FormLabel>
      {children}
      <FormMessage fallback />
    </FormItem>
  );
}
