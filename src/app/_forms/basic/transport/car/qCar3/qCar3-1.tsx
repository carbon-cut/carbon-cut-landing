import { FuelTypes, QuestionProps } from "@/app/_forms/types";
import { useScopedI18n } from "@/locales/client";
import React, { useMemo, useState } from "react";
import CarTitle from "../components/carTitle";
import Question from "@/app/_forms/components/QuestionPrompt";
import Content from "@/app/_forms/components/QuestionContent";
import { FieldInput as Input } from "@/components/forms";
import SegmentedControl from "@/components/ui/segmentedControl";
import QuestionModeSwitch from "@/app/_forms/components/QuestionModeSwitch";

function QCar31({ mainForm, index }: QuestionProps & { index: number }) {
  const t = useScopedI18n("forms.basic.transport.qCar3");
  const ti = useScopedI18n("forms");

  const [selectedUnit, setSelectedUnit] = useState<"unit" | "money">(
    mainForm.getValues(`transport.cars.${index}.engine`) === "Electrique"
      ? mainForm.getValues(`transport.cars.${index}.electricConsumption`)
        ? "unit"
        : mainForm.getValues(`transport.cars.${index}.moneyElectricConsumption`)
          ? "money"
          : "unit"
      : mainForm.getValues(`transport.cars.${index}.thermalConsumption`)
        ? "unit"
        : mainForm.getValues(`transport.cars.${index}.moneyThermalConsumption`)
          ? "money"
          : "unit"
  );

  const [carType] = useState<FuelTypes | null | undefined | false>(
    mainForm.getValues(`transport.cars.${index}.engine`)
  );
  const unit = useMemo(() => {
    return carType === "Electrique" ? "kWh" : "L";
  }, [carType]);

  const priceFieldName = `transport.cars.${index}.${
    carType === "Electrique" ? "electricPrice" : "thermalPrice"
  }` as const;

  const unitConsumptionFieldName = `transport.cars.${index}.${
    carType === "Electrique" ? "electricConsumption" : "thermalConsumption"
  }` as const;

  const moneyConsumptionFieldName = `transport.cars.${index}.${
    carType === "Electrique" ? "moneyElectricConsumption" : "moneyThermalConsumption"
  }` as const;

  const consumptionFieldName =
    selectedUnit === "unit" ? unitConsumptionFieldName : moneyConsumptionFieldName;

  return (
    <div>
      <CarTitle mainForm={mainForm} index={index} />
      <Question>{carType === "Electrique" ? t("q1E") : t("q1L")}</Question>
      <Content>
        <QuestionModeSwitch
          note={{
            title: t("note.title"),
            description: t("q2"),
          }}
          switchControl={
            <SegmentedControl
              state={selectedUnit}
              setState={setSelectedUnit}
              options={[
                { label: ti("unit", { unit: unit }), value: "unit" },
                { label: t("modes.money"), value: "money" },
              ]}
              tone="transport"
            />
          }
          primaryField={
            <Input
              key={selectedUnit}
              form={mainForm}
              name={consumptionFieldName}
              type="number"
              label={
                selectedUnit === "unit"
                  ? carType === "Electrique"
                    ? t("q1LE")
                    : t("q1LL")
                  : t("labels.moneySpent")
              }
              unitAdornment={selectedUnit === "unit" ? unit : "€"}
              unitAdornmentPlacement="end"
              attachedFields={[
                priceFieldName,
                selectedUnit === "unit" ? moneyConsumptionFieldName : unitConsumptionFieldName,
              ]}
            />
          }
          secondaryField={
            <Input
              form={mainForm}
              name={priceFieldName}
              type="number"
              label={t("labels.price", { unit })}
              unitAdornment="€"
              unitAdornmentPlacement="end"
              disabled={selectedUnit === "unit"}
              attachedFields={[unitConsumptionFieldName, moneyConsumptionFieldName]}
            />
          }
        />
      </Content>
    </div>
  );
}

export default QCar31;
