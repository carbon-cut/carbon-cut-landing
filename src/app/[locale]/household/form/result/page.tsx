import type { Metadata } from "next";
import { requireHouseholdSession } from "@/lib/auth/access";
import { getScopedI18n } from "@/locales/server";
import { getFormResultRoute } from "@/lib/routing/routes";
import { toKeywordArray } from "@/lib/seo";
import ResultPageClient from "./resultPageClient";
import { Suspense } from "react";

const resultSeo = getScopedI18n("seo.pages.results");

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: resultSeo("title"),
  description: resultSeo("description"),
  keywords: toKeywordArray(resultSeo("keywords") as unknown),
};

export default async function Page() {
  await requireHouseholdSession(getFormResultRoute());
  return (
    <Suspense fallback={null}>
      <ResultPageClient />
    </Suspense>
  );
}
