import { QuestionProps } from "../../../../types";
import FormSelect from "@/components/forms/formSelect";
import Input from "../../../../components/input";
import { useScopedI18n } from "@/locales/client";

type Props = {
  idx: number;
};

const busTypes = [
  "other",
  "diesel",
] as const;

const Bus = ({ mainForm, idx }: QuestionProps & Props) => {
  const t = useScopedI18n(
    "forms.basic.transport.commonTransport.shortDistances.bus"
  );

  const tEngines = useScopedI18n(
    "forms.basic.transport.commonTransport.longueDistances.bus.busTypes"
  );

  return (
    <>
      <FormSelect
        form={mainForm}
        name={`transport.commonTransport.longueDistances.bus.${idx}.busType`}
        data={busTypes.map((type) => ({
          value: type,
          label: tEngines(type),
        }))}
        label={t("busType")}
      />

      <Input
        form={mainForm}
        name={`transport.commonTransport.longueDistances.bus.${idx}.distance`}
        label={t("distance")}
        type="number"
        placeholder="(km)"
      />
      <Input
        type="number"
        form={mainForm}
        name={`transport.commonTransport.longueDistances.bus.${idx}.frequency`}
        label={t("frequency")}
      />
      <Input
        type="number"
        form={mainForm}
        name={`transport.commonTransport.longueDistances.bus.${idx}.nbPeople`}
        label={t("nbPeople")}
      />
    </>
  );
};

export default Bus;
