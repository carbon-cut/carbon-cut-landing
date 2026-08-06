import React from "react";
import { useScopedI18n } from "@/locales/client";
import { QuestionProps, QuestionFC } from "../../../types";
import { FieldInput as Input } from "@/components/forms";
import { useQuery } from "@tanstack/react-query";
import CarTitle from "./components/carTitle";
import QuestionPromptStack from "@/app/_forms/components/QuestionPromptStack";

const QCarComponent2 = ({ mainForm, index }: QuestionProps & { index: number }) => {
  const t = useScopedI18n("forms.basic.transport.qCar2");

  const isCombustion = mainForm.getValues(`transport.cars.${index}.engine`) != "Electrique";

  const isElectric =
    mainForm.getValues(`transport.cars.${index}.engine`) === "Electrique" ||
    mainForm.getValues(`transport.cars.${index}.engine`) === "Plug-in Hybrid";

  return (
    <div className="py-2">
      <CarTitle mainForm={mainForm} index={index} />
      <QuestionPromptStack prompt={t("q")}>
        {isCombustion ? (
          <Input
            name={`transport.cars.${index}.thermalAvg`}
            label={t("l11")}
            unitAdornment={t("l12")}
            unitAdornmentPlacement="end"
            form={mainForm}
            type="number"
          />
        ) : null}

        {isElectric ? (
          <Input
            name={`transport.cars.${index}.electricAvg`}
            label={t("l21")}
            unitAdornment={t("l22")}
            unitAdornmentPlacement="end"
            form={mainForm}
            type="number"
          />
        ) : null}

        <Input
          name={`transport.cars.${index}.distanceWeekly`}
          form={mainForm}
          type="number"
          label={t("l5")}
          unitAdornment={t("u5")}
          unitAdornmentPlacement="end"
        />
      </QuestionPromptStack>
    </div>
  );
};

const QCar2 = (index: number) => {
  // eslint-disable-next-line react/display-name
  const CarComponent: QuestionFC = (props: QuestionProps) => (
    <QCarComponent2 {...props} index={index} />
  );
  CarComponent["Symbol"] = {
    question: ["forms.basic.transport.qCar2.title", { index: index }],
    fields: [
      `transport.cars.${index}.thermalAvg`,
      `transport.cars.${index}.electricAvg`,
      `transport.cars.${index}.distanceWeekly`,
    ],
  };
  return CarComponent;
};
export default QCar2;
