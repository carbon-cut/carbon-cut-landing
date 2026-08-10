import type { Metadata } from "next";
import { requireHouseholdSession } from "@/lib/auth/access";
import { getScopedI18n } from "@/locales/server";
import { getFormResultRoute } from "@/lib/routing/routes";
import { toKeywordArray } from "@/lib/seo";
import { setStaticParamsLocale } from "next-international/server";
import ResultPageClient from "./resultPageClient";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const resultSeo = await getScopedI18n("seo.pages.results");

  return {
    title: resultSeo("title"),
    description: resultSeo("description"),
    keywords: toKeywordArray(
      Array(10)
        .fill(null)
        .map((_, i) => resultSeo(`keywords.${i}` as Parameters<typeof resultSeo>[0]))
    ),
  };
}

export default async function Page() {
  await requireHouseholdSession(getFormResultRoute());
  return (
    <Suspense fallback={null}>
      <ResultPageClient />
    </Suspense>
  );
}
