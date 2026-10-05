import { FeatherCheck, FeatherClock, FeatherEuro, FeatherX } from "@subframe/core";

import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type QuoteRequestProgressProps = {
  acceptedTitle: string;
  acceptedDate: string;
  reviewTitle: string;
  reviewStatus: string;
  paymentTitle: string;
  paymentDescription: string;
  activeStep?: "review" | "payment" | "complete" | "rejected";
  reviewDate?: string;
  paymentStatus?: string;
};

export function QuoteRequestProgress({
  acceptedTitle,
  acceptedDate,
  reviewTitle,
  reviewStatus,
  paymentTitle,
  paymentDescription,
  activeStep = "review",
  reviewDate,
  paymentStatus,
}: QuoteRequestProgressProps) {
  return (
    <div className="flex w-full flex-col items-start">
      <QuoteRequestProgressStep
        state="completed"
        title={acceptedTitle}
        description={acceptedDate}
        hasConnector
      />
      <QuoteRequestProgressStep
        state={
          activeStep === "review"
            ? "review-active"
            : activeStep === "rejected"
              ? "rejected"
              : "completed"
        }
        title={reviewTitle}
        description={
          activeStep === "review" || activeStep === "rejected" ? reviewStatus : (reviewDate ?? "")
        }
        hasConnector
      />
      <QuoteRequestProgressStep
        state={
          activeStep === "payment"
            ? "payment-active"
            : activeStep === "complete"
              ? "completed"
              : "upcoming"
        }
        title={paymentTitle}
        description={paymentDescription}
        status={paymentStatus}
      />
    </div>
  );
}

function QuoteRequestProgressStep({
  state,
  title,
  description,
  status,
  hasConnector = false,
}: {
  state: "completed" | "review-active" | "payment-active" | "rejected" | "upcoming";
  title: string;
  description: string;
  status?: string;
  hasConnector?: boolean;
}) {
  const isCompleted = state === "completed";
  const isReviewActive = state === "review-active";
  const isPaymentActive = state === "payment-active";
  const isRejected = state === "rejected";
  const isActive = isReviewActive || isPaymentActive || isRejected;

  return (
    <div className="flex w-full items-stretch gap-3">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            " h-7 w-7 rounded-full flex flex-row items-center justify-center flex-none",
            isCompleted
              ? " bg-brand-600"
              : isReviewActive
                ? "border-2 border-solid border-warning-500 bg-warning-50"
                : isRejected
                  ? "border-2 border-solid border-error-500 bg-error-50"
                  : isPaymentActive
                    ? "border-2 border-solid border-brand-600 bg-brand-50"
                    : "border border-solid border-neutral-200 bg-neutral-100"
          )}
        >
          {isCompleted ? (
            <FeatherCheck
              className="[&>svg]:size-[15px] text-body font-body text-white"
              aria-hidden="true"
            />
          ) : isReviewActive ? (
            <FeatherClock
              className="[&>svg]:size-[15px] text-body font-body text-warning-700"
              aria-hidden="true"
            />
          ) : isRejected ? (
            <FeatherX
              className="[&>svg]:size-[15px] text-body font-body text-error-700"
              aria-hidden="true"
            />
          ) : (
            <Typography
              variant="captionBold"
              className={
                isPaymentActive ? "block mx-auto text-brand-700" : "block mx-auto text-neutral-400"
              }
            >
              3
            </Typography>
          )}
        </div>
        {hasConnector ? (
          <div
            className={`flex min-h-4 w-0.5 grow shrink-0 basis-0 ${isCompleted ? "bg-brand-300" : "bg-neutral-200"}`}
          />
        ) : null}
      </div>
      <div
        className={`flex grow shrink-0 basis-0 flex-col items-start ${hasConnector ? "pb-5" : ""} ${isActive ? "gap-1" : "gap-0.5"}`}
      >
        <Typography
          variant="bodyBold"
          className={state === "upcoming" ? "text-neutral-400" : "text-default-font"}
        >
          {title}
        </Typography>
        {isReviewActive || isRejected ? (
          <Badge variant={isRejected ? "error" : "warning"}>{description}</Badge>
        ) : (
          <Typography
            variant="captionSubframe"
            className={state === "upcoming" ? "text-neutral-400" : "text-subtext-color"}
          >
            {description}
          </Typography>
        )}
        {isPaymentActive && status ? (
          <Badge variant="success">
            <FeatherEuro className="size-3" aria-hidden="true" />
            {status}
          </Badge>
        ) : null}
      </div>
    </div>
  );
}
