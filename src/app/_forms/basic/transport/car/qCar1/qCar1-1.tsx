import React from "react";
import Question from "../../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../../components/content";
import { QuestionProps } from "../../../../types";
import { useQuery } from "@tanstack/react-query";
import FormCombox from "../../../../components/combox";

interface Props {
  index: number;
  make: string | undefined | null;
  setMake: React.Dispatch<any>;
}

const QuestionCompo1: React.FC<QuestionProps & Props> = ({
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
      ).then((res) => {const daa = res.json();return daa}).then((daa) => {console.log("the fuck:", daa);return daa});
    },
    enabled: !!make,
    select: (data) => data.map((ele: any) => ({ value: ele.model, label: ele.model }))
  });

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
      <div><Question className='text-lg text-center font-bold'>{t("q")}</Question></div>
      <Content className="pl-0 grid grid-cols-2 gap-6 my-12">
        <div className="">
          <FormCombox
            setValue={setMake}
            name={`transport.cars.${index}.make`}
            data={cars ?? []}
            form={mainForm}
            label={t("l1")}
            className="w-10/12"
          />
          </div>
          <div className="">
          <FormCombox
            name={`transport.cars.${index}.model`}
            data={query?.data ?? []}
            form={mainForm}
            label={t("l2")}
            className="w-10/12"
            disabled={!make || make == ""}
          />
          </div>
        </Content>
    </div>
  );
};
export default QuestionCompo1;
