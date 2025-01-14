import React, { useCallback, useEffect, useState } from "react";
import Question from "../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/content";
import { FuelTypes, QuestionProps } from "../../../types";
import Input from "../../../components/input";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

const QCar3 = (index: number) => {
  function CarComponent({ mainForm, setIsDirty }: QuestionProps) {
    const [carType] = useState<FuelTypes>(
      mainForm.getValues(`transport.cars.${index}.carType`),
    );
    const [warning, setWarning] = useState<string | null>(null);
    const [change, setChange] = useState<boolean>(false);
    const t = useScopedI18n("forms.basic.transport.qCar3");
    const ti = useScopedI18n("forms");

    const unit = (u: string) => {
      return ti("unit", { unit: u });
    };

    useEffect(() => {
      //@ts-ignore
      const someField = //@ts-ignore
        mainForm.getValues(`transport.cars.${index}.carEConsmption`) || //@ts-ignore
        mainForm.getValues(`transport.cars.${index}.carLConsumption`) || //@ts-ignore
        mainForm.getValues(`transport.cars.${index}.carMoneyConsumption`) || //@ts-ignore
        mainForm.getValues(`transport.cars.${index}.carDistanceConsumption`);
      if (someField) setIsDirty(true);
      return () => {
        setIsDirty(false);
      };
    });

    useEffect(() => {
      let carCalculatedConsumption = null;
      console.log("calculating");
      const [
        {
          carConsumption,
          carEConsmption,
          carLConsumption,
          carDistanceConsumption,
        },
      ] = mainForm.getValues([`transport.cars.${index}`]);
      switch (carType) {
        case "Electrique":
          carCalculatedConsumption =
            (carEConsmption / carDistanceConsumption) * 100;
          break;
        case "Plug-in Hybrid":
          //there is no meaning as the avg consumption are mesured with two diffrent units
          break;
        default:
          carCalculatedConsumption =
            (carLConsumption / carDistanceConsumption) * 100;
      }
      if (carCalculatedConsumption && carConsumption) {
        if (
          carCalculatedConsumption > 1.1 * carConsumption ||
          carCalculatedConsumption < 0.9 * carConsumption
        )
          setWarning(
            `Warning: the calculated avreage consumption per 100Km ${carCalculatedConsumption} doesn't match the provided avreage consumption ${carConsumption}`,
          );
      }
    }, [change]);

    return (
      <div>
        <h3 className="font-semibold text-primary">
          {
            //@ts-ignore
            mainForm.getValues(`transport.cars.${index}.carMake`)
          }
          :{" "}
          <span className="font-medium">
            {mainForm.getValues(`transport.cars.${index}.carModel`)}
          </span>
        </h3>
        <div className="grid grid-cols-2">
          <Question>{carType === "Electrique" ? t("q1E") : t("q1L")}</Question>
          {carType === "Plug-in Hybrid" && <Question>{t("q1E")}</Question>}
        </div>
        <Content>
          <div className="grid grid-cols-2">
            <Input
              half
              form={mainForm}
              name={`transport.cars.${index}.${
                carType === "Electrique" ? "carEConsmption" : "carLConsumption"
              }`}
              type="number"
              unit={carType === "Electrique" ? unit("kW h") : unit("L")}
              onChange={() => setChange((prev) => !prev)}
            />
            {carType === "Plug-in Hybrid" ? (
              <Input
                half
                form={mainForm}
                name={`transport.cars.${index}.carEConsmption`}
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
          {carType === "Plug-in Hybrid" ? (
            <Question>{t("q2")}</Question>
          ) : (
            <></>
          )}
        </div>
        <Content>
          <div className="grid grid-cols-2">
            <Input
              form={mainForm}
              name={`transport.cars.${index}.carMoneyConsumption`}
              type="number"
              half
              onChange={() => setChange((prev) => !prev)}
            />
            {carType === "Plug-in Hybrid" ? (
              <Input
                form={mainForm}
                name={`transport.cars.${index}.carMoneyEConsumption`}
                type="number"
                half
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
            name={`transport.cars.${index}.carDistanceConsumption`}
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
  CarComponent["Symbol"] = {
    question: "forms.basic.transport.qCar3",
    fields: [
      `transport.cars.${index}.carMake`,
      `transport.cars.${index}.carModel`,
    ],
  };
  return CarComponent;
};

export default QCar3;
