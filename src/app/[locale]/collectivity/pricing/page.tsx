import type { Metadata } from "next";
import { redirect } from "next/navigation";

import PricingFlowShell from "./_components/PricingFlowShell";
import { CollectivityBackendError, getLatestCollectivityQuote } from "@/lib/collectivity/backend";
import { getServerSession } from "@/lib/auth/session";
import { getCollectivityPricingQuoteRoute } from "@/lib/routing/routes";
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

  if (session.authenticated) {
    let latestQuoteId: number | null = null;

    try {
      const quote = await getLatestCollectivityQuote();
      if (
        !quote.cancelled &&
        (quote.status === "under_review" || quote.status === "accepted" || quote.status === "paid")
      ) {
        latestQuoteId = quote.id;
      }
    } catch (error) {
      if (!(error instanceof CollectivityBackendError) || error.status !== 404) {
        // The editable configuration remains available when the latest-status lookup is unavailable.
      }
    }

    if (latestQuoteId) {
      redirect(getCollectivityPricingQuoteRoute(latestQuoteId));
    }
  }

  return <PricingFlowShell isAuthenticated={session.authenticated} />;
}
