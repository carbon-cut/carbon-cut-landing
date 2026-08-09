import type { Metadata } from "next";
import { requireHouseholdSession } from "@/lib/auth/access";
import { getFormRoute } from "@/lib/routing/routes";
import { getScopedI18n } from "@/locales/server";
import { toKeywordArray } from "@/lib/seo";
import { setStaticParamsLocale } from "next-international/server";
import FormPageClient from "./_components/formPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const formSeo = await getScopedI18n("seo.pages.form");

  return {
    title: formSeo("title"),
    description: formSeo("description"),
    keywords: toKeywordArray(
      Array(10)
        .fill(null)
        .map((_, i) => formSeo(`keywords.${i}` as Parameters<typeof formSeo>[0]))
    ),
  };
}

export default async function Page() {
  await requireHouseholdSession(getFormRoute());
  return <FormPageClient />;
}
