import * as React from "react";
import { composeEventHandlers } from "@radix-ui/primitive";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { createContextScope } from "@radix-ui/react-context";
import { useSize } from "@radix-ui/react-use-size";
import { usePrevious } from "@radix-ui/react-use-previous";
import { Presence } from "@radix-ui/react-presence";
import { Primitive } from "@radix-ui/react-primitive";

import type { Scope } from "@radix-ui/react-context";

/* -------------------------------------------------------------------------------------------------
 * Inpts
 * -----------------------------------------------------------------------------------------------*/

const INPUT_NAME = "Input";

type ScopedProps<P> = P & { __scopeInput?: Scope };
const [createInputContext, createInputScope] = createContextScope(INPUT_NAME);

type InputContextValue = { disabled?: boolean; number: number };
const [InputsProvider, useRadioContext] =
  createInputContext<InputContextValue>(INPUT_NAME);

type InputElement = React.ElementRef<typeof Primitive.button>;
type PrimitiveButtonProps = React.ComponentPropsWithoutRef<
  typeof Primitive.button
>;
interface InputsProps extends PrimitiveButtonProps {
  number?: number;
  required?: boolean;
  onCheck?(): void;
}

const Input = React.forwardRef<InputElement, InputsProps>(
  (props: ScopedProps<InputsProps>, forwardedRef) => {
    const {
      __scopeInput,
      name,
      number = 0,
      required,
      disabled,
      value = "on",
      onCheck,
      form,
      ...inputProps
    } = props;
    const [button, setButton] = React.useState<HTMLButtonElement | null>(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) =>
      setButton(node),
    );
    const hasConsumerStoppedPropagationRef = React.useRef(false);
    // We set this to true by default so that events bubble to forms without JS (SSR)
    const isFormControl = button ? form || !!button.closest("form") : true;

    return (
      <InputsProvider scope={__scopeInput} number={number} disabled={disabled}>
        <Primitive.button
          type="button"
          role="radio"
          aria-checked={number > 0 ? true : false}
          data-state={getState(number ? true : false)}
          data-disabled={disabled ? "" : undefined}
          disabled={disabled}
          value={value}
          {...inputProps}
          ref={composedRefs}
          onClick={composeEventHandlers(props.onClick, (event) => {
            // radios cannot be unchecked so we only communicate a checked state
            if (!number) onCheck?.();
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current =
                event.isPropagationStopped();
              // if radio is in a form, stop propagation from the button so that we only propagate
              // one click event (from the input). We propagate changes from an input so that native
              // form validation works and form events reflect radio updates.
              if (!hasConsumerStoppedPropagationRef.current)
                event.stopPropagation();
            }
          })}
        />
        {isFormControl && (
          <BubbleInput
            control={button}
            bubbles={!hasConsumerStoppedPropagationRef.current}
            name={name}
            value={value}
            checked={true}
            required={required}
            disabled={disabled}
            form={form}
            // We transform because the input is absolutely positioned but we have
            // rendered it **after** the button. This pulls it back to sit on top
            // of the button.
            style={{ transform: "translateX(-100%)" }}
          />
        )}
      </InputsProvider>
    );
  },
);

Input.displayName = INPUT_NAME;

/* -------------------------------------------------------------------------------------------------
 * NumberedIndicator
 * -----------------------------------------------------------------------------------------------*/

const INDICATOR_NAME = "NumberedIndicator";

type NumberedIndicatorElement = React.ElementRef<typeof Primitive.span>;
type PrimitiveSpanProps = React.ComponentPropsWithoutRef<typeof Primitive.span>;
export interface NumberedIndicatorProps extends PrimitiveSpanProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true;
}

const NumberedIndicator = React.forwardRef<
  NumberedIndicatorElement,
  NumberedIndicatorProps
>((props: ScopedProps<NumberedIndicatorProps>, forwardedRef) => {
  const { __scopeInput, forceMount, ...indicatorProps } = props;
  const context = useRadioContext(INDICATOR_NAME, __scopeInput);
  return (
    <Presence present={forceMount || (context.number > 0 ? true : false)}>
      <Primitive.span
        data-state={getState(context.number > 0 ? true : false)}
        data-disabled={context.disabled ? "" : undefined}
        {...indicatorProps}
        ref={forwardedRef}
      />
    </Presence>
  );
});

NumberedIndicator.displayName = INDICATOR_NAME;

/* ---------------------------------------------------------------------------------------------- */

type InputProps = React.ComponentPropsWithoutRef<"input">;
interface BubbleInputProps extends Omit<InputProps, "checked"> {
  checked: boolean;
  control: HTMLElement | null;
  bubbles: boolean;
}

const BubbleInput = (props: BubbleInputProps) => {
  const { control, checked, bubbles = true, ...inputProps } = props;
  const ref = React.useRef<HTMLInputElement>(null);
  const prevChecked = usePrevious(checked);
  const controlSize = useSize(control);

  // Bubble checked change to parents (e.g form change event)
  React.useEffect(() => {
    const input = ref.current!;
    const inputProto = window.HTMLInputElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(
      inputProto,
      "checked",
    ) as PropertyDescriptor;
    const setChecked = descriptor.set;
    if (prevChecked !== checked && setChecked) {
      const event = new Event("click", { bubbles });
      setChecked.call(input, checked);
      input.dispatchEvent(event);
    }
  }, [prevChecked, checked, bubbles]);

  return (
    <input
      type="radio"
      aria-hidden
      defaultChecked={checked}
      {...inputProps}
      tabIndex={-1}
      ref={ref}
      style={{
        ...props.style,
        ...controlSize,
        position: "absolute",
        pointerEvents: "none",
        opacity: 0,
        margin: 0,
      }}
    />
  );
};

function getState(checked: boolean) {
  return checked ? "checked" : "unchecked";
}

export {
  createInputScope,
  //
  Input,
  NumberedIndicator,
};
export type { InputsProps };
