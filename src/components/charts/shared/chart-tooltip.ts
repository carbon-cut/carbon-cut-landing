import type { EChartsOption } from "echarts";

type ChartTooltipDatum = {
  label: string;
  unit: string;
};

type TooltipItem = {
  color?: string;
  name: string | number;
  value: number | string;
};

function getTooltipItem(params: unknown): TooltipItem | null {
  const item = Array.isArray(params) ? params[0] : params;

  if (
    !item ||
    typeof item !== "object" ||
    !("name" in item) ||
    !("value" in item) ||
    (typeof item.name !== "string" && typeof item.name !== "number") ||
    (typeof item.value !== "string" && typeof item.value !== "number")
  ) {
    return null;
  }

  return {
    ...(typeof item.color === "string" ? { color: item.color } : {}),
    name: item.name,
    value: item.value,
  };
}

export function createPieTooltip(
  data: ChartTooltipDatum[],
  formatValue: (value: number) => string,
  formatUnit: (unit: string) => string
): EChartsOption["tooltip"] {
  return {
    backgroundColor: "transparent",
    borderWidth: 0,
    formatter: (params: unknown) => {
      const item = getTooltipItem(params);

      if (!item) {
        return "";
      }

      const datum = data.find(({ label }) => label === item.name);
      const markerStyle = item.color ? ` style="background-color: ${item.color}"` : "";
      const unit = datum?.unit
        ? `<span class="chart-tooltip-unit">${formatUnit(datum.unit)}</span>`
        : "";

      return `<div class="chart-tooltip-surface"><div class="chart-tooltip-row"><span class="chart-tooltip-identity"><span class="chart-tooltip-marker"${markerStyle}></span><span class="chart-tooltip-label">${item.name}</span></span><span class="chart-tooltip-measure"><strong class="chart-tooltip-value">${formatValue(Number(item.value))}</strong>${unit}</span></div></div>`;
    },
    padding: 0,
    renderMode: "html",
    trigger: "item",
  };
}
