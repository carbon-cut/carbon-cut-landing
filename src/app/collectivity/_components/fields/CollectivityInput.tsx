"use client";

import * as React from "react";

import { Input, type InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type CollectivityInputProps = InputProps & {
  unitAdornment?: React.ReactNode;
  unitAdornmentPlacement?: "start" | "end";
  valueControl?: (value: number) => boolean;
};

const CollectivityInput = React.forwardRef<HTMLInputElement, CollectivityInputProps>(
  (
    {
      className,
      type,
      unitAdornment,
      unitAdornmentPlacement = "end",
      valueControl = (value) => value > 0,
      onChange,
      style,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const unitRef = React.useRef<HTMLSpanElement>(null);
    const lastValidValueRef = React.useRef(String(props.value ?? props.defaultValue ?? ""));
    const [unitPx, setUnitPx] = React.useState(0);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    React.useLayoutEffect(() => {
      if (!unitAdornment) {
        if (unitPx !== 0) setUnitPx(0);
        return;
      }

      const element = unitRef.current;
      if (!element) return;

      const update = () => {
        const rect = element.getBoundingClientRect();
        const computed = Math.ceil(rect.width) + 13;
        if (computed !== unitPx) setUnitPx(computed);
      };

      update();
      const resizeObserver = new ResizeObserver(update);
      resizeObserver.observe(element);

      return () => resizeObserver.disconnect();
    }, [unitAdornment, unitPx]);

    React.useEffect(() => {
      if (props.value !== undefined) {
        lastValidValueRef.current = String(props.value);
      }
    }, [props.value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (type !== "number") {
        onChange?.(event);
        return;
      }

      const nextValue = event.target.value;

      if (nextValue === "") {
        lastValidValueRef.current = "";
        onChange?.(event);
        return;
      }

      const parsedValue = Number(nextValue);

      if (Number.isNaN(parsedValue) || !valueControl(parsedValue)) {
        event.currentTarget.value = lastValidValueRef.current;
        return;
      }

      lastValidValueRef.current = nextValue;
      onChange?.(event);
    };

    const inputStyle =
      unitAdornment && unitPx
        ? ({
            ...style,
            ...(unitAdornmentPlacement === "end"
              ? { paddingRight: `${unitPx}px` }
              : { paddingLeft: `${unitPx}px` }),
          } as React.CSSProperties)
        : style;

    return (
      <div className="relative">
        <Input
          ref={inputRef}
          {...props}
          type={type}
          inputMode={type === "number" ? "decimal" : props.inputMode}
          min={type === "number" ? (props.min ?? "0.000001") : props.min}
          step={type === "number" ? (props.step ?? "any") : props.step}
          style={inputStyle}
          className={cn(
            "h-10 rounded-md",
            unitAdornment
              ? unitPx
                ? ""
                : unitAdornmentPlacement === "end"
                  ? "pr-16"
                  : "pl-16"
              : "",
            className
          )}
          onChange={handleChange}
        />
        {unitAdornment ? (
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 flex items-center",
              unitAdornmentPlacement === "end" ? "right-2.5" : "left-2.5"
            )}
          >
            <span
              ref={unitRef}
              className="h-5 rounded-full border border-input bg-muted/70 px-2 text-xs font-medium leading-5 text-foreground/70"
            >
              {unitAdornment}
            </span>
          </div>
        ) : null}
      </div>
    );
  }
);

CollectivityInput.displayName = "CollectivityInput";

export default CollectivityInput;
