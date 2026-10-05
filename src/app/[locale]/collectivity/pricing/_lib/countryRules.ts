import countries from "./countries.json";

export function isEuMemberCountry(countryCode?: string) {
  return countries.some((country) => country.alpha3 === countryCode && country.isEuMember);
}

export function getViesCountryCode(countryCode?: string) {
  const country = countries.find((item) => item.alpha3 === countryCode);

  if (!country) return undefined;

  return country.alpha2 === "GR" ? "EL" : country.alpha2;
}
