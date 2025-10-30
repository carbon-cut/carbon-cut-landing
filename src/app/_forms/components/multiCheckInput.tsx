"use client";

import { FieldValues, UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  TName,
  FormItem,
  FormMessage,
} from "@/components/ui/forms";
import {  useCallback, useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";
import SwitchForm from "./switch";

type InputType = React.HTMLInputTypeAttribute | undefined;

export function MultiCheckInput<
  T extends FieldValues,
  Name extends TName<T>,
  Value extends string,
>(props: {
  form: UseFormReturn<T, undefined>;
  name: Name;
  label?: string | undefined;
  mandatory?: boolean;
  type?: InputType;
  options: {
    label: string;
    value: `${Name}.${Value}` extends TName<T> ? `${Value}` : never;
    unit?: string;
  }[];
  disabled?: boolean;
  onChange?: (v: CheckedState) => void;
}) {
  function checked(value: string) {
    
    const currentValue = props.form.getValues(`${props.name}.${value}` as TName<T>);
    if (currentValue) return true;
    else return false;
  }

  const  onCheckedChange = useCallback((value: string)=> {
    return (checked: CheckedState) => {
      if (checked) {
        //@ts-ignore
        props.form.setValue(`${props.name}.${value}`,
           props.type === 'number' ? 0 : 
           props.type === 'boolean' ? true : '');
      } else {
        //@ts-ignore
        props.form.setValue(`${props.name}.${value}`, 
          props.type === 'number' ? null : 
          props.type === 'boolean' ? false : '')
      }
      props.onChange?.(checked);
    };
  }, [props.form, props.name, props.type, props.onChange]);

  return (
    <div className="w-4/6 mx-auto flex flex-row flex-wrap justify-between gap-y-3 gap-x-1">
      {props.options.map(({ label, value, unit }) => (
        <FormField
          control={props.form.control}
          name={`${props.name}.${value}` as TName<T>}
          key={value}
          render={({ field}) => {
            const [checkedValue, setChecked] = useState(checked(value));
            return (
              <FormItem className="w-5/12 ">
                <FormControl className="">
                  <SwitchForm
                    disabled={props.disabled}
                    id={value}
                    checked={checkedValue}
                    onCheckedChange={(v) => {
                      //field.onChange(v);
                      onCheckedChange(value)(v);
                      setChecked(v ? true : false);
                    }}
                    label={label}
                  />
                </FormControl>
                <FormMessage />
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
