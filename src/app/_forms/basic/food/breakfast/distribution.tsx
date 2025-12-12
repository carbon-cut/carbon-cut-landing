import React, { useEffect, useState } from "react";
import { QuestionProps, QuestionFC } from "../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../components/question";
import Content from "../../../components/content";
import { FormAlert } from "../../../components/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Input from "../../../components/input";

const cols = ["homemade", "quantine", "delivered"] as const;
const meals = ["bread", "salty", "milk", "fruits"] as const;

type Meals = (typeof meals)[number];

const Distribution: QuestionFC = ({ mainForm, next, prev, prevAction }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.food");

  const [selectedMeals] = useState<{
    bread?: number;
    salty?: number;
    milk?: number;
    fruits?: number;
  }>(() => {
    const rawMeals = mainForm.getValues("food.breakfast.meals");
    return meals.reduce(
      (acc, curr) => ({
        ...acc,
        ...((rawMeals[curr] ?? 0) > 0 ? { [curr]: rawMeals[curr] } : undefined),
      }),
      {}
    );
  });

  useEffect(() => {
    if (Object.keys(selectedMeals).length === 0) {
      if (prevAction === "next") {
        next();
      } else if (prevAction === "prev") {
        prev();
      }
    }
  }, [next, prev, prevAction, selectedMeals]);

  return (
    <div>
      <Question>{t("breakfast.q2.text")}</Question>
      <FormAlert variant="note" title="" description={"indication que le remplissage est approximative"} />
      <Content className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[60px]" />
              {cols.map((e) => (
                <TableHead key={e} className="min-w-[100px]">{t(`cols.${e}`)}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {(Object.keys(selectedMeals) as Array<Meals>).map((e) => (
              <TableRow key={e}>
                <TableCell>
                  {t(`breakfast.meals.${e}`)} {'('}{selectedMeals[e]}{')'}
                </TableCell>
                {cols.map((c, index) => {
                  const realIndex = index as 0 | 1 | 2;
                  return (
                    <TableCell key={c}>
                      <Input
                        form={mainForm}
                        name={`food.breakfast.distribution.${e}.${realIndex}`}
                        type="number"
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Content>
    </div>
  );
};

Distribution["Symbol"] = {
  question: "forms.basic.food.breakfast.q2.title",
  fields: ["food.breakfast.distribution"],
};

export default Distribution;
