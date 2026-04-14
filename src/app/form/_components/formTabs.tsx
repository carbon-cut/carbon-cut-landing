import { TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import React, { useContext, useEffect } from "react";
import { QuestionFC, QuestionProps } from "../../_forms/types";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/app/_forms/formSchema";
import QuestionRenderer from "./questionRenderer";
import FormContext from "../_layout/_formContext";
import { getName } from "@/lib/formTabs/geters";
const TabTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsTrigger>,
  React.ComponentPropsWithoutRef<typeof TabsTrigger>
>(({ className, ...props }, ref) => {
  const tab = props.value as keyof typeof colorVariants;
  const colorVariants = {
    transport: `
    data-[state=active]:bg-linear-section-transport
    data-[state=completed]:bg-section-transport/10  
    hover:bg-section-transport/20 data-[state=completed]:hover:bg-section-transport/20`,
    energy: `
    data-[state=active]:bg-linear-section-energy
    data-[state=completed]:bg-section-energy/10
    hover:bg-section-energy/20 data-[state=completed]:hover:bg-section-energy/20`,
    food: `
    data-[state=active]:bg-linear-section-food
    data-[state=completed]:bg-section-food/10
    hover:bg-section-food/20 data-[state=completed]:hover:bg-section-food/20`,
    waste:
      "data-[state=active]:bg-section-waste hover:bg-section-waste/80 data-[state=completed]:bg-section-waste/40",
    vacation:
      "data-[state=active]:bg-section-vacation hover:bg-section-vacation/80 data-[state=completed]:bg-section-vacation/40",
  };
  return (
    <TabsTrigger
      ref={ref}
      className={cn(
        `flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200  
      disabled:pointer-events-auto disabled:cursor-not-allowed disabled:bg-opacity-50 disabled:hover:bg-card
    data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg
     bg-muted text-muted-foreground
    ${colorVariants[tab]}
      `,
        className
      )}
      {...props}
    >
      {props.children}
      <span className="font-medium md:text-sm text-xs md:block hidden">{getName(props.value)}</span>
    </TabsTrigger>
  );
});
TabTrigger.displayName = "TabTrigger";

interface TabCProps {
  setNextTab: () => void;
  initQuestions: [QuestionFC[], React.Dispatch<React.SetStateAction<QuestionFC[]>>];
  mainForm: UseFormReturn<z.infer<typeof formSchema>, any, undefined>;
  questions: QuestionFC[];
  setQuestions: React.Dispatch<React.SetStateAction<QuestionFC[]>>;
  prevAction: "next" | "prev" | null;
  setPrevAction: React.Dispatch<React.SetStateAction<"next" | "prev" | null>>;
  setOnSubmit: React.Dispatch<React.SetStateAction<() => void>>;
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  next: () => void;
  prev: () => void;
}

const TabContent = React.forwardRef<
  React.ElementRef<typeof TabsContent>,
  React.ComponentPropsWithoutRef<typeof TabsContent> & TabCProps
>(
  (
    {
      setNextTab,
      initQuestions,
      mainForm,
      questions,
      setQuestions,
      prevAction,
      setPrevAction,
      setOnSubmit,
      next,
      prev,
      setSubmit,
      ...props
    },
    ref
  ) => {
    const { tab, currentIndexes, setCurrentIndexes, setVerifyFields } = useContext(FormContext);

    useEffect(() => {
      const currentIndex = currentIndexes[tab];
      if (tab === props.value && currentIndex >= questions.length) {
        setNextTab();
        setCurrentIndexes((p) => ({ ...p, [tab]: p[tab] - 1 }));
      }
    }, [currentIndexes, questions, setNextTab, tab]);

    return (
      <TabsContent ref={ref} className="border-0 mx-0 my-0" {...props}>
        {questions[currentIndexes[tab]] && (
          <QuestionRenderer
            props={{
              currentIndex: currentIndexes[tab],
              setQuestions,
              setOnSubmit,
              setSubmit,
              mainForm,
              next,
              prev,
              prevAction,
              setVerifyFields,
            }}
            Question={questions[currentIndexes[tab]]}
          />
        )}
      </TabsContent>
    );
  }
);
TabContent.displayName = "TabContent";

export { TabTrigger, TabContent };
