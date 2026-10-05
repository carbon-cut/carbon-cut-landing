import Typography from "@/components/ui/typography";

import { QuoteReviewCard } from "./QuoteReviewPrimitives";

export function QuoteRejectionReason({
  title,
  label,
  reason,
}: {
  title: string;
  label: string;
  reason: string;
}) {
  return (
    <QuoteReviewCard title={title}>
      <div className="flex w-full flex-col items-start gap-2 rounded-sm border border-solid border-error-200 bg-error-50 px-4 py-4">
        <Typography variant="captionBold" className="text-error-800">
          {label}
        </Typography>
        <Typography variant="bodySubframe" className="text-error-900">
          {reason}
        </Typography>
      </div>
    </QuoteReviewCard>
  );
}
