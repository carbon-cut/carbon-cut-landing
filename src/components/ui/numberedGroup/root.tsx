import * as React from "react";
import { composeEventHandlers } from "@radix-ui/primitive";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { createContextScope } from "@radix-ui/react-context";
import { Primitive } from "@radix-ui/react-primitive";
import * as RovingFocusGroup from "@radix-ui/react-roving-focus";
import { createRovingFocusGroupScope } from "@radix-ui/react-roving-focus";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useDirection } from "@radix-ui/react-direction";
import { Input, NumberedIndicator, createInputScope } from "./input";

import type { Scope } from "@radix-ui/react-context";

const ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

/* -------------------------------------------------------------------------------------------------
 * RadioGroup
 * -----------------------------------------------------------------------------------------------*/
const RADIO_GROUP_NAME = "RadioGroup";

type ScopedProps<P> = P & { __scopeRadioGroup?: Scope };
const [createRadioGroupContext, createRadioGroupScope] = createContextScope(RADIO_GROUP_NAME, [
  createRovingFocusGroupScope,
  createInputScope,
]);
const useRovingFocusGroupScope = createRovingFocusGroupScope();
const useRadioScope = createInputScope();

type RadioGroupContextValue = {
  name?: string;
  required: boolean;
  disabled: boolean;
  value?: number;
  onValueChange(value: number): void;
};

const [RadioGroupProvider, useRadioGroupContext] =
  createRadioGroupContext<RadioGroupContextValue>(RADIO_GROUP_NAME);

type RadioGroupElement = React.ElementRef<typeof Primitive.div>;
type RovingFocusGroupProps = React.ComponentPropsWithoutRef<typeof RovingFocusGroup.Root>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface InputGroupProps extends PrimitiveDivProps {
  name?: RadioGroupContextValue["name"];
  required?: React.ComponentPropsWithoutRef<typeof Input>["required"];
  disabled?: React.ComponentPropsWithoutRef<typeof Input>["disabled"];
  dir?: RovingFocusGroupProps["dir"];
  orientation?: RovingFocusGroupProps["orientation"];
  loop?: RovingFocusGroupProps["loop"];
  defaultValue?: number;
  value?: RadioGroupContextValue["value"];
  onValueChange?: RadioGroupContextValue["onValueChange"];
}

const InputGroup = React.forwardRef<RadioGroupElement, InputGroupProps>(
  (props: ScopedProps<InputGroupProps>, forwardedRef) => {
    const {
      __scopeRadioGroup,
      name,
      defaultValue,
      value: valueProp,
      required = false,
      disabled = false,
      orientation,
      dir,
      loop = true,
      onValueChange,
      ...groupProps
    } = props;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });

    return (
      <RadioGroupProvider
        scope={__scopeRadioGroup}
        name={name}
        required={required}
        disabled={disabled}
        value={value}
        onValueChange={setValue}
      >
        <RovingFocusGroup.Root
          asChild
          {...rovingFocusGroupScope}
          orientation={orientation}
          dir={direction}
          loop={loop}
        >
          <Primitive.div
            role="radiogroup"
            aria-required={required}
            aria-orientation={orientation}
            data-disabled={disabled ? "" : undefined}
            dir={direction}
            {...groupProps}
            ref={forwardedRef}
          />
        </RovingFocusGroup.Root>
      </RadioGroupProvider>
    );
  }
);

InputGroup.displayName = RADIO_GROUP_NAME;

/* -------------------------------------------------------------------------------------------------
 * InputGroupItem
 * -----------------------------------------------------------------------------------------------*/

const ITEM_NAME = "InputGroupItem";

type RadioGroupItemElement = React.ElementRef<typeof Input>;
type RadioProps = React.ComponentPropsWithoutRef<typeof Input>;
interface RadioGroupItemProps extends Omit<RadioProps, "onCheck" | "name"> {
  value: number;
}

const InputGroupItem = React.forwardRef<RadioGroupItemElement, RadioGroupItemProps>(
  (props: ScopedProps<RadioGroupItemProps>, forwardedRef) => {
    const { __scopeRadioGroup, disabled, ...itemProps } = props;
    const context = useRadioGroupContext(ITEM_NAME, __scopeRadioGroup);
    const isDisabled = context.disabled || disabled;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
    const radioScope = useRadioScope(__scopeRadioGroup);
    const ref = React.useRef<React.ElementRef<typeof Input>>(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const number = itemProps.value;
    const isArrowKeyPressedRef = React.useRef(false);

    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (ARROW_KEYS.includes(event.key)) {
          isArrowKeyPressedRef.current = true;
        }
      };
      const handleKeyUp = () => (isArrowKeyPressedRef.current = false);
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
      };
    }, []);

    return (
      <RovingFocusGroup.Item
        asChild
        {...rovingFocusGroupScope}
        focusable={!isDisabled}
        active={number ? true : false}
      >
        <Input
          disabled={isDisabled}
          required={context.required}
          number={number}
          {...radioScope}
          {...itemProps}
          name={context.name}
          ref={composedRefs}
          onCheck={() => context.onValueChange(itemProps.value)}
          onKeyDown={composeEventHandlers((event) => {
            // According to WAI ARIA, radio groups don't activate items on enter keypress
            if (event.key === "Enter") event.preventDefault();
          })}
          onFocus={composeEventHandlers(itemProps.onFocus, () => {
            /**
             * Our `RovingFocusGroup` will focus the radio when navigating with arrow keys
             * and we need to "check" it in that case. We click it to "check" it (instead
             * of updating `context.value`) so that the radio change event fires.
             */
            if (isArrowKeyPressedRef.current) ref.current?.click();
          })}
        />
      </RovingFocusGroup.Item>
    );
  }
);

InputGroupItem.displayName = ITEM_NAME;

/* -------------------------------------------------------------------------------------------------
 * RadioGroupIndicator
 * -----------------------------------------------------------------------------------------------*/

const INDICATOR_NAME = "RadioGroupIndicator";

type RadioGroupIndicatorElement = React.ElementRef<typeof NumberedIndicator>;
type RadioIndicatorProps = React.ComponentPropsWithoutRef<typeof NumberedIndicator>;
interface RadioGroupIndicatorProps extends RadioIndicatorProps {}

const InputGroupIndicator = React.forwardRef<RadioGroupIndicatorElement, RadioGroupIndicatorProps>(
  (props: ScopedProps<RadioGroupIndicatorProps>, forwardedRef) => {
    const { __scopeRadioGroup, ...indicatorProps } = props;
    const radioScope = useRadioScope(__scopeRadioGroup);
    return <NumberedIndicator {...radioScope} {...indicatorProps} ref={forwardedRef} />;
  }
);

InputGroupIndicator.displayName = INDICATOR_NAME;

/* ---------------------------------------------------------------------------------------------- */

const Root = InputGroup;
const Item = InputGroupItem;
const Indicator = InputGroupIndicator;

export {
  createRadioGroupScope,
  //
  InputGroup as NumberedGroup,
  InputGroupItem as NumberedGroupItem,
  InputGroupIndicator as NumberedGroupIndicator,
  //
  Root,
  Item,
  Indicator,
};
export type { InputGroupProps, RadioGroupItemProps, RadioGroupIndicatorProps };
