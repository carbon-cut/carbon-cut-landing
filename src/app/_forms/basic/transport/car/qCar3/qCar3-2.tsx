import { FuelTypes, QuestionProps } from "@/app/_forms/types";
import { useScopedI18n } from "@/locales/client";
import React, { useEffect, useMemo, useState } from "react";
import CarTitle from "../components/carTitle";
import Question from "@/app/_forms/components/question";
import Content from "@/app/_forms/components/content";
import Input from "@/app/_forms/components/input";
import SegmentedControl from "@/components/ui/segmentedControl";

function QCarComponent({ mainForm, index, prevAction, next, prev }: QuestionProps & { index: number }) {
  useEffect(() => {
    if (
      mainForm.getValues(`transport.cars.${index}.engine`) !==
        "Plug-in Hybrid" 
    ) {
      if (prevAction === "next") next();
      else if (prevAction === "prev") prev();
      else next();
    }
  }, []);

  const t = useScopedI18n("forms.basic.transport.qCar3");
  const ti = useScopedI18n("forms");

  const [selectedUnit, setSelectedUnit] = useState<"unit" | "money">("unit");

  return (
    <div>
      <CarTitle mainForm={mainForm} index={index} />
      <Question>{t("q1E")}</Question>
      <Content>
        <SegmentedControl
          state={selectedUnit}
          setState={setSelectedUnit}
          options={[
            { label: ti("unit", { unit: 'kWh' }), value: "unit" },
            { label: "En euros dépensés", value: "money" },
          ]}
          className="mb-4"
        />
        <Input
          form={mainForm}
          name={`transport.cars.${index}.${
            selectedUnit === "unit"  ? "electricConsumption": "moneyElectricConsumption"
          }`}
          type="number"
          label={
            selectedUnit === "unit"
              ?  t("q1LE") : "Montant dépensé par semaine (€)"
          }
        />
        <div className="w-1/2 mt-4">
          <Input
            form={mainForm}
            name={`transport.cars.${index}.electricPrice`}
            type="number"
            label={`Prix de kWh (€)`}
            disabled={selectedUnit === "unit"}
          />
        </div>
      </Content>
    </div>
  );
}
export default QCarComponent;
