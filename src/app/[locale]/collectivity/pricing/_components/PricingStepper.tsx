"use client";

import { Fragment } from "react";

import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";
import { cn } from "@/lib/utils";
import type { PricingFlowStep } from "./PricingFlowContext";

export type PricingStepStatus = "completed" | "active" | "upcoming";

type PricingStepperProps = {
  className?: string;
  activeStep?: PricingFlowStep;
  statuses?: PricingStepStatus[];
};

export default function PricingStepper({ className, activeStep, statuses }: PricingStepperProps) {
  const t = useScopedI18n("collectivityPricing.flow");
  const activeIndex = ["configuration", "informations", "verification"].indexOf(
    activeStep ?? "configuration"
  );
  const steps = [
    { label: t("steps.configuration"), status: statuses?.[0] ?? getStepStatus(0, activeIndex) },
    { label: t("steps.quoteInformation"), status: statuses?.[1] ?? getStepStatus(1, activeIndex) },
    { label: t("steps.quoteVerification"), status: statuses?.[2] ?? getStepStatus(2, activeIndex) },
  ];

  return (
    <nav
      aria-label={t("progressLabel")}
      className={cn("flex w-full items-start justify-center", className)}
    >
      {steps.map((step, index) => (
        <Fragment key={step.label}>
          <div
            aria-current={step.status === "active" ? "step" : undefined}
            className="group/c1145464 flex w-full flex-col items-center justify-center gap-1"
          >
            <div className="flex w-full items-center justify-center gap-2">
              <div
                aria-hidden="true"
                className={cn(
                  "flex h-px grow shrink-0 basis-0 flex-col items-center gap-2 bg-neutral-300",
                  index === 0 && "bg-transparent"
                )}
              />
              <div
                className={cn(
                  "flex h-7 w-7 flex-none flex-col items-center justify-center gap-2 rounded-full bg-neutral-100",
                  step.status !== "upcoming" && "bg-brand-100"
                )}
              >
                <Typography
                  variant="captionBold"
                  className={step.status === "upcoming" ? "text-subtext-color" : "text-brand-700"}
                >
                  {index + 1}
                </Typography>
              </div>
              <div
                aria-hidden="true"
                className={cn(
                  "flex h-px grow shrink-0 basis-0 flex-col items-center gap-2 bg-neutral-300",
                  index === steps.length - 1 && "bg-transparent"
                )}
              />
            </div>
            <Typography
              variant={step.status === "active" ? "bodyBold" : "bodySubframe"}
              className={
                step.status === "active"
                  ? "text-default-font group-hover/c1145464:text-default-font"
                  : "text-subtext-color group-hover/c1145464:text-default-font"
              }
            >
              {step.label}
            </Typography>
          </div>
        </Fragment>
      ))}
    </nav>
  );
}

function getStepStatus(index: number, activeIndex: number): PricingStepStatus {
  if (index < activeIndex) {
    return "completed";
  }

  return index === activeIndex ? "active" : "upcoming";
}
