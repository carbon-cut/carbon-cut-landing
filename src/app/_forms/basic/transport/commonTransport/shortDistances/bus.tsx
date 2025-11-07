import { QuestionProps } from "../../../../types";
import FormSelect from "@/components/forms/formSelect";
import Input from "../../../../components/input";
import { useScopedI18n } from "@/locales/client";

type Props = {
  idx: number;
};

const busTypes = [
  "electric",
  "diesel",
  "gasoline",
  "hybrid",
  "naturalGaz",
] as const;

const Bus = ({ mainForm, idx }: QuestionProps & Props) => {
  const t = useScopedI18n(
    "forms.basic.transport.commonTransport.shortDistances.bus"
  );

  const tEngines = useScopedI18n(
    "forms.basic.transport.commonTransport.shortDistances.bus.busTypes"
  );

  return (
    <>
      <FormSelect
        form={mainForm}
        name={`transport.commonTransport.shortDistances.bus.${idx}.busType`}
        data={busTypes.map((type) => ({
          value: type,
          label: tEngines(type),
        }))}
        label={t("busType")}
        fallback
      />

      <Input
        form={mainForm}
        name={`transport.commonTransport.shortDistances.bus.${idx}.distance`}
        label={t("distance")}
        type="number"
        placeholder="Km"
        fallback
      />
      <Input
        type="number"
        form={mainForm}
        name={`transport.commonTransport.shortDistances.bus.${idx}.frequency`}
        label={t("frequency")}
        fallback
      />
      <Input
        type="number"
        form={mainForm}
        name={`transport.commonTransport.shortDistances.bus.${idx}.nbPeople`}
        label={t("nbPeople")}
        fallback
      />
    </>
  );
};

export default Bus;
