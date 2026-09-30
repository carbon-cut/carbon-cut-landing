import type { ReactNode } from "react";

import { FeatherLock, FeatherQuote, FeatherShieldCheck } from "@subframe/core";

import { CardDescription, CardTitle } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { QuoteReviewCard, QuoteReviewGrid, QuoteReviewValue } from "./QuoteReviewPrimitives";

export type QuoteReviewEntry = {
  label: string;
  value?: string;
  detail?: ReactNode;
};

export function QuoteClientReviewCard({
  title,
  entries,
  action,
}: {
  title: string;
  entries: QuoteReviewEntry[];
  action?: ReactNode;
}) {
  return (
    <QuoteReviewCard title={title} action={action}>
      <QuoteReviewGrid>
        {entries.map((entry) => (
          <QuoteReviewValue key={entry.label} {...entry} />
        ))}
      </QuoteReviewGrid>
    </QuoteReviewCard>
  );
}

export function QuoteTermsReviewCard({
  title,
  entries,
  action,
}: {
  title: string;
  entries: QuoteReviewEntry[];
  action?: ReactNode;
}) {
  return (
    <QuoteReviewCard title={title} action={action}>
      <QuoteReviewGrid>
        {entries.map((entry) => (
          <QuoteReviewValue key={entry.label} {...entry} />
        ))}
      </QuoteReviewGrid>
    </QuoteReviewCard>
  );
}

export function QuoteIssuerReviewCard({
  title,
  description,
  entries,
}: {
  title: string;
  description: string;
  entries: QuoteReviewEntry[];
}) {
  return (
    <QuoteReviewCard title={title}>
      <CardDescription>{description}</CardDescription>
      <QuoteReviewGrid>
        {entries.map((entry) => (
          <QuoteReviewValue key={entry.label} {...entry} />
        ))}
      </QuoteReviewGrid>
    </QuoteReviewCard>
  );
}

export function QuoteTaxTreatmentReviewCard({
  title,
  label,
  quoteMentionLabel,
  quoteMention,
  action,
  headerDescription,
  quoteBox = false,
}: {
  title: string;
  label: string;
  quoteMentionLabel: string;
  quoteMention: string;
  action?: ReactNode;
  headerDescription?: string;
  quoteBox?: boolean;
}) {
  return (
    <QuoteReviewCard
      title={title}
      action={action}
      header={
        headerDescription ? (
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-2">
              <FeatherLock
                className="text-heading-3 font-heading-3 text-brand-600"
                aria-hidden="true"
              />
              <CardTitle asChild>
                <h2>{title}</h2>
              </CardTitle>
            </div>
            <Typography variant="captionSubframe" className="text-subtext-color">
              {headerDescription}
            </Typography>
          </div>
        ) : undefined
      }
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
            {label}
          </Typography>
        </div>
        {quoteBox ? (
          <div className="flex w-full flex-col items-start gap-2 border-t border-solid border-brand-200 pt-3">
            <Typography variant="captionBold" className="text-brand-800">
              {quoteMentionLabel}
            </Typography>
            <div className="flex w-full items-start gap-2 rounded-sm border-l-2 border-solid border-neutral-300 bg-neutral-100 px-3 py-2">
              <FeatherQuote className="text-body font-body text-neutral-400" aria-hidden="true" />
              <Typography variant="bodySubframe" className="text-default-font">
                {quoteMention}
              </Typography>
            </div>
          </div>
        ) : (
          <div className="flex w-full items-start gap-2 border-t border-solid border-brand-200 pt-3">
            <FeatherQuote className="text-body font-body text-neutral-400" aria-hidden="true" />
            <div className="flex min-w-0 grow flex-col items-start gap-1">
              <Typography variant="captionBold" className="text-brand-800">
                {quoteMentionLabel}
              </Typography>
              <Typography variant="bodySubframe" className="text-default-font">
                {quoteMention}
              </Typography>
            </div>
          </div>
        )}
      </div>
    </QuoteReviewCard>
  );
}
