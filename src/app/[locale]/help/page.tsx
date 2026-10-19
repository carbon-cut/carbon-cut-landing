import type { Metadata } from "next";
import { getContactRoute } from "@/lib/routing/routes";
import { getScopedI18n } from "@/locales/server";
import { toKeywordArray } from "@/lib/seo";
import { setStaticParamsLocale } from "next-international/server";
import UnderDevelopmentPage from "@/components/pages/UnderDevelopmentPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const helpSeo = await getScopedI18n("seo.pages.help");

  return {
    title: helpSeo("title"),
    description: helpSeo("description"),
    keywords: toKeywordArray(
      Array(10)
        .fill(null)
        .map((_, i) => helpSeo(`keywords.${i}` as Parameters<typeof helpSeo>[0]))
    ),
  };
}

export default async function HelpPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const t = await getScopedI18n("(pages).helpCurrent.underDevelopment");

  return (
    <UnderDevelopmentPage
      title={t("title")}
      description={t("description")}
      primaryButton={{
        label: t("primaryButton"),
        href: "/",
      }}
      secondaryButton={{
        label: t("secondaryButton"),
        href: getContactRoute(),
      }}
    />
  );
}
