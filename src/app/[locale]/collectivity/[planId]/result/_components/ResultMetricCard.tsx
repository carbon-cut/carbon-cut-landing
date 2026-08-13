"use client";

import { ArrowDown, ArrowUp, Minus } from "lucide-react";

import {
  summarizeResultMetric,
  type ResultMetricSeries,
} from "@/app/[locale]/collectivity/[planId]/result/_lib/summary-metric";
import { Card, CardContent } from "@/components/ui/card";
import Typography from "@/components/ui/typography/typography";
import { displayUnit } from "@/lib/Unit";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";

type ResultMetricCardProps = {
  favorableChange: "increase" | "decrease";
  label: string;
  metric: ResultMetricSeries;
};

function formatValue(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPercentage(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
    signDisplay: "always",
  }).format(value);
}

export default function ResultMetricCard({
  favorableChange,
  label,
  metric,
}: ResultMetricCardProps) {
  const locale = useCurrentLocale();
  const t = useScopedI18n("(pages).collectivityDashboard.resultPoc");
  const tUnit = useScopedI18n("units");
  const summary = summarizeResultMetric(metric);
  const annualChange = summary.annualChange;
  const isNeutral = annualChange === null || annualChange === 0;
  const isFavorable =
    annualChange !== null &&
    annualChange !== 0 &&
    (favorableChange === "increase" ? annualChange > 0 : annualChange < 0);
  const TrendIcon =
    annualChange === null || annualChange === 0 ? Minus : annualChange > 0 ? ArrowUp : ArrowDown;
  const trendClassName = isNeutral
    ? "text-muted-foreground"
    : isFavorable
      ? "text-primary"
      : "text-destructive";

  return (
    <Card>
      <CardContent className="space-y-1 px-5 p-2 md:p-2 md:px-3">
        <Typography size="xs" className="font-medium" variant="muted">
          {label}
        </Typography>
        <div className="flex items-baseline gap-2">
          <Typography size="xl" className="font-semibold" variant="title">
            {formatValue(summary.value)}
          </Typography>
          <Typography size="sm" className="font-medium" variant="muted">
            {displayUnit(summary.unit, { locale, localize: tUnit })}
          </Typography>
        </div>
        <div className={`flex items-center gap-1 ${trendClassName}`}>
          <TrendIcon aria-hidden="true" className="size-3" />
          <Typography size="xs" variant="label" className="text-inherit">
            {summary.annualChange === null
              ? t("summaryCards.unavailable")
              : t("summaryCards.annualChange", {
                  change: `${formatPercentage(summary.annualChange)}%`,
                })}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
