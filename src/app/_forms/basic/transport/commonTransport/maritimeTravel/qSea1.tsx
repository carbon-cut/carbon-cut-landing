/* import React, { useEffect, useMemo, useState } from "react";
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

const boats = [
  "fluvial",
  "ferry",
  "cruise",
] as const

const init = {
  type: "ferry",
  distance: null,
  frequency: null,
  withCar: false,
  people: null,
  tripPurpose: "personal",
} as const;

function QSea1({ mainForm }: QuestionProps) {
  const t = useScopedI18n("forms.basic.transport.commonTransport.qSea.q1");

  const [data, setData] = useState(mainForm.getValues("transport.seas") ?? []);

  return (
    <Table className="max-h-full">
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
                options={boats.map((e) => ({ label: e, value: e }))}
                onChange={(v: typeof boats[number]) => {
                  setData((prev) =>
                    prev.toSpliced(index, 1, { 
                      ...prev[index],
                      type: v 
                    }),
                  );
                }}
              />
            </TableCell>
            <TableCell>
              {ele?.type === "ferry" && (
                <div className="flex justify-between">
                  <p className="whitespace-nowrap mr-3">avec voiture?</p>
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
                
                size="sm"
                type="number"
                form={mainForm}
                name={`transport.seas.${index}.distance`}
                onChange={(v) => {
                  setData((prev) =>
                    prev.toSpliced(index, 1, {
                      ...prev[index],
                      distance: v,
                    }),
                  );
                }}
              />
            </TableCell>
            <TableCell>
              <Input
                
                size="sm"
                type="number"
                form={mainForm}
                name={`transport.seas.${index}.frequency`}
                onChange={(v) => {
                  setData((prev) =>
                    prev.toSpliced(index, 1, {
                      ...prev[index],
                      frequency: v,
                    }),
                  );
                }}
              />
            </TableCell>
            <TableCell>
              <Button
                type="button"
                variant={'ghost'}
                size={'icon'}
                className="rounded-full hover:bg-destructive/50"
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
          className="rounded-full ml-2 my-3 "
          size={'icon'}
          onClick={() => {
            mainForm.setValue(`transport.seas`, [...data, init]);
            setData((prev) => [...prev, init]);
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

 */
