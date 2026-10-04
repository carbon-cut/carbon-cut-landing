import type { Metadata } from "next";
import { FeatherCheck } from "@subframe/core";
import { redirect } from "next/navigation";
import { setStaticParamsLocale } from "next-international/server";

import { formatQuoteDate } from "../pricing/_lib/quotePresentation";
import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { requireServerSession } from "@/lib/auth/session";
import {
  CollectivityBackendError,
  getCollectivitySubscriptionDetail,
  getLatestCollectivityQuote,
} from "@/lib/collectivity/backend";
import {
  getCollectivityPricingRoute,
  getCollectivityPricingQuoteRoute,
  getCollectivitySubscriptionRoute,
} from "@/lib/routing/routes";
import { getScopedI18n } from "@/locales/server";
import SubscriptionCapacityCard from "./SubscriptionCapacityCard";
import SubscriptionInvitationLinkCard from "./SubscriptionInvitationLinkCard";
import SubscriptionRequestsCard from "./SubscriptionRequestsCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const t = await getScopedI18n("collectivitySubscription");

  return { title: t("title"), description: t("description") };
}

export default async function CollectivitySubscriptionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  await requireServerSession(getCollectivitySubscriptionRoute());

  let quote;

  try {
    quote = await getLatestCollectivityQuote();
  } catch (error) {
    if (error instanceof CollectivityBackendError && error.status === 404) {
      redirect(getCollectivityPricingRoute());
    }

    throw error;
  }

  if (quote.cancelled) {
    redirect(getCollectivityPricingRoute());
  }

  if (quote.status !== "paid" || !quote.subscriptionId) {
    redirect(getCollectivityPricingQuoteRoute(quote.id));
  }

  let subscription;

  try {
    subscription = await getCollectivitySubscriptionDetail(quote.subscriptionId);
  } catch (error) {
    if (error instanceof CollectivityBackendError && error.status === 404) {
      redirect(getCollectivityPricingQuoteRoute(quote.id));
    }

    throw error;
  }

  const now = Date.now();
  if (
    (subscription.status !== "paid" && subscription.status !== "active") ||
    (subscription.startsAt !== null && new Date(subscription.startsAt).getTime() > now) ||
    (subscription.endsAt !== null && new Date(subscription.endsAt).getTime() < now)
  ) {
    redirect(getCollectivityPricingQuoteRoute(quote.id));
  }

  const t = await getScopedI18n("collectivitySubscription");
  const period =
    subscription.startsAt && subscription.endsAt
      ? t("period", {
          startDate: formatQuoteDate(subscription.startsAt, locale),
          endDate: formatQuoteDate(subscription.endsAt, locale),
          years: quote.pricingSnapshot.selection.termYears,
        })
      : null;

  return (
    <main id="content" className="min-h-screen bg-neutral-50 px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-col items-start gap-2">
          <Typography variant="captionBold" className="text-brand-700">
            {t("eyebrow")}
          </Typography>
          <Typography asChild variant="heading1" className="text-default-font">
            <h1>{t("title")}</h1>
          </Typography>
          <Typography asChild variant="bodySubframe" className="max-w-2xl text-subtext-color">
            <p>{t("description")}</p>
          </Typography>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Badge variant="success">
              <FeatherCheck className="size-3" aria-hidden="true" />
              {t("active")}
            </Badge>
            {period ? (
              <Typography variant="captionSubframe" className="text-subtext-color">
                {period}
              </Typography>
            ) : null}
          </div>
        </header>
        <SubscriptionCapacityCard initialSubscription={subscription} />
        <SubscriptionInvitationLinkCard initialSubscription={subscription} />
        <SubscriptionRequestsCard initialSubscription={subscription} />
      </div>
    </main>
  );
}
