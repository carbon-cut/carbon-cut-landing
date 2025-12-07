import type { Metadata } from "next";
import { useScopedServerI18n } from "@/locales/server";
import { toKeywordArray } from "@/lib/seo";
import ResultPageClient from "./resultPageClient";
import { Suspense } from "react";

const resultSeo = useScopedServerI18n("seo.pages.results");

export const metadata: Metadata = {
  title: resultSeo("title"),
  description: resultSeo("description"),
  keywords: toKeywordArray(resultSeo("keywords") as unknown),
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ResultPageClient />
    </Suspense>
  );
}
