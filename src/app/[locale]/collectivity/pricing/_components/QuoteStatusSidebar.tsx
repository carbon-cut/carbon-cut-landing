import type { ReactNode } from "react";

import { FeatherDownload, FeatherFileText, FeatherInfo, FeatherLock } from "@subframe/core";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import Typography from "@/components/ui/typography";

import { QuoteTotalRow } from "./QuoteReviewPrimitives";

type QuoteStatusSidebarProps = {
  title: string;
  frozenLabel: string;
  annualLabel: string;
  annualValue: string;
  durationLabel: string;
  durationValue: string;
  totalHtLabel: string;
  totalHtValue: string;
  vatLabel: string;
  vatValue: string;
  totalTtcLabel: string;
  totalTtcValue: string;
  totalDescription: string;
  progressTitle: string;
  progress: ReactNode;
  downloadLabel: string;
  notice: string;
  onDownload: () => void;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  additionalAction?: ReactNode;
  highlight?: {
    label: string;
    value: string;
    description: string;
    compact?: boolean;
  };
};

export function QuoteStatusSidebar({
  title,
  frozenLabel,
  annualLabel,
  annualValue,
  durationLabel,
  durationValue,
  totalHtLabel,
  totalHtValue,
  vatLabel,
  vatValue,
  totalTtcLabel,
  totalTtcValue,
  totalDescription,
  progressTitle,
  progress,
  downloadLabel,
  notice,
  onDownload,
  primaryAction,
  secondaryAction,
  additionalAction,
  highlight,
}: QuoteStatusSidebarProps) {
  return (
    <aside className="sticky top-6 flex w-96 flex-none mobile:static mobile:w-full">
      <Card className="flex w-full flex-col items-start gap-5 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-md mobile:px-4 mobile:py-4">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FeatherFileText
              className="text-heading-3 font-heading-3 text-brand-600"
              aria-hidden="true"
            />
            <CardTitle asChild>
              <h2>{title}</h2>
            </CardTitle>
          </div>
          <Badge variant="neutral">
            <FeatherLock className="size-3" aria-hidden="true" />
            {frozenLabel}
          </Badge>
        </div>
        <dl className="flex w-full flex-col items-start gap-3">
          <QuoteTotalRow label={annualLabel} value={annualValue} />
          <QuoteTotalRow label={durationLabel} value={durationValue} />
        </dl>
        <div className="h-px w-full bg-neutral-border" />
        <dl className="flex w-full flex-col items-start gap-3">
          <QuoteTotalRow label={totalHtLabel} value={totalHtValue} />
          <QuoteTotalRow label={vatLabel} value={vatValue} />
        </dl>
        <div className="h-px w-full bg-neutral-border" />
        <div className="flex w-full flex-col items-start gap-1">
          <Typography variant="captionBold" className="text-subtext-color">
            {totalTtcLabel}
          </Typography>
          <Typography variant="heading1" className="text-default-font">
            {totalTtcValue}
          </Typography>
          <Typography variant="captionSubframe" className="text-subtext-color">
            {totalDescription}
          </Typography>
        </div>
        <div className="h-px w-full bg-neutral-border" />
        <section className="flex w-full flex-col items-start gap-4">
          <Typography asChild variant="bodyBold" className="text-default-font">
            <h3>{progressTitle}</h3>
          </Typography>
          {progress}
        </section>
        {highlight ? (
          <div className="flex w-full flex-col items-start gap-1 rounded-sm border border-solid border-brand-200 bg-brand-50 px-4 py-4">
            <Typography variant="captionBold" className="text-brand-800">
              {highlight.label}
            </Typography>
            <Typography
              variant={highlight.compact ? "heading3" : "heading1"}
              className="text-brand-800"
            >
              {highlight.value}
            </Typography>
            <Typography variant="captionSubframe" className="text-brand-700">
              {highlight.description}
            </Typography>
          </div>
        ) : null}
        {primaryAction ? (
          <Button
            type="button"
            className="h-10 w-full"
            variant="brand-primary"
            size="large"
            onClick={primaryAction.onClick}
          >
            {primaryAction.label}
          </Button>
        ) : null}
        {secondaryAction ? (
          <Button
            type="button"
            className="h-10 w-full"
            variant="neutral-secondary"
            size="large"
            onClick={secondaryAction.onClick}
          >
            {secondaryAction.label}
          </Button>
        ) : null}
        {additionalAction}
        <Button
          type="button"
          className="h-10 w-full"
          variant="neutral-secondary"
          size="large"
          icon={<FeatherDownload />}
          onClick={onDownload}
        >
          {downloadLabel}
        </Button>
        <div className="flex w-full items-start gap-2 rounded-sm border border-solid border-neutral-border bg-neutral-50 px-3 py-3">
          <FeatherInfo className="text-body font-body text-subtext-color" aria-hidden="true" />
          <Typography variant="captionBold" className="text-default-font">
            {notice}
          </Typography>
        </div>
      </Card>
    </aside>
  );
}
