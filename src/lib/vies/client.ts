import "server-only";

const VIES_ENDPOINT = "https://ec.europa.eu/taxation_customs/vies/services/checkVatService";
const VIES_TIMEOUT_MS = 10_000;

export type ViesValidationResult = {
  status: "verified" | "invalid";
  name: string | null;
  address: string | null;
};

export class ViesUnavailableError extends Error {
  constructor() {
    super("VIES is unavailable");
  }
}

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => {
    switch (character) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return character;
    }
  });
}

function decodeXml(value: string) {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

function readSoapElement(xml: string, name: string) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = xml.match(
    new RegExp(
      `<(?:(?:\\w+):)?${escapedName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/(?:\\w+:)?${escapedName}>`
    )
  );

  return match ? decodeXml(match[1].trim()) : null;
}

function requestBody(countryCode: string, vatNumber: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="urn:ec.europa.eu:taxud:vies:services:checkVat:types">
  <soapenv:Body>
    <tns:checkVat>
      <tns:countryCode>${escapeXml(countryCode)}</tns:countryCode>
      <tns:vatNumber>${escapeXml(vatNumber)}</tns:vatNumber>
    </tns:checkVat>
  </soapenv:Body>
</soapenv:Envelope>`;
}

export async function validateVatNumber({
  countryCode,
  vatNumber,
}: {
  countryCode: string;
  vatNumber: string;
}): Promise<ViesValidationResult> {
  let response: Response;

  try {
    response = await fetch(VIES_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
      },
      body: requestBody(countryCode, vatNumber),
      signal: AbortSignal.timeout(VIES_TIMEOUT_MS),
      cache: "no-store",
    });
  } catch {
    throw new ViesUnavailableError();
  }

  const body = await response.text();

  if (!response.ok || readSoapElement(body, "Fault")) {
    throw new ViesUnavailableError();
  }

  const valid = readSoapElement(body, "valid");

  if (valid !== "true" && valid !== "false") {
    throw new ViesUnavailableError();
  }

  return {
    status: valid === "true" ? "verified" : "invalid",
    name: readSoapElement(body, "name"),
    address: readSoapElement(body, "address"),
  };
}
