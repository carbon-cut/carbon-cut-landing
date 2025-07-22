import React, { useEffect, useState } from "react";
import Question from "../../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../../components/content";
import { QuestionProps } from "../../../../types";
import Input from "../../../../components/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import FormCombox from "../../../../components/combox";

interface Props {
  index: number;
  make: string | undefined | null;
  setMake: React.Dispatch<any>;
  setModel: React.Dispatch<any>;
}

const QuestionCompo1: React.FC<QuestionProps & Props> = ({
  setModel,
  make,
  setMake,
  index,
  mainForm,
  setIsDirty,
}) => {
  const t = useScopedI18n("forms.basic.transport.qCar1-1");

  const { data: cars } = useQuery<{ value: string; label: string }[], Error>({
    queryKey: ["carMakes"],
    queryFn: async () => {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/carbon-footprint/forms/cars/makes`,
        {
          headers: new Headers({ skip_zrok_interstitial: "true" }),
        },
      ).then((res) => res.json());
      return data.map((ele: any) => ({ value: ele.make, label: ele.make }));
    },
  });

  const query = useQuery({
    queryKey: ["carModels", make],
    queryFn: async () => {
      return fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/carbon-footprint/forms/cars/models?make=${make}`,
        {},
      ).then((res) => res.json());
    },
    enabled: !!make,
    select: (data) => data.map((ele: any) => ({ value: ele.model, label: ele.model }))
  });
    console.log('data', query.data, 'make:', make);

/*   useEffect(() => {
    if (make && make != "") {
      mutation.mutate(make);
      setIsDirty(true);
    }
    return () => {
      setIsDirty(false);
    };
  }, [make]); */

  return (
    <div className="">
      <Question className=''>{t("q")}</Question>
      <Content className="pl-0 grid grid-cols-2 gap-6 my-12">
        <div className="">
          <FormCombox
            required
            setValue={setMake}
            name={`transport.cars.${index}.carMake`}
            data={cars ?? []}
            form={mainForm}
            label={t("l1")}
            className="w-10/12"
          />
          </div>
          <div className="">
          <FormCombox
            required
            setValue={setModel}
            name={`transport.cars.${index}.carModel`}
            data={query?.data ?? []}
            form={mainForm}
            label={t("l2")}
            className="w-10/12"
          />
          </div>
        </Content>
    </div>
  );
};
export default QuestionCompo1;
