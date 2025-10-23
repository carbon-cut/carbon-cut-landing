import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { QuestionProps } from "../../../../types";
import Input from "../../../../components/input";
import { UseFieldArrayRemove } from "react-hook-form";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScopedI18n } from "@/locales/client";

type Props = {
  idx: number;
};

const Metro = ({ mainForm, idx }: QuestionProps & Props) => {
  const t = useScopedI18n(
    "forms.basic.transport.commonTransport.shortDistances.metro"
  );

  return (
    <>
      <Input
        type="number"
        form={mainForm}
        name={`transport.commonTransport.shortDistances.metro.${idx}.distance`}
        label={t("distance")}
      />
      <Input
        type="number"
        form={mainForm}
        name={`transport.commonTransport.shortDistances.metro.${idx}.frequency`}
        label={t("frequency")}
      />
      <Input
        type="number"
        form={mainForm}
        name={`transport.commonTransport.shortDistances.metro.${idx}.nbPeople`}
        label={t("nbPeople")}
      />
    </>
  );
};

export default Metro;
