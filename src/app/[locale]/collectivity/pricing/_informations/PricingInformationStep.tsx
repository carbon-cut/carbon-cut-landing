"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/forms";
import RadioCardGroup from "@/components/ui/radio-card-group";
import Typography from "@/components/ui/typography";
import InventoryFieldInput from "@/app/[locale]/collectivity/_components/fields/InventoryFieldInput";
import { InventoryFieldCheckbox } from "@/app/[locale]/collectivity/_components/fields/InventoryFieldCheckbox";
import { InventoryFieldSelect } from "@/app/[locale]/collectivity/_components/fields/InventoryFieldSelect";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import countries from "../_lib/countries.json";
import { getViesCountryCode, isEuMemberCountry } from "../_lib/countryRules";
import { quoteInformationSchema, type QuoteInformationInput } from "../_lib/infoSchema";
import { validateViesVatNumber } from "../_lib/queries";
import type { ViesStatus } from "../_lib/taxTreatment";
import TaxTreatment from "./TaxTreatment";
import ViesVerification from "./ViesVerification";

export default function PricingInformationStep() {
  const t = useScopedI18n("collectivityPricing.quoteInformation.cards");
  const form = useForm<QuoteInformationInput>({
    resolver: zodResolver(quoteInformationSchema),
    defaultValues: {
      customerType: "LEGAL_ENTITY",
      customer: {
        legalName: "",
        addressLine1: "",
        addressLine2: "",
        postalCode: "",
        city: "",
        countryCode: "",
        siren: "",
        siret: "",
        vatNumber: "",
        hasNoVatNumber: false,
      },
      contact: {
        name: "",
        email: "",
        phone: "",
      },
      quoteTerms: {
        contractStartDate: "",
      },
    },
    mode: "onSubmit",
  });

  return (
    <Form {...form}>
      <form
        className="flex w-full items-start gap-8 mobile:flex-col mobile:gap-6"
        onSubmit={(event) => event.preventDefault()}
      >
        <section className="flex min-w-0 grow shrink-0 basis-0 flex-col items-start gap-6 mobile:flex-none">
          <LegalIdentityCard form={form} />
          <Card className="w-full border-solid border-neutral-border bg-default-background shadow-sm">
            <CardHeader className="px-6 py-6 mobile:px-4 mobile:py-4">
              <CardTitle>{t("quoteTerms.title")}</CardTitle>
              <CardDescription className="font-body">{t("quoteTerms.description")}</CardDescription>
            </CardHeader>
          </Card>
        </section>
        <aside className="sticky top-6 flex w-96 flex-none mobile:static mobile:w-full">
          <Card className="w-full border-solid border-neutral-border bg-default-background shadow-md">
            <CardHeader className="px-6 py-6 mobile:px-4 mobile:py-4">
              <CardTitle>{t("selectedOffer.title")}</CardTitle>
            </CardHeader>
          </Card>
        </aside>
      </form>
    </Form>
  );
}

function LegalIdentityCard({ form }: { form: ReturnType<typeof useForm<QuoteInformationInput>> }) {
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
