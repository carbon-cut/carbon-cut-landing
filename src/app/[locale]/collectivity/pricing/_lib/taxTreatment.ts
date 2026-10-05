import { isEuMemberCountry } from "./countryRules";

export type ViesStatus = "notChecked" | "checking" | "verified" | "invalid" | "unavailable";

export type TaxTreatmentKind = "france" | "europeanUnion" | "outsideEuropeanUnion" | "unresolved";

export function getTaxTreatment(
  countryCode: string | undefined,
  viesStatus: ViesStatus
): TaxTreatmentKind {
  if (!countryCode) return "unresolved";
  if (countryCode === "FRA") return "france";
  if (!isEuMemberCountry(countryCode)) return "outsideEuropeanUnion";

  return viesStatus === "verified" || viesStatus === "unavailable" ? "europeanUnion" : "unresolved";
}
