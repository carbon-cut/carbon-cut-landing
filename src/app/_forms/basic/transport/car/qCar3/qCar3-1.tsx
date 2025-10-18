import { FuelTypes, QuestionProps } from "@/app/_forms/types";
import { useScopedI18n } from "@/locales/client";
import React, { useMemo, useState } from "react";
import CarTitle from "../components/carTitle";
import Question from "@/app/_forms/components/question";
import Content from "@/app/_forms/components/content";
import Input from "@/app/_forms/components/input";
import SegmentedControl from "@/components/ui/segmentedControl";

  function QCar31 ({ mainForm, index }: QuestionProps & {index: number}) {
    const t = useScopedI18n("forms.basic.transport.qCar3");
    const ti = useScopedI18n("forms");

    const [selectedUnit, setSelectedUnit] = useState<"unit" | "money">("unit");

    const [carType] = useState<FuelTypes | null | undefined>(
      mainForm.getValues(`transport.cars.${index}.engine`)
    );
    const unit = useMemo(() => {
      return carType === "Electrique" ? "kWh" : "L";
    }, [carType]);

    return (
      <div>
        <CarTitle mainForm={mainForm} index={index} />
        <Question>{carType === "Electrique" ? t("q1E") : t("q1L")}</Question>
        <Content>
            <SegmentedControl
              state={selectedUnit}
              setState={setSelectedUnit}
              options={[
                { label: ti("unit", { unit:unit }), value: "unit" },
                { label:  "En euros dépensés", value: "money" },
              ]}
              className="mb-4"
            />
          <Input
            form={mainForm}
            name={`transport.cars.${index}.${
                selectedUnit === "unit" ? 
                (carType === "Electrique" ? "electricConsumption" : "thermalConsumption") :
                 carType === "Electrique" ? "moneyElectricConsumption" : "moneyThermalConsumption"
                }`}
            type="number"
            label={(selectedUnit === "unit") ? (carType === "Electrique" ? t("q1LE") : t("q1LL")): 'Montant dépensé par semaine (€)'}
            //unit={carType === "Electrique" ? unit("kW h") : unit("L")}
            //onChange={() => setChange((prev) => !prev)}
          />
          <div className="w-1/2 mt-4">
        <Input
            form={mainForm}
            name={`transport.cars.${index}.${
              carType === "Electrique" ?
              'electricPrice': 'thermalPrice'}`}
            type="number"
            label={`Prix de ${unit} (€)`}
            disabled={selectedUnit === "unit"}
            //onChange={() => setChange((prev) => !prev)}
          />
          </div>
        </Content>
      </div>
    );
  };

export default QCar31;
