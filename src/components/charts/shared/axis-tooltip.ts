import type { EChartsOption } from "echarts";

type AxisTooltipDatum = {
  label: string;
  unit: string;
};

type AxisTooltipItem = {
  color?: string;
  marker?: string;
  seriesName?: string;
  value?: number | string;
};

function getAxisTooltipItems(params: unknown): AxisTooltipItem[] {
  if (!Array.isArray(params)) {
    return [];
  }

  return params.filter(
    (item): item is AxisTooltipItem =>
      Boolean(item) &&
      typeof item === "object" &&
      "seriesName" in item &&
      "value" in item &&
      (typeof item.seriesName === "string" || item.seriesName === undefined) &&
      (typeof item.value === "number" || typeof item.value === "string")
  );
}

export function createAxisTooltip(
  data: AxisTooltipDatum[],
  formatValue: (value: number) => string,
  formatUnit: (unit: string) => string
): EChartsOption["tooltip"] {
  const seriesByLabel = new Map(data.map((item) => [item.label, item]));

  return {
    backgroundColor: "transparent",
    borderWidth: 0,
    formatter: (params: unknown) => {
      const items = getAxisTooltipItems(params);

      if (items.length === 0) {
        return "";
      }

      const rows = items
        .map((item) => {
          const datum = seriesByLabel.get(item.seriesName ?? "");
          const marker = item.color
            ? `<span class="chart-tooltip-marker" style="background-color: ${item.color}"></span>`
            : (item.marker ?? "");
          const unit = datum
            ? `<span class="chart-tooltip-unit">${formatUnit(datum.unit)}</span>`
            : "";

          return `<div class="chart-tooltip-row"><span class="chart-tooltip-identity">${marker}<span class="chart-tooltip-label">${item.seriesName ?? ""}</span></span><span class="chart-tooltip-measure"><strong class="chart-tooltip-value">${formatValue(Number(item.value))}</strong>${unit}</span></div>`;
        })
        .join("");

      return `<div class="chart-tooltip-surface">${rows}</div>`;
    },
    padding: 0,
    renderMode: "html",
    trigger: "axis",
  };
}
