import countries from "./countries.json";

export function getQuoteCountryName(countryCode: string | undefined, locale: string) {
  const country = countries.find((candidate) => candidate.alpha3 === countryCode);
  return country
    ? (new Intl.DisplayNames([locale], { type: "region" }).of(country.alpha2) ?? country.alpha3)
    : "—";
}

export function formatQuoteAddress(customer: {
  addressLine1?: string;
  addressLine2?: string;
  postalCode?: string;
  city?: string;
}) {
  return [
    customer.addressLine1,
    customer.addressLine2,
    [customer.postalCode, customer.city].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(", ");
}

export function formatQuoteDate(value: string | null | undefined, locale: string) {
  return value ? new Date(`${value.slice(0, 10)}T00:00:00`).toLocaleDateString(locale) : "—";
}

export function formatQuoteDateTime(value: string | null | undefined, locale: string) {
  return value ? new Date(value).toLocaleDateString(locale) : "—";
}

export function isEuQuoteCountry(countryCode: string | undefined) {
  return countries.some((country) => country.alpha3 === countryCode && country.isEuMember);
}
