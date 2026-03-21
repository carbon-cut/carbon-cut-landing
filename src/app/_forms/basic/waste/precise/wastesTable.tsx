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
import { UseFormReturn, useWatch } from "react-hook-form";
import { z } from "zod";
import FormSelect from "@/components/forms/formSelect";
import Input from "../../../components/input";

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
  const preciseValues = useWatch({
    control: mainForm.control,
    name: "waste.precise",
  });
  const columnWidths = {
    type: "w-[28%]",
    amount: "w-[18%]",
    amountUnit: "w-[18%]",
    frequencyUnit: "w-[18%]",
    bagVolume: "w-[18%]",
  };

  return (
    <Table className="mt-3 mb-9 min-w-[36rem] table-fixed md:min-w-full">
      <TableHeader>
        <TableRow>
          <TableHead className={columnWidths.type}>{t("type")}</TableHead>
          <TableHead className={columnWidths.amount}>{t("waste.amount")}</TableHead>
          <TableHead className={columnWidths.amountUnit}>
            {t("waste.amountUnit.placeholder")}
          </TableHead>
          <TableHead className={columnWidths.frequencyUnit}>
            {t("waste.frequencyUnit.placeholder")}
          </TableHead>
          <TableHead className={columnWidths.bagVolume}>
            {t("waste.bagVolume.placeholder")}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {wastesKeys.map((e) => {
          if (wastes[e]) {
            const isBag = preciseValues?.[e]?.amountUnit === "bag";
            return (
              <TableRow key={e}>
                <TableCell className={columnWidths.type}>{t(`labels.${e}`)}</TableCell>
                <TableCell className={columnWidths.amount}>
                  <Input
                    type="number"
                    form={mainForm}
                    name={`waste.precise.${e}.amount`}
                    size="sm"
                  />
                </TableCell>
                <TableCell className={columnWidths.amountUnit}>
                  <FormSelect
                    form={mainForm}
                    name={`waste.precise.${e}.amountUnit`}
                    size="sm"
                    data={[
                      { label: t("waste.amountUnit.labels.bag"), value: "bag" },
                      { label: t("waste.amountUnit.labels.kg"), value: "kg" },
                    ]}
                  />
                </TableCell>
                <TableCell className={columnWidths.frequencyUnit}>
                  <FormSelect
                    form={mainForm}
                    name={`waste.precise.${e}.frequencyUnit`}
                    size="sm"
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
                <TableCell className={columnWidths.bagVolume}>
                  <div>
                    <FormSelect
                      form={mainForm}
                      name={`waste.precise.${e}.bagVolume`}
                      size="sm"
                      disabled={!isBag}
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
