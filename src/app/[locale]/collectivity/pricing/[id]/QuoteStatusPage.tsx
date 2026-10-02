"use client";

import {
  FeatherCheck,
  FeatherCircleCheck,
  FeatherClock,
  FeatherHourglass,
  FeatherX,
} from "@subframe/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import acceptedPaymentInstructions from "../_lib/temporaryAcceptedPaymentInstructions";
import { formatSubscriptionCurrency, type PublicCollectivityQuote } from "../_lib/pricing";
import {
  formatQuoteAddress,
  formatQuoteDate,
  formatQuoteDateTime,
  getQuoteCountryName,
  isEuQuoteCountry,
} from "../_lib/quotePresentation";
import {
  QuoteOfferTable,
  QuoteConfigurationTiles,
  QuoteOfferTotals,
} from "../_components/QuoteOfferReview";
import { QuotePaymentInstructions } from "../_components/QuotePaymentInstructions";
import { QuoteRequestProgress } from "../_components/QuoteRequestProgress";
import {
  QuoteClientReviewCard,
  QuoteIssuerReviewCard,
  QuoteTaxTreatmentReviewCard,
  QuoteTermsReviewCard,
} from "../_components/QuoteReviewCards";
import { QuoteReviewCard } from "../_components/QuoteReviewPrimitives";
import { QuoteCancelSubscription } from "../_components/QuoteCancelSubscription";
import { QuoteRejectionReason } from "../_components/QuoteRejectionReason";
import { QuoteStatusHeader } from "../_components/QuoteStatusHeader";
import { QuoteStatusNotice } from "../_components/QuoteStatusNotice";
import { QuoteStatusSidebar } from "../_components/QuoteStatusSidebar";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import {
  collectivityQueryKeys,
  fetchLatestCollectivityQuote,
  latestQuoteQueryOptions,
} from "@/app/[locale]/collectivity/_lib/queries";
import {
  getCollectivityPricingRoute,
  getCollectivitySubscriptionRoute,
  getContactRoute,
} from "@/lib/routing/routes";

export default function QuoteStatusPage({
  subscription: initialSubscription,
}: {
  subscription: PublicCollectivityQuote;
}) {
  const shared = useScopedI18n("collectivityPricing.underReviewQuote");
  const accepted = useScopedI18n("collectivityPricing.acceptedQuote");
  const paid = useScopedI18n("collectivityPricing.paidQuote");
  const rejected = useScopedI18n("collectivityPricing.rejectedQuote");
  const expired = useScopedI18n("collectivityPricing.expiredQuote");
  const verification = useScopedI18n("collectivityPricing.quoteVerification");
  const legal = useScopedI18n("collectivityPricing.quoteInformation.cards.legalIdentity");
  const terms = useScopedI18n("collectivityPricing.quoteInformation.cards.quoteTerms");
  const pricing = useScopedI18n("collectivityPricing");
  const locale = useCurrentLocale();
  const router = useRouter();
  const latestSubscriptionQuery = useQuery({
    ...latestQuoteQueryOptions,
    queryKey: collectivityQueryKeys.latestQuote(),
    queryFn: fetchLatestCollectivityQuote,
    initialData: initialSubscription,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === "under_review" || status === "accepted" ? 30 * 1000 : false;
    },
  });
  const subscription = latestSubscriptionQuery.data ?? initialSubscription;
  const isAccepted = subscription.status === "accepted";
  const isPaid = subscription.status === "paid";
  const isRejected = subscription.status === "rejected";
  const isExpired =
    isPaid && Boolean(subscription.endsAt && new Date(subscription.endsAt) < new Date());
  const {
    buyerSnapshot: buyer,
    sellerSnapshot: seller,
    pricingSnapshot,
    termsSnapshot,
  } = subscription;
  const selection = pricingSnapshot.selection;
  const amounts = pricingSnapshot.amounts;
  const submittedDate = formatQuoteDateTime(subscription.submittedAt, locale);
  const approvedDate = formatQuoteDateTime(subscription.acceptedAt, locale);
  const paidDate = formatQuoteDateTime(subscription.paidAt, locale);
  const rejectedDate = formatQuoteDateTime(subscription.rejectedAt, locale);
  const expiredDate = formatQuoteDate(subscription.endsAt, locale);
  const subscriptionPeriod = paid("activePeriod.value", {
    startDate: formatQuoteDate(subscription.startsAt, locale),
    endDate: formatQuoteDate(subscription.endsAt, locale),
  });
  const paymentDueDate = formatQuoteDate(acceptedPaymentInstructions.dueDate, locale);
  const totalIncludingTax = formatSubscriptionCurrency(amounts.totalIncludingTaxCents);

  return (
    <div className="flex w-full flex-col items-start gap-8 mobile:gap-6">
      <QuoteStatusHeader
        backLabel={shared("back")}
        title={shared("title", { reference: subscription.reference })}
        description={
          isExpired
            ? expired("description")
            : isRejected
              ? rejected("description")
              : isPaid
                ? paid("description")
                : isAccepted
                  ? accepted("description")
                  : shared("description")
        }
        badge={
          isExpired
            ? expired("badge")
            : isRejected
              ? rejected("badge")
              : isPaid
                ? paid("badge")
                : isAccepted
                  ? accepted("badge")
                  : shared("badge")
        }
        badgeVariant={
          isExpired || isRejected ? "error" : isPaid || isAccepted ? "success" : "warning"
        }
        badgeIcon={
          isExpired || isRejected ? (
            <FeatherX className="size-3" aria-hidden="true" />
          ) : isPaid || isAccepted ? (
            <FeatherCheck className="size-3" aria-hidden="true" />
          ) : (
            <FeatherClock className="size-3" aria-hidden="true" />
          )
        }
        date={
          isExpired
            ? expired("expiredAt", { date: expiredDate })
            : isRejected
              ? rejected("rejectedAt", { date: rejectedDate })
              : isPaid
                ? paid("paidAt", { date: paidDate })
                : isAccepted
                  ? accepted("approvedAt", { date: approvedDate })
                  : shared("acceptedAt", { date: submittedDate })
        }
      />

      <div className="flex w-full items-start gap-8 mobile:flex-col mobile:gap-6">
        <main className="flex min-w-0 grow shrink-0 basis-0 flex-col items-start gap-6 mobile:flex-none">
          <QuoteStatusNotice
            status={
              isExpired
                ? "expired"
                : isRejected
                  ? "rejected"
                  : isPaid
                    ? "paid"
                    : isAccepted
                      ? "accepted"
                      : "under_review"
            }
            icon={
              isExpired || isRejected ? (
                <FeatherX />
              ) : isPaid || isAccepted ? (
                <FeatherCircleCheck />
              ) : (
                <FeatherHourglass />
              )
            }
            title={
              isExpired
                ? expired("badge")
                : isRejected
                  ? rejected("badge")
                  : isPaid
                    ? paid("badge")
                    : isAccepted
                      ? accepted("badge")
                      : shared("badge")
            }
            summary={
              isExpired || isRejected || isPaid || isAccepted ? undefined : shared("notice.summary")
            }
            description={
              isExpired
                ? expired("notice.description")
                : isRejected
                  ? rejected("notice.description")
                  : isPaid
                    ? paid("notice.description")
                    : isAccepted
                      ? accepted("notice.description", {
                          dueDate: paymentDueDate,
                          approvedDate,
                        })
                      : shared("notice.description")
            }
          />

          {isAccepted ? (
            <QuotePaymentInstructions
              title={accepted("paymentInstructions.title")}
              beneficiaryLabel={accepted("paymentInstructions.beneficiary")}
              beneficiary={seller.legalName}
              bankLabel={accepted("paymentInstructions.bank")}
              ibanLabel={accepted("paymentInstructions.iban")}
              bicLabel={accepted("paymentInstructions.bic")}
              amountLabel={accepted("paymentInstructions.amount")}
              amount={totalIncludingTax}
              referenceLabel={accepted("paymentInstructions.reference")}
              reference={subscription.reference}
              dueDateLabel={accepted("paymentInstructions.dueDate")}
              copyLabel={accepted("paymentInstructions.copy")}
              referenceNotice={accepted("paymentInstructions.referenceNotice")}
              data={{ ...acceptedPaymentInstructions, dueDate: paymentDueDate }}
            />
          ) : null}

          {isRejected ? (
            <QuoteRejectionReason
              title={rejected("reason.title")}
              label={rejected("reason.label")}
              reason={subscription.refusalReasonForCustomer ?? rejected("reason.unavailable")}
            />
          ) : null}

          <QuoteClientReviewCard
            title={verification("client.title")}
            entries={[
              { label: legal("legalName"), value: buyer.legalName },
              { label: legal("customerType"), value: legal("legalEntity") },
              { label: legal("addressLine1"), value: formatQuoteAddress(buyer) },
              {
                label: legal("countryCode"),
                value: getQuoteCountryName(buyer.countryCode, locale),
              },
              ...(buyer.countryCode === "FRA"
                ? [{ label: shared("sirenSiret"), value: buyer.siret || buyer.siren }]
                : []),
              {
                label: isEuQuoteCountry(buyer.countryCode)
                  ? legal("vatNumber")
                  : legal("generalTaxIdentifier"),
                value: buyer.hasNoVatNumber ? legal("hasNoVatNumber") : buyer.vatNumber,
              },
              { label: legal("contact"), value: buyer.contact.name },
              { label: legal("contactEmail"), value: buyer.contact.email },
              ...(buyer.contact.phone
                ? [{ label: legal("contactPhone"), value: buyer.contact.phone }]
                : []),
            ]}
          />

          <QuoteReviewCard title={verification("offer.title")}>
            <QuoteConfigurationTiles
              communeQuantity={selection.communeQuantity}
              termYears={selection.termYears}
              perimeter={selection.perimeter}
            />
            <QuoteOfferTable
              modules={pricingSnapshot.lines}
              communeQuantity={selection.communeQuantity}
            />
            <QuoteOfferTotals
              annualSubtotalCents={amounts.annualSubtotalExcludingTaxCents}
              discountBasisPoints={pricingSnapshot.discountBasisPoints}
              discountAmountCents={amounts.annualDiscountCents}
              annualTotalCents={amounts.annualTotalExcludingTaxCents}
              contractTotalCents={amounts.contractTotalExcludingTaxCents}
              termYears={selection.termYears}
            />
          </QuoteReviewCard>

          <QuoteTermsReviewCard
            title={terms("title")}
            entries={[
              { label: terms("currency"), value: terms("currencyEur") },
              {
                label: terms("contractStartDate"),
                value: formatQuoteDate(subscription.requestedContractStartDate, locale),
              },
              {
                label: terms("validUntil"),
                value: formatQuoteDate(termsSnapshot.quoteValidityEndsAt, locale),
              },
              {
                label: terms("paymentTerms"),
                value: terms("paymentTermsValue", { count: termsSnapshot.paymentTermsDays }),
              },
              { label: terms("paymentMethod"), value: terms("bankTransfer") },
            ]}
          />

          <QuoteTaxTreatmentReviewCard
            title={verification("tax.title")}
            label={getTaxLabel(verification, amounts.taxTreatment)}
            quoteMentionLabel={verification("tax.quoteMention")}
            quoteMention={amounts.legalTaxMention}
            headerDescription={shared("taxDescription")}
            quoteBox
          />

          <QuoteIssuerReviewCard
            title={verification("issuer.title")}
            description={verification("issuer.description")}
            entries={[
              { label: legal("legalName"), value: seller.legalName },
              { label: verification("issuer.registeredOffice"), value: seller.registeredOffice },
              { label: legal("siren"), value: seller.siren },
              { label: verification("issuer.rcs"), value: seller.rcs },
              { label: legal("vatNumber"), value: seller.vatNumber ?? undefined },
            ]}
          />
        </main>

        <QuoteStatusSidebar
          title={verification("sidebar.title")}
          frozenLabel={verification("sidebar.frozen")}
          annualLabel={pricing("summary.annualTotal")}
          annualValue={formatSubscriptionCurrency(amounts.annualTotalExcludingTaxCents)}
          durationLabel={pricing("summary.duration")}
          durationValue={
            selection.termYears === 1
              ? pricing("configuration.term.oneYear")
              : pricing("configuration.term.threeYears")
          }
          totalHtLabel={verification("sidebar.totalHt")}
          totalHtValue={formatSubscriptionCurrency(amounts.contractTotalExcludingTaxCents)}
          vatLabel={verification("sidebar.vat")}
          vatValue={formatSubscriptionCurrency(amounts.vatAmountCents)}
          totalTtcLabel={verification("sidebar.totalTtc")}
          totalTtcValue={totalIncludingTax}
          totalDescription={verification("sidebar.totalTtcDescription", {
            years: selection.termYears,
          })}
          progressTitle={shared("progress.title")}
          progress={
            <QuoteRequestProgress
              acceptedTitle={shared("progress.accepted.title")}
              acceptedDate={submittedDate}
              reviewTitle={shared("progress.review.title")}
              reviewStatus={
                isRejected
                  ? rejected("progress.reviewStatus")
                  : shared("progress.review.description")
              }
              reviewDate={accepted("progress.reviewDescription", { date: approvedDate })}
              paymentTitle={shared("progress.payment.title")}
              paymentDescription={
                isPaid
                  ? paid("progress.paymentDescription", { date: paidDate })
                  : isExpired
                    ? expired("progress.paymentDescription", { date: expiredDate })
                    : isAccepted
                      ? accepted("progress.paymentDescription", { date: paymentDueDate })
                      : shared("progress.payment.description", {
                          count: termsSnapshot.paymentTermsDays,
                        })
              }
              paymentStatus={isAccepted ? accepted("progress.paymentStatus") : undefined}
              activeStep={
                isRejected
                  ? "rejected"
                  : isPaid || isExpired
                    ? "complete"
                    : isAccepted
                      ? "payment"
                      : "review"
              }
            />
          }
          highlight={
            isAccepted
              ? {
                  label: accepted("amountDue.label"),
                  value: totalIncludingTax,
                  description: accepted("amountDue.dueDate", { date: paymentDueDate }),
                }
              : isPaid || isExpired
                ? {
                    label: isExpired ? expired("activePeriod.label") : paid("activePeriod.label"),
                    value: subscriptionPeriod,
                    description: isExpired
                      ? expired("activePeriod.description")
                      : paid("activePeriod.description"),
                    compact: true,
                  }
                : undefined
          }
          primaryAction={
            isRejected || isExpired
              ? {
                  label: isExpired ? expired("contactTeam") : rejected("contactTeam"),
                  onClick: () => router.push(getContactRoute()),
                }
              : isPaid
                ? subscription.subscriptionId && !isExpired
                  ? {
                      label: paid("manageSubscription"),
                      onClick: () => {
                        if (
                          subscription.startsAt &&
                          new Date(subscription.startsAt).getTime() > Date.now()
                        ) {
                          toast.info(
                            `${terms("contractStartDate")} : ${formatQuoteDate(subscription.startsAt, locale)}`
                          );
                          return;
                        }

                        router.push(getCollectivitySubscriptionRoute());
                      },
                    }
                  : undefined
                : undefined
          }
          secondaryAction={
            isRejected || isExpired
              ? {
                  label: isExpired ? expired("newQuote") : rejected("newQuote"),
                  onClick: () => router.push(getCollectivityPricingRoute()),
                }
              : undefined
          }
          additionalAction={
            !isAccepted && !isPaid && !isRejected ? (
              <QuoteCancelSubscription
                quoteId={subscription.id}
                labels={{
                  action: shared("cancel.action"),
                  title: shared("cancel.title"),
                  description: shared("cancel.description"),
                  confirm: shared("cancel.confirm"),
                  dismiss: shared("cancel.dismiss"),
                  error: shared("cancel.error"),
                }}
              />
            ) : null
          }
          downloadLabel={shared("download")}
          notice={
            isExpired
              ? expired("notice.footer")
              : isRejected
                ? rejected("notice.footer")
                : isPaid
                  ? paid("notice.footer")
                  : isAccepted
                    ? accepted("paymentNotice")
                    : verification("actions.notice")
          }
          onDownload={() => console.log("collectivityQuotePdfRequested", subscription)}
        />
      </div>
    </div>
  );
}

function getTaxLabel(
  t: ReturnType<typeof useScopedI18n>,
  treatment: PublicCollectivityQuote["pricingSnapshot"]["amounts"]["taxTreatment"]
) {
  if (treatment === "france") return t("tax.france");
  if (treatment === "european_union") return t("tax.europeanUnion");
  return t("tax.outsideEuropeanUnion");
}
