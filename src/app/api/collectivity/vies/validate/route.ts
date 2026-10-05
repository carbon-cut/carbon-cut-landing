import { NextResponse } from "next/server";
import { validateVatNumber, ViesUnavailableError } from "@/lib/vies/client";

const countryCodePattern = /^[A-Z]{2}$/;
const vatNumberPattern = /^[0-9A-Za-z+*.]{2,12}$/;

type ViesRequest = {
  countryCode?: unknown;
  vatNumber?: unknown;
};

function invalidRequest() {
  return NextResponse.json(
    {
      error: {
        status: 400,
        message: "Invalid VIES validation payload",
      },
    },
    { status: 400 }
  );
}

export async function POST(request: Request) {
  let payload: ViesRequest;

  try {
    payload = (await request.json()) as ViesRequest;
  } catch {
    return invalidRequest();
  }

  const countryCode =
    typeof payload.countryCode === "string" ? payload.countryCode.trim().toUpperCase() : "";
  const vatNumber = typeof payload.vatNumber === "string" ? payload.vatNumber.trim() : "";

  if (!countryCodePattern.test(countryCode) || !vatNumberPattern.test(vatNumber)) {
    return invalidRequest();
  }

  try {
    const result = await validateVatNumber({ countryCode, vatNumber });
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof ViesUnavailableError) {
      return NextResponse.json({ status: "unavailable" }, { status: 503 });
    }

    return NextResponse.json({ status: "unavailable" }, { status: 502 });
  }
}
