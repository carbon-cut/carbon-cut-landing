"use client";

import { ArrowDown, ArrowUp, Minus } from "lucide-react";

import {
  summarizeResultMetric,
  type ResultMetricSeries,
} from "@/app/[locale]/collectivity/[planId]/result/_lib/summary-metric";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import Typography from "@/components/ui/typography/typography";
import { displayUnit } from "@/lib/Unit";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";

type ResultMetricCardProps = {
  favorableChange: "increase" | "decrease";
  label: string;
  metric?: ResultMetricSeries;
  isLoading: boolean;
  error: Error | null;
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
  isLoading,
  error,
}: ResultMetricCardProps) {
  const locale = useCurrentLocale();
  const t = useScopedI18n("(pages).collectivityDashboard.resultPoc");
  const tUnit = useScopedI18n("units");

  if (isLoading) {
    return (
      <Card aria-busy="true" aria-label={label}>
        <CardContent className="space-y-3 px-5 py-3 md:px-3">
          <Skeleton className="h-3 w-2/5" />
          <div className="flex items-baseline gap-2">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-1/5" />
          </div>
          <Skeleton className="h-3 w-3/5" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return <ErrorState error={error} label={label} t={t} />;
  }

  if (!metric) {
    return (
      <Card>
        <CardContent className="space-y-1 px-5 py-3 md:px-3">
          <Typography size="xs" className="font-medium" variant="muted">
            {label}
          </Typography>
          <Typography size="xl" className="font-semibold" variant="title">
            —
          </Typography>
          <Typography size="xs" variant="label" className="text-muted-foreground">
            {t("summaryCards.noData")}
          </Typography>
        </CardContent>
      </Card>
    );
  }
  // @ts-expect-error - init
  let summary: ReturnType<typeof summarizeResultMetric> = {};
  let trendClassName = "";
  let TrendIcon = Minus;
  try {
    summary = summarizeResultMetric(metric);
    const annualChange = summary.annualChange;
    const isNeutral = annualChange === null || annualChange === 0;
    const isFavorable =
      annualChange !== null &&
      annualChange !== 0 &&
      (favorableChange === "increase" ? annualChange > 0 : annualChange < 0);
    TrendIcon =
      annualChange === null || annualChange === 0 ? Minus : annualChange > 0 ? ArrowUp : ArrowDown;
    trendClassName = isNeutral
      ? "text-muted-foreground"
      : isFavorable
        ? "text-primary"
        : "text-destructive";
  } catch (e) {
    return <ErrorState error={e as Error} label={label} t={t} />;
  }
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

const ErrorState: React.FC<{
  error: Error;
  label: string;
  t: (key: string, ...args: any[]) => string;
}> = ({ error, label, t }) => {
  return (
    <Card>
      <CardContent className=" p-2 md:p-2 h-full flex flex-col justify-center ">
        <Alert variant="destructive" className="">
          <AlertTitle>
            <>{t("summaryCards.errorTitle")}</>
          </AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};
