import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Menu } from "lucide-react";
import React, { useCallback, useEffect, useMemo } from "react";
import { QuestionProps } from "@/app/_forms/types";
import { set, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { TabValues } from "@/lib/formTabs/types";
import FormContext from "../_layout/_formContext";
import { useScopedI18n } from "@/locales/client";
import { getIcon, getName } from "@/lib/formTabs/geters";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  list: { [key in TabValues]?: React.FC<QuestionProps>[] };
  mainForm: UseFormReturn<any>;
}

function buttonVariants(tab: TabValues) {
  switch (tab) {
    case "transport":
      return "border-section-transport/50 text-section-transport hover:bg-section-transport/80";
    case "food":
      return "border-section-food/50 text-section-food hover:bg-section-food/80";
    case "vacation":
      return "border-section-vacation/50 text-section-vacation hover:bg-section-vacation/80";
    case "energie":
      return "border-section-energie/50 text-section-energie hover:bg-section-energie/80";
    case "waste":
      return "border-section-waste/50 text-section-waste hover:bg-section-waste/80";
  }
}

function QuestionList({ list, mainForm }: Props) {
  const t = useScopedI18n("forms");

  const { tab, setTab, currentIndexes, setCurrentIndexes } =
    React.useContext(FormContext);
  
  const [error, setError] = React.useState({
    transport: false,
    energie: false,
    food: false,
    waste: false,
    vacation: false,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={`absolute top-0 bottom-0 my-auto right-5
          w-fit
          hover:text-accent
          ${buttonVariants(tab)}
          `}
        >
          <Menu />
          {t("preview")}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="w-full  h-4/6 overflow-auto">
      <ScrollArea>
        <DialogHeader className="mb-4">
          <DialogTitle className="font-extrabold text-section-transport text-2xl">
            Form overview
          </DialogTitle>
          <DialogDescription className="text-sm">
            View all sections and questions in this carbon footprint assessment
          </DialogDescription>
        </DialogHeader>
        <Accordion type="single" collapsible className="w-full">
          {(Object.keys(list) as TabValues[]).map((key) => {
            const Icon = getIcon(key);
            const ColorVariant = {
              transport: "bg-section-transport",
              energie: "bg-section-energie",
              food: "bg-section-food",
              waste: "bg-section-waste",
              vacation: "bg-section-vacation",
            };

            return (
              <AccordionItem
                className={`max-w-full rounded-2xl mb-4 border-b-0 border-2 
                hover:border-section-transport   
                ${error[key] ? "border-red-500" : "border-transparent"} 
                `}
                style={{
                  //@ts-expect-error interpolateSize is not supported, only in Chrome
                  interpolateSize: 'allow-keywords'
                }}
                key={key}
                value={key}
              >
                <AccordionTrigger
                  icon="chevron-down"
                  className="font-extralight hover:no-underline  
                 px-6 py-3"
                >
                  <div className="flex flex-row">
                    <div
                      className={`p-2 rounded-full h-fit my-auto ${ColorVariant[key]}`}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="grid grid-rows-2 ml-3">
                      <Label className="font-extrabold text-lg">
                        {getName(key)}
                      </Label>
                      <Label className="font-semibold text-sm text-muted-foreground">
                        3 questions
                      </Label>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent forceMount type="preview" className="px-6 space-y-3">
                  {list[key]?.map(
                    (
                      //@ts-expect-error cause symbol is bot included in Types
                      { Symbol },
                      index
                    ) => (
                      <Question
                      
                        index={index}
                        mainForm={mainForm}
                        Symbol={Symbol}
                        key={`${key}-${index}`}
                        section={key}
                        setInterface={() => {
                          setCurrentIndexes((p) => ({ ...p, [key]: index }));
                          setTab(key);
                        }}
                      />
                    )
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        </ScrollArea>
      </DialogContent>
      
    </Dialog>
  );
}

export default QuestionList;

const Question = ({
  mainForm,
  Symbol,
  section,
  setInterface,
  index,
}: {
  mainForm: UseFormReturn<any>;
  Symbol?: any;
  setInterface: () => void;
  section: TabValues;
  index: number;
}) => {
  const t = useScopedI18n();

  const getState = useCallback (() => {
    if (Symbol?.fields)
      for (const field of Symbol?.fields) {
        console.log({
          field,
          result: mainForm.getFieldState(field),
        });
        if (mainForm.getFieldState(field)?.error) {
          return false;
        }
      }
    return true;
  }, [mainForm, section])

  return (
    <Button
      type="button"
      variant={"outline"}
      className={`
        ${getState() ? "bg-white" : "bg-red-400"}
        w-full rounded-x text-start justify-start
        `}
      onClick={setInterface}
    >
      <Label
        className={`font-bold text-section-${section} hover:cursor-pointer`}
      >
        Q{index + 1}
      </Label>
      <Label className={`text-extrabold max-w-1 hover:cursor-pointer`}>
        {t(Symbol?.question ?? "")}
      </Label>
    </Button>
  );
};
