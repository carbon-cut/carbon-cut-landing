/** Maps collectivity ISO 3166-1 alpha-2 country codes to ISO 4217 currencies. */
export const countryCurrencyRegistry = {
  FRA: "EUR",
  TUN: "TND",
} as const satisfies Record<string, string>;

export function getCurrencyCode(countryCode: string): string {
  return (
    countryCurrencyRegistry[countryCode.toUpperCase() as keyof typeof countryCurrencyRegistry] ??
    "error"
  );
}

export function displayCurrency(countryCode: string | undefined, locale: string | undefined) {
  if (!countryCode || !locale) {
    return "currency";
  }

  const currencyCode = getCurrencyCode(countryCode);

  if (currencyCode === "error") {
    return "error";
  }

  try {
    return (
      new Intl.NumberFormat(locale, {
        currency: currencyCode,
        currencyDisplay: "symbol",
        style: "currency",
      })
        .formatToParts(0)
        .find(({ type }) => type === "currency")?.value ?? "error"
    );
  } catch {
    return "error";
  }
}
