import { TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { QuestionProps } from "../../_forms/types";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/app/_forms/formSchema";
import QuestionRendrer from "./_questionRendere";
import { Button } from "@/components/ui/button";
import FormContext from "../_layout/_formContext";
import style from "../form.module.css";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getIcon, getName } from "@/lib/formTabs/geters";
import { TName } from "@/components/ui/forms";

const TabTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsTrigger>,
  React.ComponentPropsWithoutRef<typeof TabsTrigger>
>(({ className, ...props }, ref) => {
  const tab = props.value as keyof typeof colorVariants
  const colorVariants = {
    transport: "data-[state=active]:bg-section-transport/90 hover:bg-section-transport/20 data-[state=completed]:bg-section-transport/40 ",
    energie: "data-[state=active]:bg-section-energie hover:bg-section-energie/20 data-[state=completed]:bg-section-energie/40",
    food: "data-[state=active]:bg-section-food hover:bg-section-food/80 data-[state=completed]:bg-section-food/40",
    waste: "data-[state=active]:bg-section-waste hover:bg-section-waste/80 data-[state=completed]:bg-section-waste/40",
    vacation: "data-[state=active]:bg-section-vacation hover:bg-section-vacation/80 data-[state=completed]:bg-section-vacation/40",
  };
  return (
    <TabsTrigger
      ref={ref}
      className={cn(
        `flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200  
      disabled:pointer-events-auto disabled:cursor-not-allowed disabled:bg-opacity-50 disabled:hover:bg-white
    data-[state=active]:text-white data-[state=active]:shadow-md
    ${colorVariants[tab]}
      `,
        className
      )}
      {...props}
    >
      {props.children}
      <span className="font-medium text-sm">{getName(props.value)}</span>
    </TabsTrigger>
  );
});
TabTrigger.displayName = "TabTrigger";

interface TabCProps {
  setNextTab: () => void;
  initQuestions: [
    React.FC<QuestionProps>[],
    React.Dispatch<React.SetStateAction<React.FC<QuestionProps>[]>>
  ];
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  submit: boolean;
  mainForm: UseFormReturn<z.infer<typeof formSchema>, any, undefined>;
}

const TabContent = React.forwardRef<
  React.ElementRef<typeof TabsContent>,
  React.ComponentPropsWithoutRef<typeof TabsContent> & TabCProps
>(
  (
    { setNextTab, initQuestions, submit, setSubmit, mainForm, ...props },
    ref
  ) => {
    const { tab, currentIndexes, setCurrentIndexes } = useContext(FormContext);
    const [questions, setQuestions] = initQuestions;
    const [isDirty, setIsDirty] = useState(false);
    const [onSubmit, setOnSubmit] = useState<() => void>(() => () => {});
    const [prevAction, setPrevAction] = useState<'next' | 'prev' | null>(null);
    const [verifyFields, setVerifyFields] = useState<TName<z.infer<typeof formSchema>>[]>([]);

    const verify = useCallback< ()=>Promise<boolean>>(async () => {
      if (verifyFields.length === 0) return true;
      const res = await mainForm.trigger(verifyFields);
      return res;
    }, [mainForm, verifyFields]);

    const next = useCallback(() => {
      setPrevAction('next');
      setCurrentIndexes((prev) => {
        return { ...prev, [tab]: prev[tab] + 1 };
      });
    }, [tab]);

    const prev = useCallback(() => {
      setPrevAction('prev');
      setCurrentIndexes((p) => ({ ...p, [tab]: p[tab] - 1 }));
    }, [tab]);

    useEffect(() => {
      const currentIndex = currentIndexes[tab];
      if (tab === props.value && currentIndex >= questions.length) {
        setNextTab();
        setCurrentIndexes((p) => ({ ...p, [tab]: 0 }));
      }
    }, [currentIndexes, questions, setNextTab, tab]);

    return (
      <TabsContent
        //style={{ height: "72vh" }}
        ref={ref}
        className=" border-0 mx-4 overflow-y-hidden"
        {...props}
      >
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6 mt-7">
            <div className="flex justify-center mb-4">
              {(() => {
                const Icon = getIcon(tab);
                const ColorVariant = {
                  transport: "bg-section-transport",
                  energie: "bg-section-energie",
                  food: "bg-section-food",
                  waste: "bg-section-waste",
                  vacation: "bg-section-vacation",
                };
                return (
                  <div className={`p-4 rounded-full ${ColorVariant[props.value as keyof typeof ColorVariant]}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                );
              })()}
            </div>
            <CardTitle className="text-2xl font-bold">{getName(tab)}</CardTitle>
            <CardDescription className="text-base">
              Question {currentIndexes[tab] + 1} of {questions.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="md:p-12">
            {questions[currentIndexes[tab]] && (
              <QuestionRendrer
                props={{
                  currentIndex: currentIndexes[tab],
                  setQuestions,
                  setOnSubmit,
                  setSubmit,
                  mainForm,
                  setIsDirty,
                  next,
                  prev,
                  prevAction,
                  setVerifyFields
                }}
                Question={questions[currentIndexes[tab]]}
              />
            )}
          </CardContent>
        </Card>
        <div className="flex justify-end gap-12 mb-8 mt-8">
          <Button
            className={style.prevButton}
            variant={"ghost"}
            size={"lg"}
            type="button"
            disabled={currentIndexes[tab] == 0}
            onClick={prev}
          >
            <span className="flex items-center gap-3">
              <Image
                src={"/form/utils/arrow-left.svg"}
                width={18}
                height={18}
                alt="arrow-left"
              />
              <span className="bg-linear-1 text-transparent bg-clip-text">
                Précédent
              </span>
            </span>
          </Button>
          <Button
            className={`text-lg  w-48 py-4`}
            style={{ background: isDirty ? undefined : "" }}
            size={"lg"}
            type={submit ? "submit" : "button"}
            variant="default"
            onClick={async () => {
              const ver = await verify();
              onSubmit();
              if (ver) next();
            }}
          >
            {submit ? "Submit" : "Continuer"}
            <Image
              src={"/form/utils/arrow-right.svg"}
              width={16}
              height={16}
              alt="arrow-right"
            />
          </Button>
        </div>
      </TabsContent>
    );
  }
);
TabContent.displayName = "TabContent";

export { TabTrigger, TabContent };
