import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

const  SwitchForm = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {label?:string}
>(({ className, label, ...props }, ref) => (
    <div className="flex items-center space-x-2">
      <Switch
        ref={ref}
        {...props}
      />
      {label && <Label className="w-full" htmlFor={props.id}>{label}</Label>}
    </div>
  )
)

SwitchForm.displayName = "SwitchForm"
export default SwitchForm;
