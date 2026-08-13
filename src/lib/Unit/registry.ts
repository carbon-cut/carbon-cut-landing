import { displayCurrency } from "./currency";

/** Maps backend unit codes to their typographic display notation. */
export const unitDisplayRegistry = {
  m3: "m³",
  Nm3: "Nm³",
  tCO2e: "tCO₂e",
} as const satisfies Record<string, string>;

type DisplayUnitOptions = {
  countryCode?: string;
  locale?: string;
  localize?: (unit: string) => string;
};

export function displayUnit(
  unit: string,
  { countryCode, locale, localize = (unitPart) => unitPart }: DisplayUnitOptions = {}
) {
  return unit
    .split("/")
    .map((unitPart) => {
      if (unitPart === "currency") {
        return displayCurrency(countryCode, locale);
      }

      return (
        unitDisplayRegistry[unitPart as keyof typeof unitDisplayRegistry] ?? localize(unitPart)
      );
    })
    .join("/");
}
