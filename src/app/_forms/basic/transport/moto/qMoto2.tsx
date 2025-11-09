/* import React, { useEffect, useState } from "react";
import Question from "../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/content";
import { QuestionProps } from "../../../types";
import Input from "../../../components/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import CarTitle from "./components/carTitle";
import Radio from "../../../components/radio";
import { Label } from "@radix-ui/react-label";

const QMoto2 = (index: number) => {
  function MotoComponent({ mainForm,  }: QuestionProps) {
    const t = useScopedI18n("forms.basic.transport.qMotos.qMoto2");

    const isCombustion = //@ts-ignore
      mainForm.getValues(`transport.motos.${index}.fuelType`) != "Electrique";

    return (
      <div>
        <CarTitle mainForm={mainForm} index={index} />
        <Question>{t("q")}</Question>
        <Content>
          <Content>
            <Input
              name={`transport.motos.${index}.motoEngine`}
              form={mainForm}
              type="number"
              label="Cylinders:"
            />
          </Content>

          <Content>
            <Input
              name={`transport.motos.${index}.motoConsumption`}
              label={t("l5")}
              placeholder={t("l5")}
              form={mainForm}
              unit={
                mainForm.getValues(`transport.motos.${index}.motoType`) ===
                "Electrique"
                  ? "KWh/100 Km"
                  : "L/100 Km"
              }
            />
          </Content>
        </Content>
      </div>
    );
  }
  MotoComponent["Symbol"] = {
    question: "forms.basic.transport.qMotos.qMoto2.q",
    fields: [
      `transport.motos.${index}.motoEngine`,
      `transport.motos.${index}.motoConsumption`,
    ],
  };
  return MotoComponent;
};

export default QMoto2;
 */