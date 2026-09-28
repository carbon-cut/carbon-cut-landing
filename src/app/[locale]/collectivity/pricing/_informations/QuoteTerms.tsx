"use client";

import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  CollectivityDatePicker,
  CollectivitySelect,
  InventoryFieldDatePicker,
} from "@/app/[locale]/collectivity/_components/fields";
import { useScopedI18n } from "@/locales/client";
import type { QuoteInformationInput } from "../_lib/infoSchema";
import quoteTerms from "../_lib/quoteTerms.json";

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default function QuoteTerms({ form }: { form: UseFormReturn<QuoteInformationInput> }) {
  const t = useScopedI18n("collectivityPricing.quoteInformation.cards.quoteTerms");
  const issueDate = useMemo(() => new Date(), []);
  const validUntil = useMemo(() => addDays(issueDate, quoteTerms.quoteValidityDays), [issueDate]);
  const firstAllowedContractStartDate = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }, []);

  return (
    <Card className="w-full border-solid border-neutral-border bg-default-background shadow-sm">
      <CardHeader className="flex flex-col items-start gap-6 px-6 py-6 mobile:px-4 mobile:py-4">
        <div className="flex w-full flex-col items-start gap-1">
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription className="font-body">{t("description")}</CardDescription>
        </div>
        <div className="grid w-full grid-cols-2 items-start gap-x-4 gap-y-5 mobile:grid-cols-1">
          <StaticSelectField label={t("currency")} value={t("currencyEur")} />
          <CollectivityDatePicker
            label={t("issueDate")}
            value={issueDate}
            disabled
            description={t("issueDateHint")}
          />
          <StaticSelectField
            label={t("validityDuration")}
            value={t("validityDurationValue", { count: quoteTerms.quoteValidityDays })}
          />
          <CollectivityDatePicker
            label={t("validUntil")}
            value={validUntil}
            disabled
            description={t("validUntilHint")}
          />
          <InventoryFieldDatePicker
            form={form}
            name="quoteTerms.contractStartDate"
            label={t("contractStartDate")}
            required
            disabledDates={{ before: firstAllowedContractStartDate }}
          />
          <StaticSelectField
            label={t("paymentTerms")}
            value={t("paymentTermsValue", { count: quoteTerms.paymentTermsDays })}
          />
          <StaticSelectField label={t("paymentMethod")} value={t("bankTransfer")} />
        </div>
      </CardHeader>
    </Card>
  );
}

function StaticSelectField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full flex-col items-start gap-1">
      <Label className="text-caption-bold font-caption-bold leading-4 text-default-font">
        {label}
      </Label>
      <CollectivitySelect
        value={value}
        placeholder={value}
        options={[{ value, label: value }]}
        disabled
      />
    </div>
  );
}
