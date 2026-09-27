"use client";

import { Fragment } from "react";

import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";
import { cn } from "@/lib/utils";
import { usePricingFlow } from "./PricingFlowContext";

type StepStatus = "completed" | "active" | "upcoming";

type PricingStepperProps = {
  className?: string;
};

export default function PricingStepper({ className }: PricingStepperProps) {
  const { activeStep } = usePricingFlow();
  const t = useScopedI18n("collectivityPricing.flow");
  const activeIndex = ["configuration", "informations", "verification"].indexOf(activeStep);
  const steps = [
    { label: t("steps.configuration"), status: getStepStatus(0, activeIndex) },
    { label: t("steps.quoteInformation"), status: getStepStatus(1, activeIndex) },
    { label: t("steps.quoteVerification"), status: getStepStatus(2, activeIndex) },
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
            className="group/c1145464 flex w-full cursor-pointer flex-col items-center justify-center gap-1"
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

function getStepStatus(index: number, activeIndex: number): StepStatus {
  if (index < activeIndex) {
    return "completed";
  }

  return index === activeIndex ? "active" : "upcoming";
}
