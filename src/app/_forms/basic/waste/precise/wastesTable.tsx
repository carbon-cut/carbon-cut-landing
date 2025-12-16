import { formSchema } from "@/app/_forms/formSchema";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useScopedI18n } from "@/locales/client";
import React from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import z from "zod";
import Input from "@/app/_forms/components/input";
import FormSelect from "@/components/forms/formSelect";

const wastesKeys = ["recylablePackaging", "paper", "glass", "organic"] as const;
type WasteKey = (typeof wastesKeys)[number];

type Props = {
  wastes: {
    recylablePackaging: boolean;
    paper: boolean;
    glass: boolean;
    organic: boolean;
  };
  mainForm: UseFormReturn<z.infer<typeof formSchema>, undefined>;
};

function WastesTable({ wastes, mainForm }: Props) {
  const t = useScopedI18n("forms.basic.waste.precise");

  return (
    <Table className="mb-12">
      <TableHeader>
        <TableRow>
          <TableHead>{t("waste.type")}</TableHead>
          <TableHead>{t("waste.amount")}</TableHead>
          <TableHead>{t("waste.amountUnit.placeholder")}</TableHead>
          <TableHead>{t("waste.frequencyUnit.placeholder")}</TableHead>
          <TableHead>{t("waste.bagVolume.placeholder")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {wastesKeys
          .filter((key) => wastes[key])
          .map((key) => (
            <WasteTableRow key={key} wasteKey={key} mainForm={mainForm} t={t} />
          ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
}

type WasteTableRowProps = {
  wasteKey: WasteKey;
  mainForm: UseFormReturn<z.infer<typeof formSchema>, undefined>;
  t: ReturnType<typeof useScopedI18n>;
};

function WasteTableRow({ wasteKey, mainForm, t }: WasteTableRowProps) {
  //const isBag = mainForm.getValues(`waste.precise.${wasteKey}.amountUnit`) === "bag"
  const amountUnit = useWatch({
    control: mainForm.control,
    name: `waste.precise.${wasteKey}.amountUnit`,
  });
  const isBag = amountUnit === "bag";
  return (
    <TableRow>
      <TableCell>{t(`labels.${wasteKey}`)}</TableCell>
      <TableCell>
        <Input type="number" form={mainForm} name={`waste.precise.${wasteKey}.amount`} />
      </TableCell>
      <TableCell>
        <FormSelect
          form={mainForm}
          name={`waste.precise.${wasteKey}.amountUnit`}
          data={[
            { label: t("waste.amountUnit.labels.bag"), value: "bag" },
            { label: t("waste.amountUnit.labels.kg"), value: "kg" },
          ]}
        />
      </TableCell>
      <TableCell>
        <FormSelect
          form={mainForm}
          name={`waste.precise.${wasteKey}.frequencyUnit`}
          data={[
            {
              label: t("waste.frequencyUnit.labels.day"),
              value: "day",
            },
            {
              label: t("waste.frequencyUnit.labels.week"),
              value: "week",
            },
          ]}
        />
      </TableCell>
      <TableCell>
        <FormSelect
          disabled={!isBag}
          form={mainForm}
          name={`waste.precise.${wasteKey}.bagVolume`}
          data={[
            { label: "10L", value: "10" },
            { label: "20L", value: "20" },
            { label: "30L", value: "30" },
            { label: "40L", value: "40" },
            { label: "50L", value: "50" },
            { label: "60L", value: "60" },
            { label: "70L", value: "70" },
            { label: "80L", value: "80" },
            { label: "90L", value: "90" },
            { label: "100L", value: "100" },
          ]}
        />
      </TableCell>
    </TableRow>
  );
}

export default WastesTable;
