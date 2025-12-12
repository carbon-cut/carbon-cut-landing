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
import { FormField, FormMessage } from "@/components/ui/forms";

const cols = ["homemade", "quantine", "delivered"] as const;
const meals = ["redMeat", "whiteMeat", "oilyFish", "whiteFish", "vegan", "vegetarian"] as const;

type Meals = (typeof meals)[number];

const Distribution: QuestionFC = ({
  mainForm,
  next,
  prev,
  prevAction,
  setVerifyFields,
}: QuestionProps) => {
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
        ...((rawMeals?.[curr] ?? 0) > 0 ? { [curr]: rawMeals[curr] } : undefined),
      }),
      {}
    );
  });

  useEffect(() => {
    if (Object.keys(selectedMeals).length === 0) {
      if (prevAction === "prev") {
        prev();
      } else next();
    }
    setVerifyFields(["food.basic.distribution"]);

    return () => {
      setVerifyFields([]);
    };
  }, [next, prev, prevAction, selectedMeals]);

  return (
    <div>
      <Question>{t("basic.q2.text")}</Question>
      <FormAlert
        variant="note"
        title=""
        description={"indication que le remplissage est approximative"}
      />
      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[60px]" />
              {cols.map((e) => (
                <TableHead className="min-w-[100px]" key={e}>
                  {t(`cols.${e}`)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {(Object.keys(selectedMeals) as Array<Meals>).map((e) => (
              <FormField
                key={e}
                control={mainForm.control}
                name={`food.basic.distribution.${e}`}
                render={() => (
                  <>
                    <TableRow className="border-t border-b-0">
                      <TableCell>
                        {t(`basic.meals.${e}`)} {"("}
                        {selectedMeals[e]}
                        {")"}
                      </TableCell>
                      {cols.map((c, index) => {
                        const realIndex = index as 0 | 1 | 2;
                        return (
                          <TableCell key={c}>
                            <Input
                              form={mainForm}
                              name={`food.basic.distribution.${e}.${realIndex}`}
                              type="number"
                              attachedFields={[`food.basic.distribution.${e}`]}
                            />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                    <TableRow className="border-none">
                      <TableCell colSpan={cols.length + 1} className="pt-1 pb-3 border-none">
                        <FormMessage />
                      </TableCell>
                    </TableRow>
                  </>
                )}
              />
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
