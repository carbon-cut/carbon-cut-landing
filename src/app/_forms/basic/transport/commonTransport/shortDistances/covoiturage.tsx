import { QuestionProps } from "../../../../types";
import { useQuery } from "@tanstack/react-query";
import Input from "@/app/_forms/components/input";
import { useScopedI18n } from "@/locales/client";
import { Button } from "@/components/ui/button";
import { UseFieldArrayRemove } from "react-hook-form";
import { X } from "lucide-react";
import FormSelect from "@/components/forms/formSelect";

const fuelTypes = [
  "Electrique",
  "mild Hybrid",
  "Plug-in Hybrid",
  "natural Gaz",
  "Diesel",
  "Gasoline",
  "other",
] as const;

type Props = {
  idx: number;
};

const Covoiturage = ({ mainForm, idx}: QuestionProps & Props) => {
  const t = useScopedI18n(
    "forms.basic.transport.commonTransport.shortDistances.covoiturage"
  );

  const tEngines = useScopedI18n(
    "forms.basic.transport.commonTransport.shortDistances.covoiturage.engines"
  );

  /*   const { data: cars } = useQuery<{ value: string; label: string }[], Error>({
    queryKey: ["carMakes"],
    queryFn: async () => {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/carbon-footprint/forms/cars/makes`,
        {
          headers: new Headers({ "User-Agent": "69420" }),
        }
      ).then((res) => res.json());
      return data.map((ele: any) => ({ value: ele.make, label: ele.make }));
    },
  }); */

  return (
    <>
      <Input
        form={mainForm}
        type="text"
        label={t("make")}
        name={`transport.commonTransport.shortDistances.covoiturage.${idx}.make`}
      />
      <div className="w-full">
        <FormSelect
          name={`transport.commonTransport.shortDistances.covoiturage.${idx}.engine`}
          form={mainForm}
          label={t("engine")}
          data={fuelTypes.map((ele) => ({
            value: ele,
            label: tEngines(ele),
          }))}
          fallback
        />
      </div>
      <Input
        type="number"
        form={mainForm}
        name={`transport.commonTransport.shortDistances.covoiturage.${idx}.distance`}
        label={t("distance")}
        placeholder="(km)"
        fallback
      />
      <Input
        type="number"
        label={t("people")}
        form={mainForm}
        name={`transport.commonTransport.shortDistances.covoiturage.${idx}.pepole`}
        fallback
      />
      <Input
        type="number"
        label={t("frequency")}
        form={mainForm}
        name={`transport.commonTransport.shortDistances.covoiturage.${idx}.frequency`}
        fallback
      />
    </>
  );
};

export default Covoiturage;
