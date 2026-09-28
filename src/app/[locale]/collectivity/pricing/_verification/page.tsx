"use client";

import {
  FeatherArrowLeft,
  FeatherCalendarRange,
  FeatherFileText,
  FeatherInfo,
  FeatherLock,
  FeatherMap,
  FeatherMapPin,
  FeatherPencil,
  FeatherQuote,
  FeatherSend,
  FeatherShieldCheck,
} from "@subframe/core";
import { useWatch } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import countries from "../_lib/countries.json";
import issuer from "../_lib/issuer.json";
import quoteTerms from "../_lib/quoteTerms.json";
import {
  formatSubscriptionCurrency,
  formatSubscriptionLabel,
  type PricedModule,
} from "../_lib/pricing";
import { getTaxTreatment } from "../_lib/taxTreatment";
import { usePricingFlow } from "../_components/PricingFlowContext";
import ViesVerification from "../_informations/ViesVerification";

export default function PricingVerificationStep() {
  const t = useScopedI18n("collectivityPricing.quoteVerification");
  const taxLabels = useScopedI18n("collectivityPricing.quoteInformation.cards.legalIdentity");
  const termsLabels = useScopedI18n("collectivityPricing.quoteInformation.cards.quoteTerms");
  const pricingLabels = useScopedI18n("collectivityPricing");
  const locale = useCurrentLocale();
  const { frozenSelection, quoteInformationForm, viesStatus, goToStep } = usePricingFlow();
  const values = useWatch({ control: quoteInformationForm.control });

  if (!frozenSelection) return null;

  const { configuration, pricing } = frozenSelection;
  const customer = values.customer ?? quoteInformationForm.getValues("customer");
  const contact = values.contact ?? quoteInformationForm.getValues("contact");
  const contractStartDate = values.quoteTerms?.contractStartDate ?? "";
  const treatment = getTaxTreatment(customer.countryCode, viesStatus);
  const vatAmountCents = treatment === "france" ? Math.round(pricing.contractTotalCents * 0.2) : 0;
  const taxSummary = getTaxSummary(t, treatment);

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
          <ReviewCard
            title={t("client.title")}
            onEdit={() => goToStep("informations")}
            editLabel={t("edit")}
          >
            <ReviewGrid>
              <ReviewValue label={taxLabels("legalName")} value={customer.legalName} />
              <ReviewValue label={taxLabels("customerType")} value={taxLabels("legalEntity")} />
              <ReviewValue label={taxLabels("addressLine1")} value={formatAddress(customer)} />
              <ReviewValue
                label={taxLabels("countryCode")}
                value={getCountryName(customer.countryCode, locale)}
              />
              {customer.countryCode === "FRA" ? (
                <>
                  <ReviewValue label={taxLabels("siren")} value={customer.siren} />
                  <ReviewValue label={taxLabels("siret")} value={customer.siret} />
                </>
              ) : null}
              {customer.vatNumber ? (
                <ReviewValue
                  label={
                    isEuCountry(customer.countryCode)
                      ? taxLabels("vatNumber")
                      : taxLabels("generalTaxIdentifier")
                  }
                  value={customer.vatNumber}
                  detail={
                    isEuCountry(customer.countryCode) ? (
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
                    ) : undefined
                  }
                />
              ) : (
                <ReviewValue
                  label={taxLabels("generalTaxIdentifier")}
                  value={taxLabels("hasNoVatNumber")}
                />
              )}
              <ReviewValue label={taxLabels("contact")} value={contact.name} />
              <ReviewValue label={taxLabels("contactEmail")} value={contact.email} />
              {contact.phone ? (
                <ReviewValue label={taxLabels("contactPhone")} value={contact.phone} />
              ) : null}
            </ReviewGrid>
          </ReviewCard>

          <ReviewCard
            title={t("offer.title")}
            onEdit={() => goToStep("configuration")}
            editLabel={t("offer.edit")}
          >
            <div className="flex w-full items-stretch gap-3 mobile:flex-col">
              <OfferTile
                icon={<FeatherMapPin />}
                label={pricingLabels("summary.communes")}
                value={String(configuration.communes)}
              />
              <OfferTile
                icon={<FeatherCalendarRange />}
                label={pricingLabels("summary.duration")}
                value={
                  configuration.term === 1
                    ? pricingLabels("configuration.term.oneYear")
                    : pricingLabels("configuration.term.threeYears")
                }
              />
              <OfferTile
                icon={<FeatherMap />}
                label={pricingLabels("summary.perimeter")}
                value={formatPerimeter(pricingLabels, configuration.perimeter)}
              />
            </div>
            <SelectedModulesTable
              modules={pricing.modules}
              communes={configuration.communes}
              t={t}
              pricingLabels={pricingLabels}
            />
            <OfferTotals
              pricing={pricing}
              years={configuration.term}
              t={t}
              pricingLabels={pricingLabels}
            />
          </ReviewCard>

          <ReviewCard
            title={termsLabels("title")}
            onEdit={() => goToStep("informations")}
            editLabel={t("edit")}
          >
            <ReviewGrid>
              <ReviewValue label={termsLabels("currency")} value={termsLabels("currencyEur")} />
              <ReviewValue
                label={termsLabels("contractStartDate")}
                value={formatDate(contractStartDate, locale)}
              />
              <ReviewValue
                label={t("terms.validity")}
                value={t("terms.validityValue", { count: quoteTerms.quoteValidityDays })}
              />
              <ReviewValue
                label={termsLabels("paymentTerms")}
                value={termsLabels("paymentTermsValue", { count: quoteTerms.paymentTermsDays })}
              />
              <ReviewValue
                label={termsLabels("paymentMethod")}
                value={termsLabels("bankTransfer")}
              />
            </ReviewGrid>
          </ReviewCard>

          <ReviewCard
            title={t("tax.title")}
            onEdit={() => goToStep("informations")}
            editLabel={t("tax.edit")}
          >
            <div className="flex w-full flex-col items-start gap-3 rounded-sm border border-solid border-brand-200 bg-brand-50 px-4 py-4">
              <div className="flex w-full items-center gap-3">
                <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand-100">
                  <FeatherShieldCheck
                    className="text-heading-3 font-heading-3 text-brand-700"
                    aria-hidden="true"
                  />
                </div>
                <Typography variant="heading3" className="text-default-font">
                  {taxSummary.label}
                </Typography>
              </div>
              <div className="flex w-full items-start gap-2 border-t border-solid border-brand-200 pt-3">
                <FeatherQuote className="text-body font-body text-neutral-400" aria-hidden="true" />
                <div className="flex min-w-0 grow flex-col items-start gap-1">
                  <Typography variant="captionBold" className="text-brand-800">
                    {t("tax.quoteMention")}
                  </Typography>
                  <Typography variant="bodySubframe" className="text-default-font">
                    {taxSummary.mention}
                  </Typography>
                </div>
              </div>
            </div>
          </ReviewCard>

          <ReviewCard title={t("issuer.title")}>
            <CardDescription>{t("issuer.description")}</CardDescription>
            <ReviewGrid>
              <ReviewValue label={taxLabels("legalName")} value={issuer.legalName} />
              <ReviewValue label={t("issuer.registeredOffice")} value={issuer.registeredOffice} />
              <ReviewValue label={taxLabels("siren")} value={issuer.siren} />
              <ReviewValue label={t("issuer.rcs")} value={issuer.rcs} />
              <ReviewValue label={taxLabels("vatNumber")} value={issuer.vatNumber} />
            </ReviewGrid>
          </ReviewCard>
        </main>

        <VerificationSidebar
          annualTotalCents={pricing.annualTotalCents}
          contractTotalCents={pricing.contractTotalCents}
          vatAmountCents={vatAmountCents}
          years={configuration.term}
          onBack={() => goToStep("informations")}
          t={t}
          pricingLabels={pricingLabels}
        />
      </div>
    </div>
  );
}

function ReviewCard({
  title,
  children,
  onEdit,
  editLabel,
}: {
  title: string;
  children: React.ReactNode;
  onEdit?: () => void;
  editLabel?: string;
}) {
  return (
    <Card className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm mobile:px-4 mobile:py-4">
      <div className="flex w-full items-start justify-between gap-4 mobile:flex-col mobile:gap-2">
        <CardTitle asChild>
          <h2>{title}</h2>
        </CardTitle>
        {onEdit && editLabel ? (
          <Button
            type="button"
            variant="neutral-tertiary"
            size="small"
            icon={<FeatherPencil />}
            onClick={onEdit}
          >
            {editLabel}
          </Button>
        ) : null}
      </div>
      {children}
    </Card>
  );
}

function ReviewGrid({ children }: { children: React.ReactNode }) {
  return (
    <dl className="grid w-full grid-cols-2 items-start gap-x-6 gap-y-5 mobile:grid-cols-1">
      {children}
    </dl>
  );
}

function ReviewValue({
  label,
  value,
  detail,
}: {
  label: string;
  value?: string;
  detail?: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col items-start gap-1">
      <Typography asChild variant="captionSubframe" className="text-subtext-color">
        <dt>{label}</dt>
      </Typography>
      <Typography asChild variant="bodyBold" className="break-words text-default-font">
        <dd>{value || "—"}</dd>
      </Typography>
      {detail ? <div className="pt-1">{detail}</div> : null}
    </div>
  );
}

function OfferTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex grow basis-0 items-center gap-3 rounded-sm bg-neutral-50 px-4 py-3">
      <span className="text-heading-3 font-heading-3 text-brand-600" aria-hidden="true">
        {icon}
      </span>
      <div className="flex min-w-0 flex-col items-start gap-0.5">
        <Typography variant="captionSubframe" className="text-subtext-color">
          {label}
        </Typography>
        <Typography variant="bodyBold" className="text-default-font">
          {value}
        </Typography>
      </div>
    </div>
  );
}

function SelectedModulesTable({
  modules,
  communes,
  t,
  pricingLabels,
}: {
  modules: PricedModule[];
  communes: number;
  t: ReturnType<typeof useScopedI18n>;
  pricingLabels: ReturnType<typeof useScopedI18n>;
}) {
  return (
    <div className="w-full overflow-x-auto rounded-sm border border-solid border-neutral-border">
      <div className="min-w-[640px]">
        <div className="grid grid-cols-[minmax(0,1fr)_7rem_9rem_9rem] gap-4 border-b border-solid border-neutral-border bg-neutral-50 px-4 py-2">
          {(["service", "quantity", "annualUnitPrice", "annualAmount"] as const).map((key) => (
            <Typography
              key={key}
              variant="captionBold"
              className={`text-subtext-color ${key.includes("Price") || key === "annualAmount" ? "text-right" : ""}`}
            >
              {t(`offer.table.${key}`)}
            </Typography>
          ))}
        </div>
        {modules.map((module, index) => (
          <div
            key={module.key}
            className={`grid grid-cols-[minmax(0,1fr)_7rem_9rem_9rem] items-center gap-4 px-4 py-3 ${index < modules.length - 1 ? "border-b border-solid border-neutral-border" : ""}`}
          >
            <Typography variant="bodyBold" className="text-default-font">
              {getModuleLabel(pricingLabels, module.key)}
            </Typography>
            <Typography variant="bodySubframe" className="text-subtext-color">
              {t("offer.communesValue", { count: communes })}
            </Typography>
            <Typography variant="bodySubframe" className="text-right text-default-font">
              {formatSubscriptionCurrency(module.annualUnitAmountCents)}
            </Typography>
            <Typography variant="bodyBold" className="text-right text-default-font">
              {formatSubscriptionCurrency(module.annualAmountCents)}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

function OfferTotals({
  pricing,
  years,
  t,
  pricingLabels,
}: {
  pricing: {
    baseAnnualTotalCents: number;
    discountBasisPoints: number;
    discountAmountCents: number;
    annualTotalCents: number;
    contractTotalCents: number;
  };
  years: number;
  t: ReturnType<typeof useScopedI18n>;
  pricingLabels: ReturnType<typeof useScopedI18n>;
}) {
  return (
    <dl className="ml-auto flex w-full max-w-md flex-col items-start gap-3">
      <TotalRow
        label={pricingLabels("summary.annualSubtotal")}
        value={formatSubscriptionCurrency(pricing.baseAnnualTotalCents)}
      />
      {pricing.discountBasisPoints > 0 ? (
        <TotalRow
          label={t("offer.discount", { discount: pricing.discountBasisPoints / 100 })}
          value={`−${formatSubscriptionCurrency(pricing.discountAmountCents)}`}
          success
        />
      ) : null}
      <TotalRow
        label={t("offer.annualAfterDiscount")}
        value={`${formatSubscriptionCurrency(pricing.annualTotalCents)} HT`}
      />
      <div className="flex w-full items-center justify-between gap-4 rounded-sm bg-brand-50 px-4 py-3">
        <Typography variant="bodyBold" className="text-brand-800">
          {pricingLabels("summary.contractTotal", { years })}
        </Typography>
        <Typography variant="heading3" className="whitespace-nowrap text-brand-800">
          {formatSubscriptionCurrency(pricing.contractTotalCents)} HT
        </Typography>
      </div>
    </dl>
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
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <Typography asChild variant="bodySubframe" className="text-subtext-color">
        <dt>{label}</dt>
      </Typography>
      <Typography
        asChild
        variant="bodyBold"
        className={`whitespace-nowrap ${success ? "text-success-600" : "text-default-font"}`}
      >
        <dd>{value}</dd>
      </Typography>
    </div>
  );
}

function VerificationSidebar({
  annualTotalCents,
  contractTotalCents,
  vatAmountCents,
  years,
  onBack,
  t,
  pricingLabels,
}: {
  annualTotalCents: number;
  contractTotalCents: number;
  vatAmountCents: number;
  years: number;
  onBack: () => void;
  t: ReturnType<typeof useScopedI18n>;
  pricingLabels: ReturnType<typeof useScopedI18n>;
}) {
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
            value={formatSubscriptionCurrency(annualTotalCents)}
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
            value={formatSubscriptionCurrency(contractTotalCents)}
          />
          <TotalRow label={t("sidebar.vat")} value={formatSubscriptionCurrency(vatAmountCents)} />
        </dl>
        <div className="h-px w-full bg-neutral-border" />
        <div className="flex w-full flex-col items-start gap-1">
          <Typography variant="captionBold" className="text-subtext-color">
            {t("sidebar.totalTtc")}
          </Typography>
          <Typography variant="heading1" className="text-default-font">
            {formatSubscriptionCurrency(totalIncludingVat)}
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
                count: quoteTerms.paymentTermsDays,
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
            onClick={() => undefined}
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

function getCountryName(countryCode: string | undefined, locale: string) {
  const country = countries.find((candidate) => candidate.alpha3 === countryCode);
  return country
    ? (new Intl.DisplayNames([locale], { type: "region" }).of(country.alpha2) ?? country.alpha3)
    : "—";
}
function formatAddress(customer: {
  addressLine1?: string;
  addressLine2?: string;
  postalCode?: string;
  city?: string;
}) {
  return [
    customer.addressLine1,
    customer.addressLine2,
    [customer.postalCode, customer.city].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(", ");
}
function formatDate(value: string, locale: string) {
  return value ? new Date(`${value}T00:00:00`).toLocaleDateString(locale) : "—";
}
function isEuCountry(countryCode: string | undefined) {
  return countries.some((country) => country.alpha3 === countryCode && country.isEuMember);
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
function formatPerimeter(t: ReturnType<typeof useScopedI18n>, perimeter: string) {
  if (perimeter === "patrimoine_communal") return t("configuration.perimeter.municipal_assets");
  if (perimeter === "territorial_communes") return t("configuration.perimeter.whole_territory");
  return formatSubscriptionLabel(perimeter);
}
function getModuleLabel(t: ReturnType<typeof useScopedI18n>, key: string) {
  const translationKeys: Record<string, string> = {
    ghg_inventory_scope_1_2: "ghg_inventory_scope_1_2",
    ghg_inventory_scope_3: "ghg_inventory_scope_3",
    emission_factor_consolidation: "emission_factor_consolidation",
    prospective_objectives: "prospective_and_objectives",
    ghg_mitigation_investment_plan: "ghg_mitigation_investment_plan",
    mrv_tracking: "mrv_monitoring",
    significant_indicators: "significant_indicators",
    scoring_100: "scoring_system",
    intermunicipal_aggregation: "commune_aggregation",
  };
  const translationKey = translationKeys[key];
  return translationKey ? t(`modules.items.${translationKey}`) : formatSubscriptionLabel(key);
}
