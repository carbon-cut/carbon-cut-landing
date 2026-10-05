const numericLocale = "en-US";

export function formatChartValue(value: number, maximumFractionDigits = 2) {
  return new Intl.NumberFormat(numericLocale, { maximumFractionDigits }).format(value);
}

export function formatChartPercentage(value: number) {
  return new Intl.NumberFormat(numericLocale, {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  }).format(value);
}
