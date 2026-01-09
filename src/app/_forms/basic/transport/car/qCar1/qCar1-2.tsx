import React, { useEffect, useState } from "react";
import Question from "../../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../../components/content";
import Radio from "@/app/_forms/components/radio";
import { FuelTypes, QuestionProps } from "../../../../types";
import Input from "@/app/_forms/components/input";
import CarTitle from "../components/carTitle";
import { QCar322 } from "../qCar3";
import QCar13 from "./qCar1-3Question";

const fuelTypes: FuelTypes[] = [
  "Electrique",
  "mild Hybrid",
  "Plug-in Hybrid",
  "natural Gaz",
  "Diesel",
  "Gasoline",
  "other",
];

const QuestionCompo2: React.FC<QuestionProps & { index: number }> = ({
  index,
  mainForm,
  setVerifyFields,
  setQuestions,
  currentIndex,
  setOnSubmit,
}) => {
  const t = useScopedI18n("forms.basic.transport.qCar1-2");

  const [carType, setCarType] = useState(mainForm.getValues(`transport.cars.${index}.engine`));
  const [prevEngine] = useState(mainForm.getValues(`transport.cars.${index}.engine`));

  useEffect(() => {
    setVerifyFields([`transport.cars.${index}.engine`, `transport.cars.${index}.otherEngine`]);

    return () => {
      setVerifyFields([]);
    };
  }, [index]);

  useEffect(() => {
    setOnSubmit(() => async () => {
      const currentEngine = mainForm.getValues(`transport.cars.${index}.engine`);
      const prevHybrid = prevEngine === "Plug-in Hybrid" || prevEngine === "mild Hybrid";
      const nextHybrid = currentEngine === "Plug-in Hybrid" || currentEngine === "mild Hybrid";
      const prevPlugIn = prevEngine === "Plug-in Hybrid";
      const nextPlugIn = currentEngine === "Plug-in Hybrid";

      if (prevHybrid === nextHybrid && prevPlugIn === nextPlugIn) return;

      setQuestions((prev) => {
        const next = prev.slice();
        const questionCountPath = `transport.metaCars.${index}.questionCount` as const;
        const qCar311Index = currentIndex + 2 + (prevHybrid ? 1 : 0);
        const qCar32Index = qCar311Index + 1;
        let countDelta = 0;

        if (prevPlugIn !== nextPlugIn) {
          if (nextPlugIn) {
            next.splice(qCar32Index, 0, QCar322(index));
            countDelta += 1;
          } else {
            next.splice(qCar32Index, 1);
            countDelta -= 1;
          }
        }

        if (prevHybrid !== nextHybrid) {
          if (nextHybrid) {
            next.splice(currentIndex + 1, 0, QCar13(index));
            countDelta += 1;
          } else {
            next.splice(currentIndex + 1, 1);
            countDelta -= 1;
          }
        }

        if (countDelta !== 0) {
          const currentCount = mainForm.getValues(questionCountPath);
          const safeCount = typeof currentCount === "number" ? currentCount : 0;
          mainForm.setValue(questionCountPath, Math.max(0, safeCount + countDelta));
        }

        return next;
      });
    });

    return () => {
      setOnSubmit(() => async () => {});
    };
  }, [currentIndex, index, mainForm, prevEngine, setOnSubmit, setQuestions]);

  return (
    <>
      <div>
        <CarTitle mainForm={mainForm} index={index} />
        <Question>{t("q")}</Question>
        <Content className="flex md:flex-row flex-col justify-start ">
          <div className="self-start md:w-5/6 w-full">
            <Radio
              className="md:w-5/6 w-full flex justify-between  mx-0"
              setState={setCarType}
              name={`transport.cars.${index}.engine`}
              form={mainForm}
              options={
                fuelTypes?.map((element: FuelTypes) => ({
                  label: t(element),
                  value: element,
                })) ?? []
              }
            />
          </div>
          <Input
            type="text"
            form={mainForm}
            name={`transport.cars.${index}.otherEngine`}
            label={"Autre"}
            disabled={carType !== "other" ? true : false}
          />
        </Content>
      </div>
    </>
  );
};

export default QuestionCompo2;
