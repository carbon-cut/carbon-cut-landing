import type { Metadata } from "next";
import type { ReactNode } from "react";

import { toKeywordArray } from "@/lib/seo";
import { getScopedI18n } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const collectivitySeo = await getScopedI18n("seo.pages.collectivityLanding");

  return {
    title: collectivitySeo("title"),
    description: collectivitySeo("description"),
    keywords: toKeywordArray(
      Array(10)
        .fill(null)
        .map((_, i) => collectivitySeo(`keywords.${i}` as Parameters<typeof collectivitySeo>[0]))
    ),
  };
}

export default function CollectivityLayout({ children }: { children: ReactNode }) {
  return children;
}
