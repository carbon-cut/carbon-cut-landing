import React from "react";
import { UseFormReturn } from "react-hook-form";
import { formSchema } from "../../form/formSchema";
import {ClassValue} from "clsx";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/forms";
import {
  NumberedGroup,
  NumberedGroupItemCheck,
} from "@/components/ui/numberedGroup";
type Props = {
  options: {
    label: string;
    value: string;
  }[];
  states: { [k: string]: number };
  className?: ClassValue;
  setState: (k: string, o: "+" | "-") => void;
};

function NumberedInputs({ options, states, setState, className }: Props) {
  return (
    <div
      className={"gap-6 w-3/6 mx-auto flex flex-row flex-wrap justify-between "}
    >
      {options?.map((option, index) => (
        <label
          key={index}
          htmlFor={`r${index}`}
          className={`flex items-center pl-3 rounded-lg w-5/12 h-16 border-2`}
        >
          <div className="h-full grid grid-rows-3">
            <button
              type="button"
              onClick={() => {
                setState(option.value, "+");
              }}
            >
              +
            </button>
            <p>{states[option.value]}</p>
            <button type="button" onClick={() => setState(option.value, "-")}>
              -
            </button>
          </div>
          <FormLabel className="ml-2" htmlFor={`r${index}`}>
            {option.label}
          </FormLabel>
        </label>
      ))}
    </div>
  );
}

export default NumberedInputs;
