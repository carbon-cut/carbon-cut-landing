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
import React from "react";
import { QuestionProps } from "@/app/_forms/types";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { TabValues } from "@/lib/formTabs/types";
import FormContext from "../_layout/_formContext";
import { useScopedI18n } from "@/locales/client";
import { getIcon, getName } from "@/lib/formTabs/geters";
import { Label } from "@/components/ui/label";
import Question from "./question";

interface Props {
  list: { [key in TabValues]?: React.FC<QuestionProps>[] };
  mainForm: UseFormReturn<any>;
  dialog: boolean;
  setDialog: React.Dispatch<React.SetStateAction<boolean>>; 
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

function QuestionList({ list, mainForm, dialog, setDialog}: Props) {
  const t = useScopedI18n("forms");
  const tOverview = useScopedI18n("components.forms.overview");

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
    <Dialog open={dialog} onOpenChange={setDialog}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={`
          w-fit
          hover:text-accent
          bg-transparent
          ${buttonVariants(tab)}
          `}
        >
          <Menu />
          {t("preview")}
        </Button>
      </DialogTrigger>

      <DialogContent asChild className="   h-4/6 overflow-hidden">
        
          <DialogHeader className="mb-4 max-w-full">
            <DialogTitle className="font-extrabold text-section-transport text-2xl">
              {tOverview("title")}
            </DialogTitle>
            <DialogDescription className="text-sm">
              {
                tOverview("description")
              }
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
                  className={`max-w-full  mb-4 border-b-0 2 border-2  rounded-lg px-4
                border-gray-200 hover:border-section-transport transition-colors
                ${error[key] ? "border-destructive hover:border-destructive/60" : ""} 
                `}
                  style={{
                    //@ts-expect-error interpolateSize is not supported, only in Chrome
                    interpolateSize: "allow-keywords",
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
                          {list[key]?.length} questions
                        </Label>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent
                    forceMount
                    type="preview"
                    className="px-6 space-y-3 pt-3"
                  >
                    {list[key]?.map(
                      (
                        //@ts-expect-error cause symbol is bot included in Types
                        { Symbol },
                        index
                      ) => (
                        <Question
                        setError={setError}
                        error={error}
                          index={index}
                          currentIndex={currentIndexes[key]}
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
      </DialogContent>
    </Dialog>
  );
}

export default QuestionList;

