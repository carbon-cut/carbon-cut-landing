"use client";

import {
  FeatherArrowLeft,
  FeatherFileText,
  FeatherInfo,
  FeatherLock,
  FeatherPencil,
  FeatherSend,
} from "@subframe/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useWatch } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import {
  collectivityQueryKeys,
  createCollectivityQuote,
} from "@/app/[locale]/collectivity/_lib/queries";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { getCollectivityPricingQuoteRoute } from "@/lib/routing/routes";
import { formatSubscriptionCurrency, type CreateCollectivityQuoteRequest } from "../_lib/pricing";
import { getTaxTreatment } from "../_lib/taxTreatment";
import {
  formatQuoteAddress,
  formatQuoteDate,
  getQuoteCountryName,
  isEuQuoteCountry,
} from "../_lib/quotePresentation";
import { usePricingFlow } from "../_components/PricingFlowContext";
import ViesVerification from "../_informations/ViesVerification";
import { QuoteReviewCard, QuoteTotalRow } from "../_components/QuoteReviewPrimitives";
import {
  QuoteConfigurationTiles,
  QuoteOfferTable,
  QuoteOfferTotals,
} from "../_components/QuoteOfferReview";
import {
  QuoteClientReviewCard,
  QuoteIssuerReviewCard,
  QuoteTaxTreatmentReviewCard,
  QuoteTermsReviewCard,
} from "../_components/QuoteReviewCards";

export default function PricingVerificationStep() {
  const t = useScopedI18n("collectivityPricing.quoteVerification");
  const taxLabels = useScopedI18n("collectivityPricing.quoteInformation.cards.legalIdentity");
  const termsLabels = useScopedI18n("collectivityPricing.quoteInformation.cards.quoteTerms");
  const pricingLabels = useScopedI18n("collectivityPricing");
  const locale = useCurrentLocale();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { frozenSelection, quoteInformationForm, viesStatus, goToStep, quoteContext } =
    usePricingFlow();
  const values = useWatch({ control: quoteInformationForm.control });
  const quoteMutation = useMutation({ mutationFn: createCollectivityQuote });

  if (!frozenSelection || !quoteContext) return null;

  const { configuration, pricing } = frozenSelection;
  const customer = values.customer ?? quoteInformationForm.getValues("customer");
  const contact = values.contact ?? quoteInformationForm.getValues("contact");
  const contractStartDate = values.quoteTerms?.contractStartDate ?? "";
  const treatment = getTaxTreatment(customer.countryCode, viesStatus);
  const vatAmountCents = treatment === "france" ? Math.round(pricing.contractTotalCents * 0.2) : 0;
  const taxSummary = getTaxSummary(t, treatment);

  function submitQuote() {
    const submittedValues = quoteInformationForm.getValues();
    const submittedCustomer = submittedValues.customer;
    const submittedContact = submittedValues.contact;
    const request: CreateCollectivityQuoteRequest = {
      configuration: {
        communeQuantity: configuration.communes,
        termYears: configuration.term,
        perimeter: configuration.perimeter,
        moduleKeys: configuration.moduleKeys,
      },
      buyer: {
        customerType: submittedValues.customerType,
        legalName: submittedCustomer.legalName,
        addressLine1: submittedCustomer.addressLine1,
        addressLine2: submittedCustomer.addressLine2 || undefined,
        postalCode: submittedCustomer.postalCode,
        city: submittedCustomer.city,
        countryCode: submittedCustomer.countryCode,
        siren: submittedCustomer.siren || undefined,
        siret: submittedCustomer.siret || undefined,
        vatNumber: submittedCustomer.vatNumber || undefined,
        hasNoVatNumber: submittedCustomer.hasNoVatNumber ?? false,
        contact: {
          name: submittedContact.name,
          email: submittedContact.email,
          phone: submittedContact.phone || undefined,
        },
      },
      requestedContractStartDate: submittedValues.quoteTerms.contractStartDate,
    };

    quoteMutation.mutate(request, {
      onSuccess: (quote) => {
        queryClient.setQueryData(collectivityQueryKeys.latestQuote(), quote);
        router.push(getCollectivityPricingQuoteRoute(quote.id));
      },
    });
  }

  return (
    <div className="flex w-full flex-col items-start gap-8 mobile:gap-6">
      <header className="flex w-full flex-col items-start gap-6">
        <Button
          type="button"
          variant="neutral-tertiary"
          size="small"
          icon={<FeatherArrowLeft />}
          onClick={() => goToStep("informations")}
        >
          {t("backToInformation")}
        </Button>
        <div className="flex w-full flex-col items-start gap-2">
          <Typography asChild variant="heading1" className="text-default-font">
            <h1>{t("title")}</h1>
          </Typography>
          <Typography asChild variant="bodySubframe" className="max-w-[720px] text-subtext-color">
            <p>{t("description")}</p>
          </Typography>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Badge variant="neutral">
              <FeatherFileText className="size-3" aria-hidden="true" />
              {t("draft")}
            </Badge>
            <Typography variant="captionSubframe" className="text-subtext-color">
              {t("draftHint")}
            </Typography>
          </div>
        </div>
      </header>

      <div className="flex w-full items-start gap-8 mobile:flex-col mobile:gap-6">
        <main className="flex min-w-0 grow shrink-0 basis-0 flex-col items-start gap-6 mobile:flex-none">
          <QuoteClientReviewCard
            title={t("client.title")}
            action={<EditAction label={t("edit")} onClick={() => goToStep("informations")} />}
            entries={[
              { label: taxLabels("legalName"), value: customer.legalName },
              { label: taxLabels("customerType"), value: taxLabels("legalEntity") },
              { label: taxLabels("addressLine1"), value: formatQuoteAddress(customer) },
              {
                label: taxLabels("countryCode"),
                value: getQuoteCountryName(customer.countryCode, locale),
              },
              ...(customer.countryCode === "FRA"
                ? [
                    { label: taxLabels("siren"), value: customer.siren },
                    { label: taxLabels("siret"), value: customer.siret },
                  ]
                : []),
              customer.vatNumber
                ? {
                    label: isEuQuoteCountry(customer.countryCode)
                      ? taxLabels("vatNumber")
                      : taxLabels("generalTaxIdentifier"),
                    value: customer.vatNumber,
                    detail: isEuQuoteCountry(customer.countryCode) ? (
                      <ViesVerification
                        status={viesStatus}
                        labels={{
                          notChecked: taxLabels("viesNotChecked"),
                          checking: taxLabels("viesChecking"),
                          verified: taxLabels("viesVerified"),
                          invalid: taxLabels("viesInvalid"),
                          unavailable: taxLabels("viesUnavailable"),
                        }}
                      />
                    ) : undefined,
                  }
                : { label: taxLabels("generalTaxIdentifier"), value: taxLabels("hasNoVatNumber") },
              { label: taxLabels("contact"), value: contact.name },
              { label: taxLabels("contactEmail"), value: contact.email },
              ...(contact.phone
                ? [{ label: taxLabels("contactPhone"), value: contact.phone }]
                : []),
            ]}
          />

          <QuoteReviewCard
            title={t("offer.title")}
            action={
              <EditAction label={t("offer.edit")} onClick={() => goToStep("configuration")} />
            }
          >
            <QuoteConfigurationTiles
              communeQuantity={configuration.communes}
              termYears={configuration.term}
              perimeter={configuration.perimeter}
            />
            <QuoteOfferTable modules={pricing.modules} communeQuantity={configuration.communes} />
            <QuoteOfferTotals
              annualSubtotalCents={pricing.baseAnnualTotalCents}
              discountBasisPoints={pricing.discountBasisPoints}
              discountAmountCents={pricing.discountAmountCents}
              annualTotalCents={pricing.annualTotalCents}
              contractTotalCents={pricing.contractTotalCents}
              termYears={configuration.term}
            />
          </QuoteReviewCard>

          <QuoteTermsReviewCard
            title={termsLabels("title")}
            action={<EditAction label={t("edit")} onClick={() => goToStep("informations")} />}
            entries={[
              {
                label: termsLabels("currency"),
                value:
                  quoteContext.currency === "EUR"
                    ? termsLabels("currencyEur")
                    : quoteContext.currency,
              },
              {
                label: termsLabels("contractStartDate"),
                value: formatQuoteDate(contractStartDate, locale),
              },
              {
                label: t("terms.validity"),
                value: t("terms.validityValue", { count: quoteContext.quoteValidityDays }),
              },
              {
                label: termsLabels("paymentTerms"),
                value: termsLabels("paymentTermsValue", {
                  count: quoteContext.paymentTermsDays,
                }),
              },
              {
                label: termsLabels("paymentMethod"),
                value: termsLabels("bankTransfer"),
              },
            ]}
          />

          <QuoteTaxTreatmentReviewCard
            title={t("tax.title")}
            label={taxSummary.label}
            quoteMentionLabel={t("tax.quoteMention")}
            quoteMention={taxSummary.mention}
            action={<EditAction label={t("tax.edit")} onClick={() => goToStep("informations")} />}
          />

          <QuoteIssuerReviewCard
            title={t("issuer.title")}
            description={t("issuer.description")}
            entries={[
              { label: taxLabels("legalName"), value: quoteContext.issuer.legalName },
              { label: t("issuer.registeredOffice"), value: quoteContext.issuer.registeredOffice },
              { label: taxLabels("siren"), value: quoteContext.issuer.siren },
              { label: t("issuer.rcs"), value: quoteContext.issuer.rcs },
              { label: taxLabels("vatNumber"), value: quoteContext.issuer.vatNumber ?? undefined },
            ]}
          />
        </main>

        <VerificationSidebar
          annualTotalCents={pricing.annualTotalCents}
          contractTotalCents={pricing.contractTotalCents}
          vatAmountCents={vatAmountCents}
          years={configuration.term}
          paymentTermsDays={quoteContext.paymentTermsDays}
          isSubmitting={quoteMutation.isPending}
          onSubmit={submitQuote}
          onBack={() => goToStep("informations")}
          t={t}
          pricingLabels={pricingLabels}
        />
      </div>
    </div>
  );
}

function EditAction({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Button
      type="button"
      variant="neutral-tertiary"
      size="small"
      icon={<FeatherPencil />}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

function TotalRow({
  label,
  value,
  success = false,
}: {
  label: string;
  value: string;
  success?: boolean;
}) {
  return <QuoteTotalRow label={label} value={value} success={success} />;
}

function VerificationSidebar({
  annualTotalCents,
  contractTotalCents,
  vatAmountCents,
  years,
  paymentTermsDays,
  isSubmitting,
  onSubmit,
  onBack,
  t,
  pricingLabels,
}: {
  annualTotalCents: number;
  contractTotalCents: number;
  vatAmountCents: number;
  years: number;
  paymentTermsDays: number;
  isSubmitting: boolean;
  onSubmit: () => void;
  onBack: () => void;
  t: ReturnType<typeof useScopedI18n>;
  pricingLabels: ReturnType<typeof useScopedI18n>;
}) {
  const locale = useCurrentLocale();
  const totalIncludingVat = contractTotalCents + vatAmountCents;
  return (
    <aside className="sticky top-6 flex w-96 flex-none mobile:static mobile:w-full">
      <Card className="flex w-full flex-col items-start gap-5 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-md mobile:px-4 mobile:py-4">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FeatherLock
              className="text-heading-3 font-heading-3 text-brand-600"
              aria-hidden="true"
            />
            <CardTitle asChild>
              <h2>{t("sidebar.title")}</h2>
            </CardTitle>
          </div>
          <Badge variant="neutral">
            <FeatherLock className="size-3" aria-hidden="true" />
            {t("sidebar.frozen")}
          </Badge>
        </div>
        <dl className="flex w-full flex-col items-start gap-3">
          <TotalRow
            label={pricingLabels("summary.annualTotal")}
            value={formatSubscriptionCurrency(annualTotalCents, locale)}
          />
          <TotalRow
            label={pricingLabels("summary.duration")}
            value={
              years === 1
                ? pricingLabels("configuration.term.oneYear")
                : pricingLabels("configuration.term.threeYears")
            }
          />
        </dl>
        <div className="h-px w-full bg-neutral-border" />
        <dl className="flex w-full flex-col items-start gap-3">
          <TotalRow
            label={t("sidebar.totalHt")}
            value={formatSubscriptionCurrency(contractTotalCents, locale)}
          />
          <TotalRow
            label={t("sidebar.vat")}
            value={formatSubscriptionCurrency(vatAmountCents, locale)}
          />
        </dl>
        <div className="h-px w-full bg-neutral-border" />
        <div className="flex w-full flex-col items-start gap-1">
          <Typography variant="captionBold" className="text-subtext-color">
            {t("sidebar.totalTtc")}
          </Typography>
          <Typography variant="heading1" className="text-default-font">
            {formatSubscriptionCurrency(totalIncludingVat, locale)}
          </Typography>
          <Typography variant="captionSubframe" className="text-subtext-color">
            {t("sidebar.totalTtcDescription", { years })}
          </Typography>
        </div>
        <div className="h-px w-full bg-neutral-border" />
        <section className="flex w-full flex-col items-start gap-3">
          <Typography asChild variant="bodyBold" className="text-default-font">
            <h3>{t("afterAcceptance.title")}</h3>
          </Typography>
          <div className="flex w-full flex-col gap-3">
            <AcceptanceStep
              number="1"
              title={t("afterAcceptance.acceptance.title")}
              description={t("afterAcceptance.acceptance.description")}
              active
            />
            <AcceptanceStep
              number="2"
              title={t("afterAcceptance.review.title")}
              description={t("afterAcceptance.review.description")}
            />
            <AcceptanceStep
              number="3"
              title={t("afterAcceptance.payment.title")}
              description={t("afterAcceptance.payment.description", {
                count: paymentTermsDays,
              })}
            />
          </div>
        </section>
        <div className="flex w-full flex-col gap-2">
          <Button
            type="button"
            className="h-10 w-full"
            variant="brand-primary"
            size="large"
            icon={<FeatherSend />}
            onClick={onSubmit}
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {t("actions.accept")}
          </Button>
          <Button
            type="button"
            className="h-10 w-full"
            variant="neutral-secondary"
            size="large"
            icon={<FeatherArrowLeft />}
            onClick={onBack}
          >
            {t("actions.back")}
          </Button>
        </div>
        <div className="flex w-full items-start gap-2 rounded-sm border border-solid border-neutral-border bg-neutral-50 px-3 py-3">
          <FeatherInfo className="text-body font-body text-subtext-color" aria-hidden="true" />
          <Typography variant="captionBold" className="text-default-font">
            {t("actions.notice")}
          </Typography>
        </div>
      </Card>
    </aside>
  );
}

function AcceptanceStep({
  number,
  title,
  description,
  active = false,
}: {
  number: string;
  title: string;
  description: string;
  active?: boolean;
}) {
  return (
    <div className="flex w-full items-start gap-3">
      <div
        className={`flex h-6 w-6 flex-none items-center justify-center rounded-full ${active ? "bg-brand-100" : "bg-neutral-100"}`}
      >
        <Typography
          variant="captionBold"
          className={active ? "text-brand-700" : "text-subtext-color"}
        >
          {number}
        </Typography>
      </div>
      <div className="flex min-w-0 flex-col gap-0.5">
        <Typography variant="bodyBold" className="text-default-font">
          {title}
        </Typography>
        <Typography variant="captionSubframe" className="text-subtext-color">
          {description}
        </Typography>
      </div>
    </div>
  );
}

function getTaxSummary(
  t: ReturnType<typeof useScopedI18n>,
  treatment: ReturnType<typeof getTaxTreatment>
) {
  if (treatment === "france") return { label: t("tax.france"), mention: t("tax.franceMention") };
  if (treatment === "europeanUnion")
    return { label: t("tax.europeanUnion"), mention: t("tax.europeanUnionMention") };
  return { label: t("tax.outsideEuropeanUnion"), mention: t("tax.outsideEuropeanUnionMention") };
}
