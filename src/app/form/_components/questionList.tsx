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
import { QuestionFC } from "@/app/_forms/types";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { TabValues } from "@/lib/formTabs/types";
import FormContext from "../_layout/_formContext";
import { useScopedI18n } from "@/locales/client";
import { getIcon, getName } from "@/lib/formTabs/geters";
import { Label } from "@/components/ui/label";
import Question from "./QuestionListItem";
import Typography from "@/components/ui/typography";

interface Props {
  list: { [key in TabValues]?: QuestionFC[] };
  mainForm: UseFormReturn<any>;
  dialog: boolean;
  setDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

function buttonVariants(tab: TabValues) {
  switch (tab) {
    case "transport":
      return "border-section-transport/50 text-section-transport hover:bg-section-transport/80 hover:border-section-transport";
    case "food":
      return "border-section-food/50 text-section-food hover:bg-section-food/80 hover:border-section-food";
    case "vacation":
      return "border-section-vacation/50 text-section-vacation hover:bg-section-vacation/80 hover:border-section-vacation";
    case "energy":
      return "border-section-energy/50 text-section-energy hover:bg-section-energy/80 hover:border-section-energy";
    case "waste":
      return "border-section-waste/50 text-section-waste hover:bg-section-waste/80 hover:border-section-waste";
  }
}

function QuestionList({ list, mainForm, dialog, setDialog }: Props) {
  const t = useScopedI18n("forms");
  const tOverview = useScopedI18n("components.forms.overview");

  const { tab, setTab, currentIndexes, setCurrentIndexes } = React.useContext(FormContext);

  return (
    <Dialog open={dialog} onOpenChange={setDialog}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={`
            bg-transparent
          hover:text-primary-foreground
          ${buttonVariants(tab)}
          `}
        >
          <Menu />
          {t("preview")}
        </Button>
      </DialogTrigger>

      <DialogContent asChild className="h-4/6 w-11/12 overflow-hidden rounded-xl bg-card">
        <DialogHeader className="mb-4 max-w-full">
          <DialogTitle asChild>
            <Typography asChild variant="title" size="lg" className="text-section-transport">
              <h3>{tOverview("title")}</h3>
            </Typography>
          </DialogTitle>
          <DialogDescription asChild>
            <Typography asChild variant="description" size="sm">
              <p>{tOverview("description")}</p>
            </Typography>
          </DialogDescription>
        </DialogHeader>
        <Accordion type="single" collapsible className="w-full">
          {(Object.keys(list) as TabValues[]).map((key) => {
            const Icon = getIcon(key);
            const ColorVariant = {
              transport: "bg-section-transport",
              energy: "bg-section-energy",
              food: "bg-section-food",
              waste: "bg-section-waste",
              vacation: "bg-section-vacation",
            };

            const sectionError = mainForm.getFieldState(key)?.error;

            return (
              <AccordionItem
                className={`max-w-full  mb-4 border-b-0 2 border-2  rounded-lg px-0 
                 hover:border-section-transport transition-colors
                ${sectionError ? "border-destructive hover:border-destructive/60" : "border-border"}
                `}
                style={{ interpolateSize: "allow-keywords" } as React.CSSProperties}
                key={key}
                value={key}
              >
                <AccordionTrigger
                  icon="chevron-down"
                  className="font-extralight hover:no-underline  
                 md:px-6 px-3 py-3"
                >
                  <div className="flex flex-row">
                    <div className={`p-2 rounded-full h-fit my-auto ${ColorVariant[key]}`}>
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="grid grid-rows-2 ml-3">
                      <Typography asChild variant="subtitle" size="md">
                        <Label>{getName(key)}</Label>
                      </Typography>
                      <Typography asChild variant="caption" size="sm">
                        <Label>{list[key]?.length} questions</Label>
                      </Typography>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent forceMount type="preview" className="md:px-6 px-3 space-y-3 pt-3">
                  {list[key]?.map(({ Symbol }, index) => (
                    <Question
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
                  ))}
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
