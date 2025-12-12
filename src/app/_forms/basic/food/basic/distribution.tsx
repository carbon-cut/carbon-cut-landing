import React, { useEffect, useState } from "react";
import { QuestionProps, QuestionFC } from "../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../components/question";
import Content from "../../../components/content";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Input from "../../../components/input";
import { FormAlert } from "../../../components/alert";

const cols = ["homemade", "quantine", "delivered"] as const;
const meals = [
  "redMeat",
  "whiteMeat",
  "oilyFish",
  "whiteFish",
  "vegan",
  "vegetarian",
] as const;

type Meals = (typeof meals)[number];

const Distribution: QuestionFC = ({ mainForm, next, prev, prevAction }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.food");

  const [selectedMeals] = useState<{
    redMeat?: number;
    whiteMeat?: number;
    oilyFish?: number;
    whiteFish?: number;
    vegan?: number;
    vegetarian?: number;
  }>(() => {
    const rawMeals = mainForm.getValues("food.basic.meals");
    return meals.reduce(
      (acc, curr) => ({
        ...acc,
        ...((rawMeals[curr] ?? 0) > 0 ? { [curr]: rawMeals[curr] } : undefined),
      }),
      {},
    );
  });

  useEffect(() => {
    console.log("selectedMeals", selectedMeals);
    if (Object.keys(selectedMeals).length === 0) {
      if (prevAction === "prev") {
        prev();
      } else next();
    }
  }, [next, prev, prevAction, selectedMeals]);

  return (
    <div>
      <Question>{t("basic.q2.text")}</Question>
      <FormAlert variant="note" title="" description={"indication que le remplissage est approximative"} />
      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[60px]"/>
              {cols.map((e) => (
                <TableHead className="min-w-[100px]" key={e}>{t(`cols.${e}`)}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody >
            {(Object.keys(selectedMeals) as Array<Meals>).map((e) => (
              <TableRow key={e}>
                <TableCell>
                  {t(`basic.meals.${e}`)} {'('}{selectedMeals[e]}{')'}
                </TableCell>
                {cols.map((c, index) => {
                  const realIndex = index as 0 | 1 | 2;
                  return (
                    <TableCell key={c}>
                      <Input
                        form={mainForm}
                        name={`food.basic.distribution.${e}.${realIndex}`}
                        type="number"
                        onChange={(v) => {
                          const newTotal = mainForm.getValues(`food.basic.distribution.${e}`)?.reduce((acc, curr) => acc + (curr ?? 0), 0);
                          if (newTotal>(selectedMeals[e] ?? 0)) {
                            let i = 0 as 0|1|2;
                            for(i; i<3; i++) mainForm.setError(`food.basic.distribution.${e}.${i}`, {
                              message: `total must be less than ${selectedMeals[e] ?? 0}`,
                            })
                          }else{
                            let i = 0 as 0|1|2;
                            for(i; i<3; i++) mainForm.clearErrors(`food.basic.distribution.${e}.${i}`)
                          }
                        }}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

Distribution["Symbol"] = {
  question: "forms.basic.food.basic.q2.title",
  fields: ["food.basic.distribution"],
};

export default Distribution;
