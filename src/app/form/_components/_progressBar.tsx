import React, { useMemo } from "react";

import { Progress } from "@/components/ui/progress";
import { TabValues } from "@/lib/formTabs/types";
import { useScopedI18n } from "@/locales/client";

type ProgressProps = {
  dataLengths: { [key in TabValues]: number } & { total: number };
  currentQuestion: number;
  currentSectionDataLength: number;
  currentSectionName: string;
  tab: TabValues;
  children?: React.ReactNode;
};

function ProgressBar({
  children,
  dataLengths,
  currentQuestion,
  currentSectionDataLength,
  currentSectionName,
  tab,
}: ProgressProps) {
  const t = useScopedI18n("forms.progress");

  const progress = useMemo(() => {
    let sup = 0;
    switch (tab) {
      case "transport":
        sup = 0;
        break;
      case "energie":
        sup = dataLengths.transport;
        break;
      case "food":
        sup = dataLengths.transport + dataLengths.energie;
        break;
      case "waste":
        sup = dataLengths.transport + dataLengths.energie + dataLengths.food;
        break;
      case "vacation":
        sup =
          dataLengths.transport +
          dataLengths.energie +
          dataLengths.food +
          dataLengths.waste;
        break;
    }
    return ((sup + currentQuestion) / dataLengths.total) * 100;
  }, [currentQuestion, dataLengths, tab]);

  const roundedProgress = Math.round(progress);

  const ColorVariants = {
    transport: { bg: "bg-section-transport/20", main: "bg-section-transport" },
    energie: { bg: "bg-section-energie/20", main: "bg-section-energie" },
    food: { bg: "bg-section-food/20", main: "bg-section-food" },
    waste: { bg: "bg-section-waste/20", main: "bg-section-waste" },
    vacation: { bg: "bg-section-vacation/20", main: "bg-section-vacation" },
  };

  return (
    <div className="max-w-6xl mx-auto relative">
      <div className="mb-8 ">
        <div className="flex justify-between items-center mb-2">
          <div className="md:w-fit flex-col md:flex-row flex text-sm font-medium text-muted-foreground self-end">
            <span className="inline-block">{currentSectionName}</span>
            <span className="hidden md:block">&nbsp;-&nbsp;</span>
            {t("title", {
              current: currentQuestion + 1,
              total: currentSectionDataLength,
            })}
          </div>
          <div className="flex">
            <span className="text-sm mr-4 font-medium text-muted-foreground self-end">
              {t("percentage", { value: roundedProgress })}
            </span>
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
}

export default ProgressBar;
