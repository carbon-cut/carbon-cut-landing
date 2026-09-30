import { notFound, redirect } from "next/navigation";

import QuoteStatusPage from "./QuoteStatusPage";
import {
  getLatestCollectivitySubscription,
  CollectivityBackendError,
} from "@/lib/collectivity/backend";
import { getServerSession } from "@/lib/auth/session";
import {
  getCollectivityPricingRoute,
  getCollectivityPricingSubscriptionRoute,
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
    const subscription = await getLatestCollectivitySubscription();

    if (String(subscription.id) !== id) {
      redirect(getCollectivityPricingSubscriptionRoute(subscription.id));
    }

    if (
      subscription.cancelled ||
      (subscription.status !== "under_review" &&
        subscription.status !== "accepted" &&
        subscription.status !== "paid" &&
        subscription.status !== "rejected" &&
        subscription.status !== "expired")
    ) {
      notFound();
    }

    return <QuoteStatusPage subscription={subscription} />;
  } catch (error) {
    if (error instanceof CollectivityBackendError && error.status === 404) {
      redirect(getCollectivityPricingRoute());
    }

    throw error;
  }
}
