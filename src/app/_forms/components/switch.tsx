import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { FormLabel, useFormField } from "@/components/ui/forms";
import { cn } from "@/lib/utils";

const  SwitchForm = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {label?:string}
>(({ className, label, ...props }, ref) => {
  
  const {
    error
  } = useFormField()
  
  return(
    <div className="flex items-center space-x-2">
      <Switch
        ref={ref}
        {...props}
      />
      {label && <FormLabel data-state={error && "error"} className={cn(
               `text-sm font-medium ${props.disabled ? 'text-muted-foreground data-[state=error]:text-destructive/60' : ''}`, '')} htmlFor={props.id}>{label}</FormLabel>}
    </div>
  )}
)

SwitchForm.displayName = "SwitchForm"
export default SwitchForm;
