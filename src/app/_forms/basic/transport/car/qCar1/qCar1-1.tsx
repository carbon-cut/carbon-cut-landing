import React, { useEffect } from "react";
import Question from "../../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../../components/content";
import { QuestionProps } from "../../../../types";
import { useQuery } from "@tanstack/react-query";
import FormCombox from "../../../../components/combox";
import Input from "@/app/_forms/components/input";
import { Button } from "@/components/ui/button";
import { useWatch } from "react-hook-form";

interface Props {
  index: number;
}

const QuestionCompo1: React.FC<QuestionProps & Props> = ({ index, mainForm }) => {
  const t = useScopedI18n("forms.basic.transport.qCar1-1");

  const make = useWatch({
    control: mainForm.control,
    name: `transport.cars.${index}.make`,
  });

  const useCustomMake =
    useWatch({
      control: mainForm.control,
      name: `transport.cars.${index}.otherMake`,
      defaultValue: false,
    }) ?? false;
  const useCustomModel =
    useWatch({
      control: mainForm.control,
      name: `transport.cars.${index}.otherModel`,
      defaultValue: false,
    }) ?? false;

  const setUseCustomMake = (value: boolean) => {
    mainForm.setValue(`transport.cars.${index}.otherMake`, value);
    mainForm.setValue(`transport.cars.${index}.make`, "");
  };
  const setUseCustomModel = (value: boolean) => {
    mainForm.setValue(`transport.cars.${index}.otherModel`, value);
    mainForm.setValue(`transport.cars.${index}.model`, "");
  };

  const { data: cars, isLoading: makesLoading } = useQuery<
    { value: string; label: string }[],
    Error
  >({
    queryKey: ["carMakes"],
    queryFn: async () => {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/carbon-footprint/forms/cars/makes`
      ).then((res) => res.json());
      return data.map((ele: any) => ({ value: ele.make, label: ele.make }));
    },
    staleTime: Infinity,
  });

  const { data: models, isLoading: modelsLoading } = useQuery<
    { value: string; label: string }[],
    Error
  >({
    queryKey: ["carModels", make],
    queryFn: async () => {
      return fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/carbon-footprint/forms/cars/models?make=${make}`
      )
        .then((res) => {
          const daa = res.json();
          return daa;
        })
        .then((daa) => {
          return daa;
        });
    },
    enabled: !!make && !useCustomMake,
    select: (data) => data.map((ele: any) => ({ value: ele.model, label: ele.model })),
  });

  return (
    <div className="">
      <div>
        <Question className="text-lg text-center font-bold">{t("q")}</Question>
      </div>
      <Content className="pl-0 pr-0 grid md:grid-cols-2 gap-6 mt-6 md:my-12">
        <div className="">
          {useCustomMake ? (
            <Input
              type="text"
              form={mainForm}
              name={`transport.cars.${index}.make`}
              label={t("otherMakeLabel")}
              placeholder={t("otherMakePlaceholder")}
              className="md:w-10/12"
            />
          ) : (
            <FormCombox
              name={`transport.cars.${index}.make`}
              data={cars ?? []}
              form={mainForm}
              label={t("l1")}
              className="md:w-10/12"
              loading={makesLoading}
            />
          )}
          <Button
            type="button"
            variant="link"
            size="sm"
            className="h-auto px-0 text-xs font-semibold text-section-energie/90"
            onClick={() => {
              if (useCustomMake) {
                setUseCustomMake(false);
              } else {
                setUseCustomMake(true);
                setUseCustomModel(true);
              }
            }}
          >
            {useCustomMake ? t("backToList") : t("notListed")}
          </Button>
        </div>
        <div className="">
          {useCustomModel ? (
            <Input
              type="text"
              form={mainForm}
              name={`transport.cars.${index}.model`}
              label={t("otherModelLabel")}
              placeholder={t("otherModelPlaceholder")}
              className="md:w-10/12"
              disabled={!make || make == ""}
            />
          ) : (
            <FormCombox
              name={`transport.cars.${index}.model`}
              data={models ?? []}
              loading={modelsLoading}
              form={mainForm}
              label={t("l2")}
              className="md:w-10/12"
              disabled={!make || make == ""}
            />
          )}
          <Button
            type="button"
            variant="link"
            size="sm"
            className="h-auto px-0 text-xs font-semibold text-section-energie/90"
            disabled={!make || make == "" || useCustomMake}
            onClick={() => {
              if (useCustomModel) {
                setUseCustomModel(false);
              } else {
                setUseCustomModel(true);
              }
            }}
          >
            {useCustomModel ? t("backToList") : t("notListed")}
          </Button>
        </div>
      </Content>
    </div>
  );
};
export default QuestionCompo1;
