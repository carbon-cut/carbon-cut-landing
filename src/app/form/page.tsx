'use server'
import type { Metadata } from "next";
import { useScopedServerI18n } from "@/locales/server";
import { toKeywordArray } from "@/lib/seo";
import FormPageClient from "./_components/formPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const t = useScopedServerI18n("seo.pages.form");
  return {
    title: t("title"),
    description: t("description"),
    keywords: toKeywordArray(t("keywords") as unknown),
  };
}

export default async function Page() {
  return <FormPageClient />;
}
