import type { ReactNode } from "react";

import Typography from "@/components/ui/typography";

export function QuoteStatusNotice({
  status,
  icon,
  title,
  summary,
  description,
}: {
  status: "under_review" | "accepted" | "paid" | "rejected" | "expired";
  icon: ReactNode;
  title: string;
  summary?: string;
  description: string;
}) {
  const isSuccess = status === "accepted" || status === "paid";
  const palette = isSuccess
    ? {
        border: "border-success-200",
        background: "bg-success-50",
        iconBackground: "bg-success-100",
        title: "text-success-900",
        body: "text-success-800",
        icon: "text-success-700",
      }
    : status === "rejected" || status === "expired"
      ? {
          border: "border-error-200",
          background: "bg-error-50",
          iconBackground: "bg-error-100",
          title: "text-error-900",
          body: "text-error-800",
          icon: "text-error-700",
        }
      : {
          border: "border-warning-200",
          background: "bg-warning-50",
          iconBackground: "bg-warning-100",
          title: "text-warning-900",
          body: "text-warning-800",
          icon: "text-warning-700",
        };

  return (
    <div
      className={`flex w-full items-start gap-4 rounded-md border border-solid px-6 py-5 mobile:px-4 mobile:py-4 ${palette.border} ${palette.background}`}
    >
      <div
        className={`flex h-10 w-10 flex-none items-center justify-center rounded-full ${palette.iconBackground}`}
      >
        <span
          className={`text-heading-2 font-heading-2 ${palette.icon} flex flex-col justify-center`}
          aria-hidden="true"
        >
          {icon}
        </span>
      </div>
      <div className="flex min-w-0 grow flex-col items-start gap-2">
        <Typography variant="heading2" className={palette.title}>
          {title}
        </Typography>
        {summary ? (
          <Typography variant="bodyBold" className={palette.title}>
            {summary}
          </Typography>
        ) : null}
        <Typography variant="bodySubframe" className={palette.body}>
          {description}
        </Typography>
      </div>
    </div>
  );
}
