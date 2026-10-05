import { FeatherInfo, FeatherLandmark } from "@subframe/core";

import Typography from "@/components/ui/typography";

import { QuoteReviewGrid } from "./QuoteReviewPrimitives";
import { QuoteReviewCard } from "./QuoteReviewPrimitives";
import { QuoteCopyButton } from "./QuoteCopyButton";

export type QuotePaymentInstructionsData = {
  bankName: string;
  iban: string;
  bic: string;
  dueDate: string;
};

export function QuotePaymentInstructions({
  title,
  beneficiaryLabel,
  beneficiary,
  bankLabel,
  ibanLabel,
  bicLabel,
  amountLabel,
  amount,
  referenceLabel,
  reference,
  dueDateLabel,
  copyLabel,
  referenceNotice,
  data,
}: {
  title: string;
  beneficiaryLabel: string;
  beneficiary: string;
  bankLabel: string;
  ibanLabel: string;
  bicLabel: string;
  amountLabel: string;
  amount: string;
  referenceLabel: string;
  reference: string;
  dueDateLabel: string;
  copyLabel: string;
  referenceNotice: string;
  data: QuotePaymentInstructionsData;
}) {
  return (
    <QuoteReviewCard
      title={title}
      header={
        <div className="flex items-center gap-2">
          <FeatherLandmark
            className="text-heading-3 font-heading-3 text-brand-600"
            aria-hidden="true"
          />
          <Typography asChild variant="heading2" className="text-default-font">
            <h2>{title}</h2>
          </Typography>
        </div>
      }
    >
      <QuoteReviewGrid>
        <QuotePaymentValue label={beneficiaryLabel} value={beneficiary} />
        <QuotePaymentValue label={bankLabel} value={data.bankName} />
        <QuotePaymentValue label={ibanLabel} value={data.iban} copyLabel={copyLabel} monospace />
        <QuotePaymentValue label={bicLabel} value={data.bic} />
        <QuotePaymentValue label={amountLabel} value={amount} />
        <QuotePaymentValue
          label={referenceLabel}
          value={reference}
          copyLabel={copyLabel}
          monospace
        />
        <QuotePaymentValue label={dueDateLabel} value={data.dueDate} />
      </QuoteReviewGrid>
      <div className="flex w-full items-start gap-2 rounded-sm bg-neutral-50 px-3 py-2">
        <FeatherInfo className="text-body font-body text-subtext-color" aria-hidden="true" />
        <Typography variant="captionSubframe" className="text-subtext-color">
          {referenceNotice}
        </Typography>
      </div>
    </QuoteReviewCard>
  );
}

function QuotePaymentValue({
  label,
  value,
  copyLabel,
  monospace = false,
}: {
  label: string;
  value: string;
  copyLabel?: string;
  monospace?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-col items-start gap-1">
      <Typography asChild variant="captionSubframe" className="text-subtext-color">
        <dt>{label}</dt>
      </Typography>
      <div className="flex min-w-0 items-center gap-2">
        <Typography
          asChild
          variant={monospace ? "bodySubframe" : "bodyBold"}
          className={monospace ? "font-mono text-default-font" : "text-default-font"}
        >
          <dd>{value}</dd>
        </Typography>
        {copyLabel ? <QuoteCopyButton value={value} label={copyLabel} /> : null}
      </div>
    </div>
  );
}
