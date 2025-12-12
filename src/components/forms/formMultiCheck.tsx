"use client";

import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

import { TName } from "@/components/ui/forms";

type InputType = React.HTMLInputTypeAttribute | undefined;

interface Props<
  FormSchema extends FieldValues,
  Name extends TName<FormSchema>,
  Value extends string,
> {
  form: UseFormReturn<FormSchema, undefined>;
  name: Name;
  label?: string | undefined;
  mandatory?: boolean;
  type?: InputType;
  data: {
    label: string;
    value: `${Name}.${Value}` extends TName<FormSchema>
      ? PathValue<Name, Path<Name>>
      : PathValue<Name, Path<Name>>;
  }[];
}

export function FormMuliCheck<
  FormSchema extends FieldValues,
  Name extends TName<FormSchema>,
  Value extends string,
>(props: Props<FormSchema, Name, Value>) {
  return <>{props.name}</>;
}
