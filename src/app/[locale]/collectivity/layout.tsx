import type { Metadata } from "next";
import type { ReactNode } from "react";

import { toKeywordArray } from "@/lib/seo";
import { getScopedI18n } from "@/locales/server";

export async function generateMetadata(): Promise<Metadata> {
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
