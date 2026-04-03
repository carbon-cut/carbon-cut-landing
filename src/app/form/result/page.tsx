import type { Metadata } from "next";
import { requireServerSession } from "@/lib/auth/session";
import { useScopedServerI18n } from "@/locales/server";
import { toKeywordArray } from "@/lib/seo";
import ResultPageClient from "./resultPageClient";
import { Suspense } from "react";

const resultSeo = useScopedServerI18n("seo.pages.results");

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: resultSeo("title"),
  description: resultSeo("description"),
  keywords: toKeywordArray(resultSeo("keywords") as unknown),
};

export default async function Page() {
  await requireServerSession("/form/result");
  return (
    <Suspense fallback={null}>
      <ResultPageClient />
    </Suspense>
  );
}
