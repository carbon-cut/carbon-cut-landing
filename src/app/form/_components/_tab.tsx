import {  TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { QuestionProps } from "../../_forms/types";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../formSchema";
import QuestionRendrer from "./_questionRendere";
import { Button } from "@/components/ui/button";
import FormContext from "../_layout/_formContext";
import style from '../form.module.css'
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {ChevronLeft, ChevronRight, Plane, Zap} from "lucide-react";
import { get } from "http";
import { getColor, getIcon, getName } from "@/lib/formTabs/geters";
import { stat } from "fs";

const TabTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsTrigger>,
  React.ComponentPropsWithoutRef<typeof TabsTrigger>
>(({ className, ...props }, ref) => (
  <TabsTrigger
    ref={ref}
    className={cn(
      `flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200  
      disabled:pointer-events-auto disabled:cursor-not-allowed disabled:bg-opacity-50 
      hover:!bg-[${getColor(props.value)}60]
      data-[state=active]:bg-[${getColor(props.value)}] data-[state=active]:text-white data-[state=active]:shadow-md
      data-[state=completed]:bg-[#00A26120]  
      bg-gray-100 text-gray-500 
      `,
      className, 
    )}
    {...props}
  >
    {props.children}
    <span className="font-medium text-sm">{getName(props.value)}</span>
  </TabsTrigger>
));
TabTrigger.displayName = "TabTrigger";

interface TabCProps {
  setNextTab: () => void;
  initQuestions: [
    React.FC<QuestionProps>[],
    React.Dispatch<React.SetStateAction<React.FC<QuestionProps>[]>>,
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
    { setNextTab, initQuestions,submit, setSubmit, mainForm, ...props },
    ref,
  ) => {
    const { tab, currentIndexes, setCurrentIndexes } = useContext(FormContext);
    const [questions, setQuestions] = initQuestions;
    const [isDirty, setIsDirty] = useState(false);
    const [onSubmit,setOnSubmit] = useState<()=>void>(()=>()=>{})

    const next = useCallback(() => {
      console.log("next");
      setCurrentIndexes((prev) => {console.log("prev");console.log(prev);return({...prev , [tab]: prev[tab] + 1})});
    }, [tab]);

    useEffect(() => {
      const currentIndex = currentIndexes[tab];
      if (tab === props.value && currentIndex >= questions.length) {
        setNextTab();
        setCurrentIndexes(p=>({...p,[tab]:0}));
      }
    }, [currentIndexes, questions, setNextTab, tab]);

    const prev = useCallback(() => {
      setCurrentIndexes((p) =>( {...p , [tab]: p[tab] - 1}));
    }, [tab]);

    return (
      <TabsContent
        //style={{ height: "72vh" }}
        ref={ref}
        className="px-32 border-0 mx-4 overflow-y-hidden"
        {...props}
      >
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6 mt-7">
              <div className="flex justify-center mb-4">
                {(() => {
                  const Icon = getIcon(tab);
                  return (
                    <div className={`p-4 rounded-full bg-[${getColor(tab)}]`}>
                     <Icon className="h-6 w-6 text-white" />
                    </div>
                  )
                })()}
              </div>
              <CardTitle className="text-2xl font-bold">{getName(tab)}</CardTitle>
              <CardDescription className="text-base">
                Question { currentIndexes[tab] + 1} of {questions.length}
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
              }}
              Question={questions[currentIndexes[tab]]}
            />
          )}
          </CardContent>
        </Card>
        <div className="flex justify-end gap-12 mb-8 mt-8">
            <Button
              className={style.prevButton}
              variant={'ghost'}
              size={"lg"}
              type="button"
              disabled={currentIndexes[tab] == 0}
              onClick={prev}
            >
              <span className="flex items-center gap-3">
                <Image src={'/form/utils/arrow-left.svg'} width={18} height={18} alt="arrow-left"/>
              <span className="bg-linear-1 text-transparent bg-clip-text">
              Précédent
              </span>
              </span>
              
            </Button>
            <Button
              className={`text-lg  w-48 py-4`}
              style={{ background: isDirty ? undefined : "" }}
              size={"lg"}
              type={submit ?  "submit": "button" }
              variant="default"
              onClick={async () => {
                onSubmit()
                next();
              }}
            >
             {submit ? 'Submit' : 'Continuer'}
             <Image src={'/form/utils/arrow-right.svg'} width={16} height={16} alt="arrow-right"/>
            </Button>
          </div>
        
      </TabsContent>
    );
  },
);
TabContent.displayName = "TabContent";

export {TabTrigger, TabContent}