import React from "react";
import Question from "../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/content";
import { QuestionProps } from "../../../types";
import Input from "../../../components/input";
import {  useQuery } from "@tanstack/react-query";
import CarTitle from "./components/carTitle";

const QCarComponent2 =  ({ mainForm, index }: QuestionProps & {index: number}) => {
    const t = useScopedI18n("forms.basic.transport.qCar2");

    const isCombustion = 
      mainForm.getValues(`transport.cars.${index}.engine`) != "Electrique";

    const isElectric = 
      mainForm.getValues(`transport.cars.${index}.engine`) === "Electrique"
      || mainForm.getValues(`transport.cars.${index}.engine`) === "Plug-in Hybrid";

/*     const { data: cylinders } = useQuery({
      queryKey: [
        "cylinders", //@ts-ignore
        mainForm.getValues(`transport.cars.${index}.carModel`),
      ],
       queryFn: async () => {
        if (!isCombustion) return null;
        const result = await fetch(
          //@ts-ignore
          `${
            process.env.NEXT_PUBLIC_SERVER
          }/api/carbon-footprint/forms/cars/cylinders?model=${mainForm.getValues(
            //@ts-ignore
            `transport.cars.${index}.carModel`,
          )}`,
        ).then((res) => res.json());
        if (result.error) throw new Error(result.error.message);
        return result;
      },
    }); */

    return (
      <div className="py-2">
        <CarTitle mainForm={mainForm} index={index} />
        <Question className='mb-12'>{t("q")}</Question>
        <Content className="mb-0">
          <>
            {isCombustion && <Input
              name={`transport.cars.${index}.thermalAvg`}
              label={t("l11")}
              placeholder={t("l12")}
              form={mainForm}
              type="number"
            />}
          </>
            <>
            {isElectric && <Input
              name={`transport.cars.${index}.electricAvg`}
              label={t("l21")}
              placeholder={t("l22")}
              form={mainForm}
              type="number"
            />}
            </>
            <div className="mb-8" />
            <Input
              name={`transport.cars.${index}.distanceWeekly`}
              //label={t("l5")}
              placeholder={'km'}
              form={mainForm}
              type="number"
              label={"Distance parcourue par semaine (km)"}
            />
          </Content>
      </div>
    );
  }
    QCarComponent2["Symbol"] = {
    question: "forms.basic.transport.qCar2.q",
    fields: [
      "transport.cars.${index}.carEngine",
      "transport.cars.${index}.carConsumption",
    ],
  };


export default QCarComponent2;
