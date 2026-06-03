import { NextResponse } from "next/server";

import { getCollectivityCountryOptions } from "@/app/collectivity/_cadrage/schema";

export async function GET() {
  const countries = await getCollectivityCountryOptions();

  return NextResponse.json({ data: countries });
}
