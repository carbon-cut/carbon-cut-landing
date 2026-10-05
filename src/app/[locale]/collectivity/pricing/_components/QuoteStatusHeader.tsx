import type { ReactNode } from "react";
import { FeatherArrowLeft } from "@subframe/core";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";

import PricingStepper from "./PricingStepper";

export function QuoteStatusHeader({
  backLabel,
  title,
  description,
  badge,
  badgeVariant,
  badgeIcon,
  date,
}: {
  backLabel: string;
  title: string;
  description: string;
  badge: string;
  badgeVariant: "warning" | "success" | "error";
  badgeIcon: ReactNode;
  date: string;
}) {
  return (
    <header className="flex w-full flex-col items-start gap-6">
      <div className="flex w-full items-center justify-between gap-4 mobile:flex-col mobile:items-start">
        <Button
          type="button"
          variant="link-neutral"
          size="small"
          icon={<FeatherArrowLeft />}
          disabled
        >
          {backLabel}
        </Button>
        <PricingStepper
          className="max-w-[560px]"
          statuses={["completed", "completed", "completed"]}
        />
      </div>
      <div className="flex w-full flex-col items-start gap-2">
        <Typography asChild variant="heading1" className="text-default-font">
          <h1>{title}</h1>
        </Typography>
        <Typography asChild variant="bodySubframe" className="max-w-[720px] text-subtext-color">
          <p>{description}</p>
        </Typography>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Badge variant={badgeVariant}>
            {badgeIcon}
            {badge}
          </Badge>
          <Typography variant="captionSubframe" className="text-subtext-color">
            {date}
          </Typography>
        </div>
      </div>
    </header>
  );
}
