import type { Metadata } from "next";
import { useScopedServerI18n } from "@/locales/server";
import { toKeywordArray } from "@/lib/seo";
import ResultPageClient from "./resultPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const t = useScopedServerI18n("seo.pages.results");
  return {
    title: t("title"),
    description: t("description"),
    keywords: toKeywordArray(t("keywords") as unknown),
  };
}

export default function Page() {
  return <ResultPageClient />;
}
