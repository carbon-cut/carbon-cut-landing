import { notFound, redirect } from "next/navigation";

import QuoteStatusPage from "./QuoteStatusPage";
import { getLatestCollectivityQuote, CollectivityBackendError } from "@/lib/collectivity/backend";
import { getServerSession } from "@/lib/auth/session";
import {
  getCollectivityPricingRoute,
  getCollectivityPricingQuoteRoute,
} from "@/lib/routing/routes";
import { setStaticParamsLocale } from "next-international/server";

export default async function CollectivityPricingSubscriptionPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setStaticParamsLocale(locale);
  const session = await getServerSession();

  if (!session.authenticated) {
    redirect(getCollectivityPricingRoute());
  }

  try {
    const quote = await getLatestCollectivityQuote();

    if (String(quote.id) !== id) {
      redirect(getCollectivityPricingQuoteRoute(quote.id));
    }

    if (
      quote.cancelled ||
      (quote.status !== "under_review" &&
        quote.status !== "accepted" &&
        quote.status !== "paid" &&
        quote.status !== "rejected")
    ) {
      notFound();
    }

    return <QuoteStatusPage subscription={quote} />;
  } catch (error) {
    if (error instanceof CollectivityBackendError && error.status === 404) {
      redirect(getCollectivityPricingRoute());
    }

    throw error;
  }
}
