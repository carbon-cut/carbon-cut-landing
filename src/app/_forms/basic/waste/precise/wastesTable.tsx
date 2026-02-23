import { formSchema } from "../../../formSchema";
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
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import MinimalInput from "../../../components/minimalInput";
import Select from "../../../components/select";

const wastesKeys = ["recylablePackaging", "paper", "glass", "organic"] as const;

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
    <Table className="mb-24">
      <TableHeader>
        <TableRow>
          <TableHead>type</TableHead>
          <TableHead>{t("waste.amount")}</TableHead>
          <TableHead>{t("waste.amountUnit.placeholder")}</TableHead>
          <TableHead>{t("waste.frequencyUnit.placeholder")}</TableHead>
          <TableHead>{t("waste.bagVolume.placeholder")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {wastesKeys.map((e) => {
          if (wastes[e]) {
            return (
              <TableRow key={e}>
                <TableCell>{t(`labels.${e}`)}</TableCell>
                <TableCell>
                  <MinimalInput type="number" form={mainForm} name={`waste.precise.${e}.amount`} />
                </TableCell>
                <TableCell>
                  <Select
                    form={mainForm}
                    name={`waste.precise.${e}.amountUnit`}
                    options={[
                      { label: t("waste.amountUnit.labels.bag"), value: "bag" },
                      { label: t("waste.amountUnit.labels.kg"), value: "kg" },
                    ]}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    form={mainForm}
                    name={`waste.precise.${e}.frequencyUnit`}
                    options={[
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
                  <div className="grid grid-cols-2">
                    <Select
                      //disabled={amountUnit === "bag"}
                      form={mainForm}
                      name={`waste.precise.${e}.bagVolume`}
                      options={[
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
                  </div>
                </TableCell>
              </TableRow>
            );
          }
          return null;
        })}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
}

export default WastesTable;
