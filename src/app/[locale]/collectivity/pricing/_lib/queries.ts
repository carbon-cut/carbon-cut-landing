export type ViesValidationResult =
  | {
      status: "verified" | "invalid";
      name: string | null;
      address: string | null;
    }
  | {
      status: "unavailable";
    };

type ViesValidationRequest = {
  countryCode: string;
  vatNumber: string;
};

export async function validateViesVatNumber(
  values: ViesValidationRequest
): Promise<ViesValidationResult> {
  const response = await fetch("/api/collectivity/vies/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(values),
  });
  const payload = (await response.json()) as ViesValidationResult;

  if (response.ok || payload.status === "unavailable") return payload;

  throw new Error("VIES validation request failed");
}
