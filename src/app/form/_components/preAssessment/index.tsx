"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";
import {
  BarChart3,
  Circle,
  Car,
  Clock,
  Database,
  LineChart,
  Lock,
  Save,
  Target,
  Utensils,
  Zap,
} from "lucide-react";
import type { ComponentType } from "react";
import { useState } from "react";
import PreAssessmentActions from "./actions";
import PreAssessmentContent from "./content";
import PreAssessmentTitle from "./title";
import PreAssessmentVisual from "./visual";

type Props = {
  onContinue: () => void;
};

type PreAssessmentItemKey =
  | "duration"
  | "measure"
  | "accuracy"
  | "transport"
  | "energie"
  | "food"
  | "data"
  | "privacy"
  | "save"
  | "results";

type PreAssessmentSlide = {
  title: string;
  visualLabel?: string;
  note?: string;
  items: {
    id: PreAssessmentItemKey;
    title: string;
    description: string;
  }[];
};

export default function PreAssessment({ onContinue }: Props) {
  const t = useScopedI18n("forms.preAssessment");
  const tForms = useScopedI18n("forms");
  const iconMap: Record<PreAssessmentItemKey, ComponentType<{ className?: string }>> = {
    duration: Clock,
    measure: Target,
    accuracy: BarChart3,
    transport: Car,
    energie: Zap,
    food: Utensils,
    data: Database,
    privacy: Lock,
    save: Save,
    results: LineChart,
  };
  const slides = t("slides") as PreAssessmentSlide[];
  const safeSlides = Array.isArray(slides) ? slides : [];
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = safeSlides.length;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const activeSlide = safeSlides[currentStep] ?? safeSlides[0];
  if (!activeSlide) {
    return null;
  }
  const contentItems = activeSlide.items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    Icon: iconMap[item.id] ?? Circle,
  }));
  const stepLabel = t("stepIndicator", { current: currentStep + 1, total: totalSteps });
  const nextLabel = isLastStep ? t("cta") : t("next");
  const visualVariant = currentStep === 0 ? "duration" : currentStep === 1 ? "sections" : "results";

  return (
    <Dialog open>
      <DialogContent
        className="h-[85vh] w-[560px] max-w-[90vw]"
        overlayClassName="bg-black/70 backdrop-blur-sm"
        onInteractOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
        showCloseButton={false}
        contentClassName="h-full p-6"
      >
        <div className="flex h-full flex-col justify-between gap-8 text-center">
          <div>
            <PreAssessmentTitle
              title={activeSlide.title}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
            <div className="flex flex-1 flex-col items-center justify-center gap-6 mt-6">
              <div className="h-[100px]">
                <PreAssessmentVisual variant={visualVariant} label={activeSlide.visualLabel} />
              </div>
              <PreAssessmentContent items={contentItems} />
              {activeSlide.note ? (
                <Typography
                  asChild
                  variant="description"
                  size="default"
                  className="text-md max-w-md"
                >
                  <p>{activeSlide.note}</p>
                </Typography>
              ) : null}
            </div>
          </div>
          <PreAssessmentActions
            backLabel={tForms("back")}
            nextLabel={nextLabel}
            backDisabled={isFirstStep}
            stepLabel={stepLabel}
            onBack={() => setCurrentStep((step) => Math.max(step - 1, 0))}
            onNext={() => {
              if (isLastStep) {
                onContinue();
                return;
              }
              setCurrentStep((step) => Math.min(step + 1, totalSteps - 1));
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
