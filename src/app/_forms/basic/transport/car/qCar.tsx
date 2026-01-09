import React, { useContext, useEffect, useState } from "react";
import Question from "../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/content";
import { QuestionProps, QuestionFC } from "../../../types";
import carsQuestions from "./index";
import Input from "../../../components/input";
import FormContext from "@/app/form/_layout/_formContext";
import { useFieldArray, useWatch } from "react-hook-form";

const QCar: QuestionFC = ({ setOnSubmit, setQuestions, mainForm, currentIndex }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.transport.qCar");
  const [prevValue] = useState(mainForm.getValues("transport.hasCar") ?? 0);
  const { tab } = useContext(FormContext);

  const { append: appendMetaCars, remove: removeMetaCars } = useFieldArray({
    name: "transport.metaCars",
    control: mainForm.control,
  });

  const { remove: removeCars } = useFieldArray({
    name: "transport.cars",
    control: mainForm.control,
  });

  const questionCounts = useWatch({
    name: "transport.metaCars",
    control: mainForm.control,
    defaultValue: [],
  });

  useEffect(() => {
    setOnSubmit(() => async () => {
      const hasCar = mainForm.getValues("transport.hasCar") ?? 0;
      const defaultQuestionCount = carsQuestions(1).length;
      //add Car questions
      if (prevValue == 0 && hasCar > 0) {
        setQuestions((prev) => {
          const add = carsQuestions(hasCar);
          const out = prev.slice();
          out.splice(currentIndex + 1, 0, ...add);
          return out;
        });
        appendMetaCars(Array.from({ length: hasCar }, () => ({ questionCount: defaultQuestionCount })));
      } else if (prevValue < hasCar) {
        setQuestions((prev) => {
          const copy = prev.slice();
          copy.splice(
            currentIndex + prevValue * defaultQuestionCount + 1,
            0,
            ...carsQuestions(hasCar - prevValue, prevValue)
          );
          return copy;
        });
        appendMetaCars(
          Array.from({ length: hasCar - prevValue }, () => ({
            questionCount: defaultQuestionCount,
          }))
        );
      }
      //remove Car questions
      else if (hasCar < prevValue) {
        if (!questionCounts) throw new Error("questionCounts is undefined");
        const getQuestionCount = (index: number) =>
          questionCounts[index]?.questionCount ?? defaultQuestionCount;

        let questionsBefore = 0;
        for (let i = 0; i < hasCar; i += 1) {
          questionsBefore += getQuestionCount(i);
        }

        let removeLength = 0;
        for (let i = hasCar; i < prevValue; i += 1) {
          removeLength += getQuestionCount(i);
        }

        setQuestions((prev) => {
          const copy = prev.slice();
          copy.splice(currentIndex + questionsBefore + 1, removeLength);
          return copy;
        });
        removeMetaCars(
          Array.from({ length: prevValue - hasCar }, (_, i) => {
            return questionCounts.length - 1 - i;
          })
        );
        const carsCount = mainForm.getValues("transport.cars")?.length ?? 0;
        const removeCount = Math.min(prevValue - hasCar, carsCount);
        if (removeCount > 0) {
          removeCars(
            Array.from({ length: removeCount }, (_, i) => {
              return carsCount - 1 - i;
            })
          );
        }
      }
    });
    return () => {
      setOnSubmit(() => async () => {});
    };
  }, [
    currentIndex,
    mainForm,
    prevValue,
    setOnSubmit,
    setQuestions,
    tab,
    appendMetaCars,
    removeMetaCars,
    removeCars,
    questionCounts,
  ]);

  return (
    <div className="space-y-3 mt-6 mb-24">
      <Question>{t("q")}</Question>
      <Content className="pl-0 ">
        <Input name="transport.hasCar" form={mainForm} type="number" />
      </Content>
    </div>
  );
};

QCar.Symbol = {
  question: "forms.basic.transport.qCar.q",
  fields: [`transport.hasCar`],
};

export default QCar;
