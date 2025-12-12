/* import React, { useCallback, useEffect, useState } from "react";
import Question from "../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/content";
import { FuelTypes, QuestionProps } from "../../../types";
import Input from "../../../components/input";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

const QMoto3 = (index: number) => {
  function MotoComponent({ mainForm, setIsDirty }: QuestionProps) {
    const [motoType] = useState<FuelTypes>(
      mainForm.getValues(`transport.motos.${index}.motoType`),
    );
    const [warning, setWarning] = useState<string | null>(null);
    const [change, setChange] = useState<boolean>(false);
    const t = useScopedI18n("forms.basic.transport.qMotos.qMoto3");
    const ti = useScopedI18n("forms");

    const unit = (u: string) => {
      return ti("unit", { unit: u });
    };

    useEffect(() => {
      //@ts-ignore
      const someField = //@ts-ignore
        mainForm.getValues(`transport.motos.${index}.motoEConsmption`) || //@ts-ignore
        mainForm.getValues(`transport.motos.${index}.motoLConsumption`) || //@ts-ignore
        mainForm.getValues(`transport.motos.${index}.motoMoneyConsumption`) || //@ts-ignore
        mainForm.getValues(`transport.motos.${index}.motoDistanceConsumption`);
      if (someField) setIsDirty(true);
      return () => {
        setIsDirty(false);
      };
    });

    useEffect(() => {
      let motoCalculatedConsumption = null;
      console.log("calculating");
      const [
        {
          motoConsumption,
          motoEConsmption,
          motoLConsumption,
          motoDistanceConsumption,
        },
      ] = mainForm.getValues([`transport.motos.${index}`]);
      switch (motoType) {
        case "Electrique":
          motoCalculatedConsumption =
            (motoEConsmption / motoDistanceConsumption) * 100;
          break;
        case "Plug-in Hybrid":
          //there is no meaning as the avg consumption are mesured with two diffrent units
          break;
        default:
          motoCalculatedConsumption =
            (motoLConsumption / motoDistanceConsumption) * 100;
      }
      if (motoCalculatedConsumption && motoConsumption) {
        if (
          motoCalculatedConsumption > 1.1 * motoConsumption ||
          motoCalculatedConsumption < 0.9 * motoConsumption
        )
          setWarning(
            `Warning: the calculated avreage consumption per 100Km ${motoCalculatedConsumption} doesn't match the provided avreage consumption ${motoConsumption}`,
          );
      }
    }, [change]);

    return (
      <div>
        <h3 className="font-semibold text-primary">
          {
            //@ts-ignore
            mainForm.getValues(`transport.motos.${index}.motoMake`)
          }
          :{" "}
          <span className="font-medium">
            {mainForm.getValues(`transport.motos.${index}.motoModel`)}
          </span>
        </h3>
        <div className="grid grid-cols-2">
          <Question>{motoType === "Electrique" ? t("q1E") : t("q1L")}</Question>
          {motoType === "Plug-in Hybrid" && <Question>{t("q1E")}</Question>}
        </div>
        <Content>
          <div className="grid grid-cols-2">
            <Input
              
              form={mainForm}
              name={`transport.motos.${index}.${
                motoType === "Electrique"
                  ? "motoEConsmption"
                  : "motoLConsumption"
              }`}
              type="number"
              unit={motoType === "Electrique" ? unit("kW h") : unit("L")}
              onChange={() => setChange((prev) => !prev)}
            />
            {motoType === "Plug-in Hybrid" ? (
              <Input
                
                form={mainForm}
                name={`transport.motos.${index}.motoEConsmption`}
                type="number"
                unit={unit("kW h")}
                onChange={() => setChange((prev) => !prev)}
              />
            ) : (
              <></>
            )}
          </div>
        </Content>
        <div className="grid grid-cols-2">
          <Question>{t("q2")}</Question>
          {motoType === "Plug-in Hybrid" ? (
            <Question>{t("q2")}</Question>
          ) : (
            <></>
          )}
        </div>
        <Content>
          <div className="grid grid-cols-2">
            <Input
              form={mainForm}
              name={`transport.motos.${index}.motoMoneyConsumption`}
              type="number"
              
              onChange={() => setChange((prev) => !prev)}
            />
            {motoType === "Plug-in Hybrid" ? (
              <Input
                form={mainForm}
                name={`transport.motos.${index}.motoMoneyEConsumption`}
                type="number"
                
                onChange={() => setChange((prev) => !prev)}
              />
            ) : (
              <></>
            )}
          </div>
        </Content>

        <Separator />

        <Question>{t("q3")}</Question>
        <Content>
          <Input
            form={mainForm}
            name={`transport.motos.${index}.motoDistanceConsumption`}
            type="number"
            onChange={() => setChange((prev) => !prev)}
          />
        </Content>
        {warning && (
          <Alert>
            <TriangleAlert className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>{warning}</AlertDescription>
          </Alert>
        )}
      </div>
    );
  }
  //TODO
  MotoComponent["Symbol"] = {
    question: "forms.basic.transport.qMotos.qMoto3",
    fields: [
      `transport.motos.${index}.motoMake`,
      `transport.motos.${index}.motoModel`,
    ],
  };
  return MotoComponent;
};

export default QMoto3;
 */
