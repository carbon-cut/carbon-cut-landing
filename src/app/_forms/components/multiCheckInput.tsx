"use client";

import { FieldValues, UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  TName,
  FormItem,
} from "@/components/ui/forms";
import {  useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";
import SwitchForm from "./switch";

type InputType = React.HTMLInputTypeAttribute | undefined;

export function MultiCheckInput<
  FormSchema extends FieldValues,
  Name extends TName<FormSchema>,
  Value extends string,
>(props: {
  form: UseFormReturn<FormSchema, undefined>;
  name: Name;
  label?: string | undefined;
  mandatory?: boolean;
  type?: InputType;
  options: {
    label: string;
    value: `${Name}.${Value}` extends TName<FormSchema> ? `${Value}` : never;
    unit?: string;
  }[];
  onChange?: (v: CheckedState) => void;
}) {
  function checked(value: string) {
    //@ts-ignore
    const currentValue = props.form.getValues(`${props.name}.${value}`);
    if (currentValue) return true;
    else return false;
  }

  function onCheckedChange(value: string) {
    return (checked: CheckedState) => {
      if (checked) {
        //@ts-ignore
        props.form.setValue(`${props.name}.${value}`,
           props.type === 'number' ? 0 : '');
      } else {
        //@ts-ignore
        props.form.setValue(`${props.name}.${value}`, null);
      }
      props.onChange?.(checked);
    };
  }

  return (
    <div className="w-4/6 mx-auto flex flex-row flex-wrap justify-between gap-y-3 gap-x-1">
      {props.options.map(({ label, value, unit }) => (
        <FormField
          control={props.form.control}
          name={props.name}
          key={value}
          render={() => {
            const [checkedValue, setChecked] = useState(checked(value));
            return (
              <FormItem className="w-5/12 ">
                <FormControl className="">
                  <SwitchForm
                    id={value}
                    checked={checkedValue}
                    onCheckedChange={(v) => {
                      onCheckedChange(value)(v);
                      setChecked(v ? true : false);
                    }}
                    label={label}
                  />
                </FormControl>
                {/*{ unit !== "null" && (
                  <MinimalInput
                    disabeled={!checkedValue}
                    form={props.form}
                    //@ts-ignore
                    name={`${props.name}.${value}`}
                    className="ml-1"
                    unit={unit}
                  />
                )} */}
              </FormItem>
            );
          }}
        />
      ))}
    </div>
  );
}
