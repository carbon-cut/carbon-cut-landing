import React, { useEffect, useMemo, useState } from "react";
import { QuestionProps } from "../../../../types";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { useScopedI18n } from "@/locales/client";
import Input from "../../../../components/input";
import { PlusCircle, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Select from "../../../../components/select";
import FormCheckbox from "@/components/forms/formCheckbox";

function QSea1({ mainForm }: QuestionProps) {
  const t = useScopedI18n("forms.basic.transport.commonTransport.qSea.q1");

  const [data, setData] = useState(mainForm.getValues("transport.seas") ?? []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>type</TableHead>
          <TableHead></TableHead>
          <TableHead>{t("distance")}</TableHead>
          <TableHead>{t("frequency")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((ele, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <Select
                form={mainForm}
                name={`transport.seas.${index}.type`}
                options={[
                  { label: t("fluvial"), value: "fluvial" },
                  { label: t("ferry"), value: "ferry" },
                  { label: t("cruise"), value: "cruise" },
                ]}
                onChange={(v) => {
                  setData((prev) =>
                    prev.toSpliced(index, 1, { ...rest(prev[index]), type: v }),
                  );
                }}
              />
            </TableCell>
            <TableCell>
              {ele?.type === "ferry" && (
                <div className="flex justify-between">
                  <p className="whitespace-nowrap mr-3">with a car?</p>
                  <FormCheckbox
                    form={mainForm}
                    name={`transport.seas.${index}.withCar`}
                    className={"inline-block"}
                    id={`withCar${index}`}
                  />
                </div>
              )}
            </TableCell>
            <TableCell>
              <Input
                half
                type="number"
                form={mainForm}
                name={`transport.seas.${index}.distance`}
                onChange={(v) => {
                  setData((prev) =>
                    prev.toSpliced(index, 1, {
                      ...rest(prev[index]),
                      distance: v,
                    }),
                  );
                }}
              />
            </TableCell>
            <TableCell>
              <Input
                half
                type="number"
                form={mainForm}
                name={`transport.seas.${index}.frequency`}
                onChange={(v) => {
                  setData((prev) =>
                    prev.toSpliced(index, 1, {
                      ...rest(prev[index]),
                      frequency: v,
                    }),
                  );
                }}
              />
            </TableCell>
            <TableCell>
              <Button
                type="button"
                onClick={() => {
                  setData((prev) => {
                    const out = prev.toSpliced(index, 1);
                    mainForm.setValue(`transport.seas`, out);
                    return out;
                  });
                }}
              >
                <Trash />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <Button
          type="button"
          onClick={() => {
            mainForm.setValue(`transport.seas`, [...data, null]);
            setData((prev) => [...prev, null]);
          }}
        >
          <PlusCircle />
        </Button>
      </TableFooter>
    </Table>
  );
}

QSea1["Symbol"] = {
  question: "forms.basic.transport.commonTransport.qSea.q1",
  fields: ["transport.seas"],
};
export default QSea1;

const rest = (
  v: {
    withCar: boolean | null;
    distance: number | null;
    frequency: number | null;
    type: "fluvial" | "ferry" | "cruise" | null;
  } | null,
) => {
  return {
    distance: v?.distance ?? null,
    frequency: v?.frequency ?? null,
    type: v?.type ?? null,
    withCar: v?.withCar ?? null,
  };
};
