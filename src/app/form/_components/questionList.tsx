import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { QuestionProps } from "@/app/_forms/types";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface Props {
  list: { [key: string]: React.FC<QuestionProps>[] };
  mainForm: UseFormReturn<any>;
  setTab: (v: string) => void;
  setIndex: (v: number) => void;
}
function QuestionList({ setTab, setIndex, list, mainForm }: Props) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {Object.keys(list).map((key) => (
        <AccordionItem key={key} value={key}>
          <AccordionTrigger
            className="font-extralight hover:no-underline"
            style={{ fontSize: "75%" }}
          >
            {key}
          </AccordionTrigger>
          <AccordionContent>
            {
              //@ts-ignore
              list[key].map(({ Symbol }, index) => (
                <Question
                  mainForm={mainForm}
                  Symbol={Symbol}
                  key={Symbol?.question}
                  setInterface={() => {
                    setIndex(index); setTab(key);
                  }}
                />
              ))
            }
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default QuestionList;

const Question = ({
  mainForm,
  Symbol,
  setInterface,
}: {
  mainForm: UseFormReturn<any>;
  Symbol?: any;
  setInterface: () => void;
}) => {

  const getState = () => {
    if (Symbol?.fields)
      for (const field of Symbol?.fields) {
        console.log({
          field,
          result: mainForm.getFieldState(field),
        });
        if (mainForm.getFieldState(field)?.invalid) return false;
      }
    return true;
  };

  return (
    <Button
      type="button"
      className={`${getState() ? "" : "bg-red-400"}`}
      onClick={setInterface}
    >
      {
        Symbol?.question
      }
    </Button>
  );
};
