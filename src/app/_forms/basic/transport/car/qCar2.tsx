import React from "react";
import Question from "../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/content";
import { QuestionProps, QuestionFC } from "../../../types";
import Input from "../../../components/input";
import { useQuery } from "@tanstack/react-query";
import CarTitle from "./components/carTitle";

const QCarComponent2 = ({ mainForm, index }: QuestionProps & { index: number }) => {
  const t = useScopedI18n("forms.basic.transport.qCar2");

  const isCombustion = mainForm.getValues(`transport.cars.${index}.engine`) != "Electrique";

  const isElectric =
    mainForm.getValues(`transport.cars.${index}.engine`) === "Electrique" ||
    mainForm.getValues(`transport.cars.${index}.engine`) === "Plug-in Hybrid";

  return (
    <div className="py-2">
      <CarTitle mainForm={mainForm} index={index} />
      <Question className="mb-12">{t("q")}</Question>
      <Content className="mb-0">
        <>
          {isCombustion && (
            <Input
              name={`transport.cars.${index}.thermalAvg`}
              label={t("l11")}
              placeholder={t("l12")}
              form={mainForm}
              type="number"
            />
          )}
        </>
        <>
          {isElectric && (
            <Input
              name={`transport.cars.${index}.electricAvg`}
              label={t("l21")}
              placeholder={t("l22")}
              form={mainForm}
              type="number"
            />
          )}
        </>
        <div className="mb-8" />
        <Input
          name={`transport.cars.${index}.distanceWeekly`}
          //label={t("l5")}
          placeholder={"km"}
          form={mainForm}
          type="number"
          label={"Distance parcourue par semaine (km)"}
        />
      </Content>
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
