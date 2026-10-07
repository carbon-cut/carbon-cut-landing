import type { ReactNode } from "react";

import { Card, CardTitle } from "@/components/ui/card";
import Typography from "@/components/ui/typography";

export function QuoteReviewCard({
  title,
  action,
  header,
  children,
}: {
  title: string;
  action?: ReactNode;
  header?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm mobile:px-4 mobile:py-4">
      <div className="flex w-full items-start justify-between gap-4 mobile:flex-col mobile:gap-2">
        {header ?? (
          <CardTitle asChild>
            <h2>{title}</h2>
          </CardTitle>
        )}
        {action}
      </div>
      {children}
    </Card>
  );
}

export function QuoteReviewGrid({ children }: { children: ReactNode }) {
  return (
    <dl className="grid w-full grid-cols-2 items-start gap-x-6 gap-y-5 mobile:grid-cols-1">
      {children}
    </dl>
  );
}

export function QuoteReviewValue({
  label,
  value,
  detail,
}: {
  label: string;
  value?: string;
  detail?: ReactNode;
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

export function QuoteOfferTile({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
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

export function QuoteTotalRow({
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
