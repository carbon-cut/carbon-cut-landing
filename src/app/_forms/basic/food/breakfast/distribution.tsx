import React, { useEffect, useState } from "react";
import { QuestionProps, QuestionFC } from "../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../components/question";
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
import { FormField, FormMessage, TName, useFormField } from "@/components/ui/forms";
import { cn } from "@/lib/utils";
import { useWatch } from "react-hook-form";
import { formSchema } from "../../../formSchema";
import { z } from "zod";

const cols = ["homemade", "quantine", "delivered"] as const;
const meals = ["bread", "salty", "milk", "fruits"] as const;

type Meals = (typeof meals)[number];
type SelectedMeals = {
  bread?: number | undefined;
  salty?: number | undefined;
  milk?: number | undefined;
  fruits?: number | undefined;
};
type FormValues = z.infer<typeof formSchema>;
type NamePrefix = TName<FormValues>;

type DistributionRowProps = {
  mealLabel: string;
  enteredLabel: string;
  matches: boolean;
  mainForm: QuestionProps["mainForm"];
  namePrefix: NamePrefix;
};

const DistributionRow = ({
  mealLabel,
  enteredLabel,
  matches,
  mainForm,
  namePrefix,
}: DistributionRowProps) => {
  const { error } = useFormField();
  const [cachedError, setCachedError] = useState(!!error);
  const attachedFields = [namePrefix] as NamePrefix[];

  useEffect(() => {
    if (error) setCachedError(true);
  }, [error]);

  return (
    <>
      <TableRow
        data-state={error ? "error" : "default"}
        className="border-t border-b-0 data-[state=error]:bg-destructive/10"
      >
        <TableCell>
          <span>{mealLabel}</span>
          <div
            className={cn(
              "mt-1 text-xs font-semibold",
              matches ? "text-muted-foreground" : "text-destructive"
            )}
          >
            {enteredLabel}
          </div>
        </TableCell>
        {cols.map((c, index) => {
          const realIndex = index as 0 | 1 | 2;
          const fieldName = `${namePrefix}.${realIndex}` as NamePrefix;
          return (
            <TableCell key={c}>
              <Input
                form={mainForm}
                name={fieldName}
                type="number"
                attachedFields={attachedFields}
                isError={cachedError}
              />
            </TableCell>
          );
        })}
      </TableRow>
      <TableRow
        data-state={error ? "error" : "default"}
        className="border-none data-[state=error]:bg-destructive/10"
      >
        <TableCell colSpan={cols.length + 1} className="pt-1 pb-3 border-none">
          <FormMessage />
        </TableCell>
      </TableRow>
    </>
  );
};

const Distribution: QuestionFC = ({
  mainForm,
  next,
  prev,
  prevAction,
  setVerifyFields,
}: QuestionProps) => {
  const t = useScopedI18n("forms.basic.food");

  const [selectedMeals] = useState<SelectedMeals>(() => {
    const rawMeals = mainForm.getValues("food.breakfast.meals");
    return meals.reduce(
      (acc: SelectedMeals, curr) => ({
        ...acc,
        ...((rawMeals?.[curr] ?? 0) > 0 ? { [curr]: rawMeals[curr] } : undefined),
      }),
      {}
    );
  });
  const distributionValues = useWatch({
    control: mainForm.control,
    name: "food.breakfast.distribution",
  });

  useEffect(() => {
    if (Object.keys(selectedMeals).length === 0) {
      if (prevAction === "prev") {
        prev();
      } else next();
    }
    setVerifyFields(["food.breakfast.distribution"]);

    return () => {
      setVerifyFields([]);
    };
  }, [next, prev, prevAction, selectedMeals]);

  return (
    <div>
      <Question>{t("breakfast.q2.text")}</Question>
      <FormAlert
        variant="note"
        title=""
        description={`${t("breakfast.q2.note")}\n${t("breakfast.q2.helper")}`}
      />
      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[60px]" />
              {cols.map((e) => (
                <TableHead key={e} className="min-w-[100px]">
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
                name={`food.breakfast.distribution.${e}`}
                render={() => {
                  const rowValues = distributionValues?.[e];
                  const entered = Array.isArray(rowValues)
                    ? rowValues.reduce((acc: number, curr) => acc + (Number(curr) || 0), 0)
                    : 0;
                  const total = selectedMeals[e] ?? 0;
                  const matches = entered === total;
                  const namePrefix = `food.breakfast.distribution.${e}` as NamePrefix;
                  return (
                    <DistributionRow
                      mealLabel={t(`breakfast.meals.${e}`)}
                      enteredLabel={t("breakfast.q2.enteredLabel", { entered, total })}
                      matches={matches}
                      mainForm={mainForm}
                      namePrefix={namePrefix}
                    />
                  );
                }}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

Distribution["Symbol"] = {
  question: "forms.basic.food.breakfast.q2.title",
  fields: ["food.breakfast.distribution"],
};

export default Distribution;
