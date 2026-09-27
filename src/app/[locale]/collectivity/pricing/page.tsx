import type { Metadata } from "next";

import PricingFlowContent from "./_components/PricingFlowContent";
import { getServerSession } from "@/lib/auth/session";
import { getScopedI18n } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const t = await getScopedI18n("seo.pages.collectivityPricing");
  return { title: t("title"), description: t("description") };
}

export default async function CollectivityPricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const session = await getServerSession();

  return <PricingFlowContent isAuthenticated={session.authenticated} />;
}
