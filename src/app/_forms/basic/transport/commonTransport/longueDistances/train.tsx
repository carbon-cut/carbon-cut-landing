import { QuestionProps } from "../../../../types";
import Input from "../../../../components/input";
import { useScopedI18n } from "@/locales/client";
import FormSelect from "@/components/forms/formSelect";

type Props = {
  idx: number;
};

const trainTypes = [
  "intercity", "TER", "TGV"
] as const;

const Train = ({ mainForm, idx }: QuestionProps & Props) => {
  const t = useScopedI18n(
    "forms.basic.transport.commonTransport.longueDistances.train"
  );

  const tTypes = useScopedI18n(
    "forms.basic.transport.commonTransport.longueDistances.train.types"
  );

  return (
    <>
      <FormSelect
        form={mainForm}
        name={`transport.commonTransport.longueDistances.train.${idx}.type`}
        data={trainTypes.map((type) => ({
          value: type,
          label: tTypes(type),
        }))}
        label={t("type")}
        fallback
      />
      <Input
        type="number"
        form={mainForm}
        name={`transport.commonTransport.longueDistances.train.${idx}.distance`}
        label={t("distance")}
        fallback
      />
      <Input
        type="number"
        form={mainForm}
        name={`transport.commonTransport.longueDistances.train.${idx}.frequency`}
        label={t("frequency")}
        fallback
      />
      <Input
        type="number"
        form={mainForm}
        name={`transport.commonTransport.longueDistances.train.${idx}.nbPeople`}
        label={t("nbPeople")}
        fallback
      />
    </>
  );
};

export default Train;
