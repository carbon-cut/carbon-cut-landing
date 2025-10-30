import { Separator } from "@/components/ui/separator";
import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Question from "../../components/question";
import Content from "../../components/content";
import { useScopedI18n } from "@/locales/client";
import { QuestionProps } from "../../types";
import TableInput from "../../components/tableInput";
import { UseFormReturn } from "react-hook-form";
import SideQuestion from "../../components/sideQuestion";
import Input from "../../components/input";

const getLast12Months = () => {
  const months = [];
  const today = new Date();

  for (let i = 0; i < 12; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const month = date.toLocaleString("default", { month: "long" });
    const monthNumber = date.getMonth() + 1; // Add 1 to make it 1-based
    const year = date.getFullYear();
    months.push({ month, monthNumber, year });
  }

  return months.reverse();
};

const Q1 = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.energie.q1");

  return (
    <div>
      <Question className='px-12'>{t("q1")}</Question>

      {/* <Table className="">
        <TableHeader>
          <TableRow>
            {getLast12Months().map(({ month, year }, index) => (
              <TableHead style={{ width: "100px" }} key={index}>
                {
                  //@ts-ignore
                  tm(month)
                }{" "}
                {year}
              </TableHead>
            ))}
            <TableHead colSpan={2} className="text-right">
              {t("Total")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {
              //@ts-ignore
              tableRows( getLast12Months())
            }
            <TableCell className="px-1">
              <TableInput
                form={mainForm}
                name={"energie.electricity.total"}
                inputProps={{
                  readOnly: true,
                  //@ts-ignore
                  value: total,
                }}
                type="number"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table> */}
      <Content className="px-16 mb-6">
      <Input
      form={mainForm}
      name="energie.electricity.total"
      placeholder="kWh"
      type="number"
      />
      </Content>
      <SideQuestion
      className="py-1 w-2/4 bg-section-food/20"
        question={t("q3")}
        content={
          <Input
            form={mainForm}
            name="energie.electricity.money"
            unit=""
            type="number"
            placeholder="€"
          />
        }
      />
      {/* <Separator className="mt-3" />
      <Question>{t("q2")}</Question>
      <Content>
        <Input form={mainForm} name="energie.electricity.index" type="number" />
      </Content> */}
    </div>
  );
};

Q1["Symbol"] = {
  question: "forms.basic.energie.q1.title",
  fields: ["energie.electricity.total", "energie.electricity.money"],
};

export default Q1;
