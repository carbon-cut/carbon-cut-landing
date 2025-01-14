import { formSchema } from '@/app/form/formSchema';
import { TName } from '@/components/ui/forms';
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import React from 'react'
import { UseFormReturn } from 'react-hook-form';

type Props = {
    id: string;
    label?:string;
    form: UseFormReturn<typeof formSchema>
    name: TName<typeof formSchema>
}
function SwitchForm({
    id,
    label,
    form,
    name
}: Props) {
  return (
    <div className="flex items-center space-x-2">
      <Switch id={id} />
      {label && <Label htmlFor={id}>{label}</Label>}
    </div>
  )
}

export default SwitchForm