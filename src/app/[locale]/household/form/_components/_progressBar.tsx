import React, { useMemo } from "react";

import { Progress } from "@/components/ui/progress";
import { TabValues } from "@/lib/formTabs/types";
import { useScopedI18n } from "@/locales/client";
import Typography from "@/components/ui/typography";
import { shellLayout } from "./shellLayout";

type ProgressProps = {
  dataLengths: { [key in TabValues]: number } & { total: number };
  currentQuestion: number;
  currentSectionDataLength: number;
  currentSectionName: string;
  tab: TabValues;
  children?: React.ReactNode;
};

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressProps>(function ProgressBar(
  { children, dataLengths, currentQuestion, currentSectionDataLength, currentSectionName, tab },
  ref
) {
  const t = useScopedI18n("forms.progress");

  const progress = useMemo(() => {
    let sup = 0;
    switch (tab) {
      case "transport":
        sup = 0;
        break;
      case "energy":
        sup = dataLengths.transport;
        break;
      case "food":
        sup = dataLengths.transport + dataLengths.energy;
        break;
      case "waste":
        sup = dataLengths.transport + dataLengths.energy + dataLengths.food;
        break;
      case "vacation":
        sup = dataLengths.transport + dataLengths.energy + dataLengths.food + dataLengths.waste;
        break;
    }
    return ((sup + currentQuestion) / dataLengths.total) * 100;
  }, [currentQuestion, dataLengths, tab]);

  const roundedProgress = Math.round(progress);

  const ColorVariants = {
    transport: { bg: "bg-section-transport/20", main: "bg-section-transport" },
    energy: { bg: "bg-section-energy/20", main: "bg-section-energy" },
    food: { bg: "bg-section-food/20", main: "bg-section-food" },
    waste: { bg: "bg-section-waste/20", main: "bg-section-waste" },
    vacation: { bg: "bg-section-vacation/20", main: "bg-section-vacation" },
  };

  return (
    <div ref={ref} className="max-w-6xl mx-auto relative">
      <div className={shellLayout.progressWrap}>
        <div className="flex justify-between items-center mb-2">
          <div className="md:w-fit flex-col md:flex-row flex self-end">
            <Typography asChild variant="description" size="sm" className="inline-block">
              <span>{currentSectionName}</span>
            </Typography>
            <Typography asChild variant="description" size="sm" className="hidden md:block">
              <span>&nbsp;-&nbsp;</span>
            </Typography>
            <Typography asChild variant="description" size="sm">
              <span>
                {t("title", {
                  current: currentQuestion + 1,
                  total: currentSectionDataLength,
                })}
              </span>
            </Typography>
          </div>
          <div className="flex">
            <Typography asChild variant="description" size="sm" className="mr-4 self-end">
              <span>{t("percentage", { value: roundedProgress })}</span>
            </Typography>
            {children}
          </div>
        </div>
        <Progress
          color={ColorVariants[tab].main}
          value={progress}
          bg={`h-21 ${ColorVariants[tab].bg}`}
        />
      </div>
    </div>
  );
});

export default ProgressBar;
