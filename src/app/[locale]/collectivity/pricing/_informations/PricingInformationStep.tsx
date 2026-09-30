"use client";

import { useMutation } from "@tanstack/react-query";
import {
  FeatherArrowLeft,
  FeatherArrowRight,
  FeatherCheckCircle2,
  FeatherInfo,
  FeatherLock,
} from "@subframe/core";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/forms";
import RadioCardGroup from "@/components/ui/radio-card-group";
import Typography from "@/components/ui/typography";
import InventoryFieldInput from "@/app/[locale]/collectivity/_components/fields/InventoryFieldInput";
import { InventoryFieldCheckbox } from "@/app/[locale]/collectivity/_components/fields/InventoryFieldCheckbox";
import { InventoryFieldSelect } from "@/app/[locale]/collectivity/_components/fields/InventoryFieldSelect";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import countries from "../_lib/countries.json";
import { getViesCountryCode, isEuMemberCountry } from "../_lib/countryRules";
import type { QuoteInformationInput } from "../_lib/infoSchema";
import type { PricingConfiguration, PricedSelection } from "../_lib/pricing";
import { validateViesVatNumber } from "../_lib/queries";
import type { ViesStatus } from "../_lib/taxTreatment";
import SelectedOfferSummaryContent from "../_components/SelectedOfferSummaryContent";
import { usePricingFlow } from "../_components/PricingFlowContext";
import TaxTreatment from "./TaxTreatment";
import ViesVerification from "./ViesVerification";
import QuoteTerms from "./QuoteTerms";

export default function PricingInformationStep() {
  const t = useScopedI18n("collectivityPricing.quoteInformation.cards");
  const {
    frozenSelection,
    goToStep,
    quoteInformationForm: form,
    viesStatus,
    setViesStatus,
    quoteContext,
  } = usePricingFlow();

  if (!quoteContext) return null;

  return (
    <Form {...form}>
      <form
        className="flex w-full items-start gap-8 mobile:flex-col mobile:gap-6"
        onSubmit={handleSubmit}
      >
        <section className="flex min-w-0 grow shrink-0 basis-0 flex-col items-start gap-6 mobile:flex-none">
          <LegalIdentityCard form={form} onViesStatusChange={setViesStatus} />
          <QuoteTerms form={form} quoteContext={quoteContext} />
        </section>
        {frozenSelection ? (
          <FrozenOfferSidebar
            form={form}
            viesStatus={viesStatus}
            configuration={frozenSelection.configuration}
            pricing={frozenSelection.pricing}
            onBack={() => goToStep("configuration")}
          />
        ) : null}
      </form>
    </Form>
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isValid = await form.trigger();
    const values = form.getValues();
    const hasVatNumber = Boolean(values.customer.vatNumber?.trim());
    const requiresViesVerification = isEuMemberCountry(values.customer.countryCode) && hasVatNumber;
    const viesReady =
      !requiresViesVerification || viesStatus === "verified" || viesStatus === "unavailable";

    if (!viesReady) {
      form.setError("customer.vatNumber", {
        type: "vies",
        message:
          viesStatus === "invalid"
            ? t("legalIdentity.viesInvalidMessage")
            : t("legalIdentity.viesNotChecked"),
      });
    }

    if (isValid && viesReady) goToStep("verification");
  }
}

function FrozenOfferSidebar({
  form,
  viesStatus,
  configuration,
  pricing,
  onBack,
}: {
  form: ReturnType<typeof useForm<QuoteInformationInput>>;
  viesStatus: ViesStatus;
  configuration: PricingConfiguration;
  pricing: PricedSelection;
  onBack: () => void;
}) {
  const t = useScopedI18n("collectivityPricing.quoteInformation.cards.selectedOffer");
  const values = useWatch({ control: form.control });
  const customer = values.customer ?? form.getValues("customer");
  const contact = values.contact ?? form.getValues("contact");
  const quoteTerms = values.quoteTerms ?? form.getValues("quoteTerms");
  const isFrance = customer.countryCode === "FRA";
  const isEuExceptFrance = isEuMemberCountry(customer.countryCode) && !isFrance;
  const hasVatNumber = Boolean(customer.vatNumber?.trim());
  const requiresViesVerification = isEuMemberCountry(customer.countryCode) && hasVatNumber;
  const viesReady =
    !requiresViesVerification || viesStatus === "verified" || viesStatus === "unavailable";
  const identityComplete = Boolean(
    customer.legalName?.trim() && contact.name?.trim() && contact.email?.trim()
  );
  const addressComplete = Boolean(
    customer.addressLine1?.trim() &&
    customer.postalCode?.trim() &&
    customer.city?.trim() &&
    customer.countryCode
  );
  const fiscalComplete = isFrance
    ? Boolean(customer.siren?.trim() && customer.siret?.trim() && viesReady)
    : isEuExceptFrance
      ? Boolean(customer.vatNumber?.trim() && viesReady)
      : Boolean(customer.vatNumber?.trim() || customer.hasNoVatNumber);
  const contractDateComplete = Boolean(quoteTerms.contractStartDate);

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
              <h2>{t("title")}</h2>
            </CardTitle>
          </div>
          <Badge variant="neutral">
            <FeatherLock className="size-3" aria-hidden="true" />
            {t("frozen")}
          </Badge>
        </div>

        <SelectedOfferSummaryContent
          configuration={configuration}
          pricing={pricing}
          showModuleBreakdown
        />

        <div className="h-px w-full flex-none bg-neutral-border" />

        <section
          className="flex w-full flex-col items-start gap-3"
          aria-labelledby="quote-checklist"
        >
          <Typography asChild variant="bodyBold" className="text-default-font">
            <h3 id="quote-checklist">{t("checklistTitle")}</h3>
          </Typography>
          <div className="flex w-full flex-col items-start gap-2">
            <ChecklistItem complete={identityComplete} label={t("checklistIdentity")} />
            <ChecklistItem complete={addressComplete} label={t("checklistAddress")} />
            <ChecklistItem complete={fiscalComplete} label={t("checklistTax")} />
            <ChecklistItem complete={contractDateComplete} label={t("checklistDates")} />
            <ChecklistItem complete label={t("checklistTerms")} />
          </div>
        </section>

        <div className="flex w-full flex-col items-start gap-2">
          <Button
            type="submit"
            className="h-10 w-full flex-none"
            variant="brand-primary"
            size="large"
            iconRight={<FeatherArrowRight />}
          >
            {t("continue")}
          </Button>
          <Button
            type="button"
            className="h-10 w-full flex-none"
            variant="neutral-secondary"
            size="large"
            icon={<FeatherArrowLeft />}
            onClick={onBack}
          >
            {t("back")}
          </Button>
        </div>

        <div className="flex w-full items-center gap-2">
          <FeatherInfo
            className="text-caption font-caption text-subtext-color"
            aria-hidden="true"
          />
          <Typography variant="captionSubframe" className="text-subtext-color">
            {t("notice")}
          </Typography>
        </div>
      </Card>
    </aside>
  );
}

function ChecklistItem({ complete, label }: { complete: boolean; label: string }) {
  const Icon = complete ? FeatherCheckCircle2 : Circle;

  return (
    <div className="flex w-full items-center gap-2">
      <Icon
        className={complete ? "text-body font-body text-success-600" : "size-4 text-neutral-400"}
        aria-hidden="true"
      />
      <Typography
        variant="bodySubframe"
        className={complete ? "text-default-font" : "text-subtext-color"}
      >
        {label}
      </Typography>
    </div>
  );
}

function LegalIdentityCard({
  form,
  onViesStatusChange,
}: {
  form: ReturnType<typeof useForm<QuoteInformationInput>>;
  onViesStatusChange: (status: ViesStatus) => void;
}) {
  const t = useScopedI18n("collectivityPricing.quoteInformation.cards.legalIdentity");
  const locale = useCurrentLocale();
  const countryCode = useWatch({ control: form.control, name: "customer.countryCode" });
  const vatNumber = useWatch({ control: form.control, name: "customer.vatNumber" });
  const isFrance = countryCode === "FRA";
  const isEuCountry = isEuMemberCountry(countryCode);
  const isEuExceptFrance = isEuCountry && !isFrance;
  const viesCountryCode = getViesCountryCode(countryCode);
  const normalizedVatNumber = normalizeVatNumber(vatNumber, viesCountryCode);
  const currentViesInput = `${viesCountryCode ?? ""}:${normalizedVatNumber}`;
  const currentViesInputRef = useRef(currentViesInput);
  const viesMutation = useMutation({ mutationFn: validateViesVatNumber });
  const { mutate: validateWithVies, reset: resetViesValidation } = viesMutation;

  useEffect(() => {
    currentViesInputRef.current = currentViesInput;
    resetViesValidation();

    if (form.getFieldState("customer.vatNumber").error?.type === "vies") {
      form.clearErrors("customer.vatNumber");
    }
  }, [currentViesInput, form, resetViesValidation]);

  useEffect(() => {
    if (isEuExceptFrance && form.getValues("customer.hasNoVatNumber")) {
      form.setValue("customer.hasNoVatNumber", false, { shouldDirty: true, shouldValidate: true });
    }
  }, [form, isEuExceptFrance]);

  const validateVatNumber = useCallback(() => {
    if (!isEuCountry || !viesCountryCode || !normalizedVatNumber) return;

    const request = { countryCode: viesCountryCode, vatNumber: normalizedVatNumber };
    const requestKey = `${request.countryCode}:${request.vatNumber}`;

    if (form.getFieldState("customer.vatNumber").error?.type === "vies") {
      form.clearErrors("customer.vatNumber");
    }

    validateWithVies(request, {
      onSuccess: (result) => {
        if (currentViesInputRef.current !== requestKey) return;

        if (result.status === "invalid") {
          form.setError("customer.vatNumber", { type: "vies", message: t("viesInvalidMessage") });
        }
      },
    });
  }, [form, isEuCountry, normalizedVatNumber, t, validateWithVies, viesCountryCode]);

  const mutationMatchesCurrentInput =
    viesMutation.variables?.countryCode === viesCountryCode &&
    viesMutation.variables?.vatNumber === normalizedVatNumber;
  const viesStatus: ViesStatus =
    !isEuCountry || !normalizedVatNumber || !mutationMatchesCurrentInput
      ? "notChecked"
      : viesMutation.isPending
        ? "checking"
        : viesMutation.isError || viesMutation.data?.status === "unavailable"
          ? "unavailable"
          : viesMutation.data?.status === "invalid"
            ? "invalid"
            : viesMutation.data?.status === "verified"
              ? "verified"
              : "notChecked";
  useEffect(() => onViesStatusChange(viesStatus), [onViesStatusChange, viesStatus]);
  const countryOptions = useMemo(() => {
    const displayNames = new Intl.DisplayNames([locale], { type: "region" });

    return countries
      .map((country) => {
        const countryName = displayNames.of(country.alpha2) ?? country.alpha3;

        return {
          value: country.alpha3,
          countryName,
          label: (
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className={`flag:${country.alpha2}`} />
              <span>{countryName}</span>
            </span>
          ),
        };
      })
      .sort((first, second) => first.countryName.localeCompare(second.countryName, locale))
      .map(({ value, label }) => ({ value, label }));
  }, [locale]);

  return (
    <Card className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm mobile:px-4 mobile:py-4">
      <div className="flex w-full flex-col items-start gap-1">
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </div>

      <div className="flex w-full flex-col items-start gap-2">
        <Typography variant="captionBold" className="text-default-font">
          {t("customerType")}
        </Typography>
        <RadioCardGroup<"LEGAL_ENTITY" | "INDIVIDUAL">
          className="mobile:flex-col"
          value="LEGAL_ENTITY"
          onValueChange={() => undefined}
          options={[
            {
              value: "LEGAL_ENTITY",
              label: t("legalEntity"),
              description: t("legalEntityDescription"),
            },
            {
              value: "INDIVIDUAL",
              label: t("individual"),
              description: t("individualDescription"),
              disabled: true,
            },
          ]}
        />
      </div>

      <div className="grid w-full grid-cols-2 items-start gap-4 mobile:grid-cols-1">
        <InventoryFieldInput
          required
          form={form}
          name="customer.legalName"
          label={t("legalName")}
        />
        <InventoryFieldSelect
          form={form}
          name="customer.countryCode"
          label={t("countryCode")}
          placeholder={t("countryCodePlaceholder")}
          options={countryOptions}
          required
        />
        <InventoryFieldInput
          required
          form={form}
          name="customer.addressLine1"
          label={t("addressLine1")}
        />
        <InventoryFieldInput
          form={form}
          name="customer.addressLine2"
          label={t("addressLine2")}
          description={t("addressLine2Hint")}
          placeholder={t("addressLine2Placeholder")}
        />
        <InventoryFieldInput
          required
          form={form}
          name="customer.postalCode"
          label={t("postalCode")}
        />
        <InventoryFieldInput required form={form} name="customer.city" label={t("city")} />
      </div>

      <div className="h-px w-full flex-none bg-neutral-border" />

      <div className="flex w-full flex-col items-start gap-1">
        <Typography variant="heading3" className="text-default-font">
          {t("contact")}
        </Typography>
      </div>
      <div className="grid w-full grid-cols-2 items-start gap-4 mobile:grid-cols-1">
        <InventoryFieldInput required form={form} name="contact.name" label={t("contactName")} />
        <InventoryFieldInput
          required
          form={form}
          name="contact.email"
          label={t("contactEmail")}
          type="email"
        />
        <InventoryFieldInput
          form={form}
          name="contact.phone"
          label={t("contactPhone")}
          description={t("contactPhoneHint")}
          type="tel"
        />
      </div>

      <div className="h-px w-full flex-none bg-neutral-border" />

      <div className="flex w-full flex-col items-start gap-1">
        <Typography variant="heading3" className="text-default-font">
          {t("taxIdentifiers")}
        </Typography>
        <Typography variant="captionSubframe" className="text-subtext-color">
          {t("taxIdentifiersDescription")}
        </Typography>
      </div>
      <div className="grid w-full grid-cols-2 items-start gap-4 mobile:grid-cols-1">
        {isFrance ? (
          <>
            <InventoryFieldInput
              required
              form={form}
              name="customer.siren"
              label={t("siren")}
              description={t("frenchRegistrationHint")}
            />
            <InventoryFieldInput
              required
              form={form}
              name="customer.siret"
              label={t("siret")}
              description={t("frenchRegistrationHint")}
            />
          </>
        ) : null}
        <div className="flex w-full flex-col items-start gap-1">
          <div className="flex w-full items-center justify-between gap-2">
            <Typography variant="captionBold" className="text-default-font">
              {isEuCountry ? t("vatNumber") : t("generalTaxIdentifier")}
              {isEuExceptFrance ? <span className="text-error-600"> *</span> : null}
            </Typography>
            {isEuCountry ? (
              <ViesVerification
                status={viesStatus}
                labels={{
                  notChecked: t("viesNotChecked"),
                  checking: t("viesChecking"),
                  verified: t("viesVerified"),
                  invalid: t("viesInvalid"),
                  unavailable: t("viesUnavailable"),
                }}
              />
            ) : null}
          </div>
          <InventoryFieldInput
            required={isEuExceptFrance}
            form={form}
            name="customer.vatNumber"
            description={t("vatNumberHint")}
            onBlur={validateVatNumber}
          />
        </div>
        {!isEuExceptFrance ? (
          <div className="flex h-full w-full flex-col justify-center">
            <InventoryFieldCheckbox
              form={form}
              name="customer.hasNoVatNumber"
              label={t("hasNoVatNumber")}
            />
          </div>
        ) : null}
      </div>

      <TaxTreatment countryCode={countryCode} viesStatus={viesStatus} />
    </Card>
  );
}

function normalizeVatNumber(vatNumber: string | undefined, countryCode: string | undefined) {
  const normalized = vatNumber?.replace(/\s/g, "").toUpperCase() ?? "";

  return countryCode && normalized.startsWith(countryCode)
    ? normalized.slice(countryCode.length)
    : normalized;
}
