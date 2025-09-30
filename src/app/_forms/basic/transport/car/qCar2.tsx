import React from "react";
import Question from "../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/content";
import { QuestionProps } from "../../../types";
import Input from "../../../components/input";
import {  useQuery } from "@tanstack/react-query";
import CarTitle from "./components/carTitle";

const QCar2 = (index: number) => {
  function CarComponent({ mainForm }: QuestionProps) {
    const t = useScopedI18n("forms.basic.transport.qCar2");
/*
    const isCombustion = //@ts-ignore
      mainForm.getValues(`transport.cars.${index}.fuelType`) != "Electrique";

     const { data: cylinders } = useQuery({
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
      <div className="py-12">
        <CarTitle mainForm={mainForm} index={index} />
        <Question className='mb-12'>{t("q")}</Question>
        <Content>
          {/* {cylinders ? (
            <Content>
              <h4>Cylinders:</h4>
              <Radio
                name={`transport.cars.${index}.carEngine`}
                form={mainForm}
                options={cylinders.map((cyl: string) => ({
                  label: cyl,
                  value: cyl,
                }))}
              />
            </Content>
          ) : (
            <></>
          )} */}
            <Input
              name={`transport.cars.${index}.carConsumption`}
              label={t("l5")}
              placeholder={t("l5")}
              form={mainForm}
              type="number"
            />
          </Content>
      </div>
    );
  }
  CarComponent["Symbol"] = {
    question: "forms.basic.transport.qCar2.q",
    fields: [
      `transport.cars.${index}.carEngine`,
      `transport.cars.${index}.carConsumption`,
    ],
  };
  return CarComponent;
};

export default QCar2;
