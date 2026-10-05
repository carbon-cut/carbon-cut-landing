import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SliderMilestone = {
  value: number;
  label: ReactNode;
  description?: ReactNode;
};

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  markerCount,
  type = "integer",
  milestones,
  ...props
}: SliderPrimitive.Root.Props & {
  markerCount?: number;
  milestones?: readonly SliderMilestone[];
  type?: "integer" | "decimal";
}) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max];
  const rangeMarkers =
    markerCount && markerCount > 1
      ? Array.from({ length: markerCount }, (_, index) => {
          const value = min + ((max - min) * index) / (markerCount - 1);
          return {
            value: type === "integer" ? Math.round(value) : value,
            label:
              type === "integer" ? String(Math.round(value)) : String(Number(value.toFixed(2))),
          };
        })
      : [];
  const markers = Array.from(
    new Map(
      [
        ...rangeMarkers,
        ...(milestones ?? []).map((milestone) => ({
          value: milestone.value,
          label:
            type === "integer"
              ? String(Math.round(milestone.value))
              : String(Number(milestone.value.toFixed(2))),
        })),
      ].map((marker) => [marker.value, marker])
    ).values()
  ).sort((left, right) => left.value - right.value);
  const minorTicks = markerCount
    ? Array.from({ length: Math.floor((max - min) / (props.step ?? 1)) + 1 }, (_, index) => {
        const rawValue = min + index * (props.step ?? 1);
        const value = type === "integer" ? Math.round(rawValue) : rawValue;
        return {
          value: value,
        };
      }).filter((tick) => {
        const isMarker = markers.some((marker) => marker.value === tick.value);
        return !isMarker;
      })
    : [];

  return (
    <div className="w-full !mt-0" data-slot="slider-wrapper">
      <SliderPrimitive.Root
        className={cn("w-full", className)}
        data-slot="slider"
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        thumbAlignment="center"
        {...props}
      >
        <SliderPrimitive.Control className="relative flex h-6 w-full touch-none items-center select-none data-disabled:opacity-50">
          <div className="w-full relative">
            <SliderPrimitive.Track
              data-slot="slider-track"
              className="relative h-1  w-full overflow-hidden rounded-full bg-border select-none"
            >
              <SliderPrimitive.Indicator
                data-slot="slider-range"
                className="h-full bg-primary select-none  "
              />
            </SliderPrimitive.Track>
          </div>
          {Array.from({ length: _values.length }, (_, index) => (
            <SliderPrimitive.Thumb
              data-slot="slider-thumb"
              key={index}
              className="cursor-pointer relative  size-4 shrink-0 rounded-full border-0 border-background bg-primary ring-primary/40 transition-[color,box-shadow] select-none after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 disabled:pointer-events-none disabled:opacity-50"
            />
          ))}
          {/* <div className="bg-black h-1 w-1"></div> */}
        </SliderPrimitive.Control>
      </SliderPrimitive.Root>
      <div className="">
        {minorTicks.length || markers.length ? (
          <div className="relative mt-1 h-10" aria-hidden="true" data-slot="slider-ruler">
            {minorTicks.map((tick) => {
              const position = ((tick.value - min) / (max - min)) * 100;
              return (
                <span
                  key={tick.value}
                  className="absolute top-0 h-1 border-l border-muted-foreground/70"
                  style={{ left: `${position}%` }}
                />
              );
            })}
            {/* {milestones?.map((milestone) => {
            const position = ((milestone.value - min) / (max - min)) * 100;
            return (
              <span
                key={milestone.value}
                className="absolute top-0 h-4 border-l border-primary"
                style={{ left: `${position}%` }}
              />
            );
          })} */}
            {markers.map((mark) => {
              const position = ((mark.value - min) / (max - min)) * 100;
              return (
                <div
                  key={mark.value}
                  className="absolute top-0 flex -translate-x-1/2 flex-col items-center text-xs text-foreground first:translate-x-0 last:-translate-x-full"
                  style={{ left: `${position}%` }}
                >
                  <span className="h-3 border-l border-foreground" />
                  <span className="mt-2">{mark.label}</span>
                </div>
              );
            })}
          </div>
        ) : null}

        {milestones?.length ? (
          <div className="relative h-6" data-slot="slider-milestones">
            {milestones.map((milestone) => {
              const position = ((milestone.value - min) / (max - min)) * 100;
              const alignmentClass =
                milestone.value === min
                  ? "translate-x-0"
                  : milestone.value === max
                    ? "-translate-x-full"
                    : "-translate-x-1/2";

              return (
                <div
                  key={milestone.value}
                  className={cn("absolute top-0 flex flex-col items-center", alignmentClass)}
                  style={{ left: `${position}%` }}
                >
                  <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {milestone.label}
                  </div>
                  {milestone.description ? (
                    <span className="mt-3 text-xs text-muted-foreground">
                      {milestone.description}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export { Slider };
