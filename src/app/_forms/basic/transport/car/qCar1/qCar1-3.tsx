import Content from "@/app/_forms/components/content";
import Question from "@/app/_forms/components/question";
import Radio from "@/app/_forms/components/radio";
import { FuelTypes, QuestionProps } from "@/app/_forms/types";
import Input from "@/app/_forms/components/input";
import { useScopedI18n } from "@/locales/client";
import React, { useEffect, useState } from "react";

const fuelTypes = ["Diesel", "Gasoline", "natural Gaz", "other"] as const;
/**
 * Third question about fuel of hybrid cars
 */
type Props = {
  index: number;
};

const QuestionCompo3: React.FC<QuestionProps & Props> = ({
  index,
  mainForm,
  next,
  prevAction,
  prev,
}) => {
  useEffect(() => {
    if (
      mainForm.getValues(`transport.cars.${index}.engine`) !== "Plug-in Hybrid" &&
      mainForm.getValues(`transport.cars.${index}.engine`) !== "mild Hybrid"
    ) {
      if (prevAction === "next") next();
      else if (prevAction === "prev") prev();
      else next();
    }
  }, []);

  const [secondThermal, setSecondThermal] = useState(
    mainForm.getValues(`transport.cars.${index}.secondThermal`)
  );

  const t = useScopedI18n("forms.basic.transport.qCar1-3");
  return (
    <div>
      <Question>{t("q")}</Question>
      <Content className="flex md:flex-row flex-col justify-start">
        <div className="self-start md:w-1/2 ">
          <Radio
            className=" w-2/3 flex justify-between  mx-0"
            setState={setSecondThermal}
            name={`transport.cars.${index}.secondThermal`}
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
          name={`transport.cars.${index}.otherSecondThermal`}
          label={"Autre"}
          disabled={secondThermal !== "other" ? true : false}
        />
      </Content>
    </div>
  );
};
export default QuestionCompo3;
