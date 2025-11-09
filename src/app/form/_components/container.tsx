import { TabsContent } from "@/components/ui/tabs";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { QuestionProps } from "../../_forms/types";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/app/_forms/formSchema";
import { Button } from "@/components/ui/button";
import FormContext from "../_layout/_formContext";
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
import { TabValues } from "@/lib/formTabs/types";
import { TabContent } from "./_tab";
import { motion } from 'framer-motion'
import { useScopedI18n } from "@/locales/client";
interface ContainerProps {
  setNextTab: () => void;
  initQuestions: {
    [key in TabValues]: [
      React.FC<QuestionProps>[],
      React.Dispatch<React.SetStateAction<React.FC<QuestionProps>[]>>
    ];
  };
  mainForm: UseFormReturn<z.infer<typeof formSchema>, any, undefined>;
  loading: boolean
}

const Container = React.forwardRef<
  React.ElementRef<typeof TabsContent>,
  React.ComponentPropsWithoutRef<typeof TabsContent> & ContainerProps
>(({ setNextTab, initQuestions, mainForm,loading ,...props }, ref) => {
  const { tab, currentIndexes, setCurrentIndexes } = useContext(FormContext);
  const [onSubmit, setOnSubmit] = useState<() => void>(() => () => {});
  const [prevAction, setPrevAction] = useState<"next" | "prev" | null>(null);
  const [verifyFields, setVerifyFields] = useState<
    TName<z.infer<typeof formSchema>>[]
  >([]);

  const t = useScopedI18n('forms');

  const verify = useCallback<() => Promise<boolean>>(async () => {
    if (verifyFields.length === 0) return true;
    const res = await mainForm.trigger(verifyFields);
    return res;
  }, [mainForm, verifyFields]);

  const next = useCallback(() => {
    setPrevAction("next");
    setCurrentIndexes((prev) => {
      return { ...prev, [tab]: prev[tab] + 1 };
    });
  }, [tab]);

  const prev = useCallback(() => {
    setPrevAction("prev");
    setCurrentIndexes((p) => ({ ...p, [tab]: p[tab] - 1 }));
  }, [tab]);

  const [submit, setSubmit] = useState(false);
const cardRef = useRef<HTMLDivElement | null>(null);

const [height, setHeight] = useState<number | 'auto'>('auto');

useEffect(() => {
    if (cardRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        // We only have one entry, so we can use entries[0].
        const observedHeight = entries[0].contentRect.height + 70;
        setHeight(observedHeight)
      });

      resizeObserver.observe(cardRef.current)

      return () => {
        // Cleanup the observer when the component is unmounted
        resizeObserver.disconnect()
      }
    }
  },[cardRef])

  return (
    <div
      //style={{ height: "72vh" }}
      ref={ref}
      className=" border-0 mx-4 "
      {...props}
    >
      <Card  className=" border-0 pt-0 relative">
        
        <CardHeader className="text-center pt-6 pb-6 bg-gradient-to-t from-white to-[#ECFDF5] relative z-10">
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
                <div
                  className={`p-4 rounded-full ${
                    ColorVariant[tab as keyof typeof ColorVariant]
                  }`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
              );
            })()}
          </div>
          <CardTitle className="text-2xl font-bold">{getName(tab)}</CardTitle>
          <CardDescription className="text-base">
            Question {currentIndexes[tab] + 1} of {initQuestions[tab][0].length}
          </CardDescription>
        </CardHeader>
        <motion.div  style={{height}} className="" animate={{ height }} transition={{ duration: 0.09, ease: "linear" }} >
        <CardContent  ref={cardRef} className="md:p-12">
          
          <TabContent
            mainForm={mainForm}
            initQuestions={initQuestions.transport}
            setNextTab={setNextTab}
            value="transport"
            next={next}
            prev={prev}
            setSubmit={setSubmit}
            setOnSubmit={setOnSubmit}
            prevAction={prevAction}
            questions={initQuestions.transport[0]}
            setQuestions={initQuestions.transport[1]}
            setPrevAction={setPrevAction}
          />
          <TabContent
            mainForm={mainForm}
            initQuestions={initQuestions.energie}
            setNextTab={setNextTab}
            value="energie"
            next={next}
            prev={prev}
            setSubmit={setSubmit}
            setOnSubmit={setOnSubmit}
            prevAction={prevAction}
            questions={initQuestions.energie[0]}
            setQuestions={initQuestions.energie[1]}
            setPrevAction={setPrevAction}
          />
          <TabsContent value="food"></TabsContent>
          <TabsContent value="waste"></TabsContent>
          <TabsContent value="vacation"></TabsContent>
          
        </CardContent>
        </motion.div>
      </Card>
      <div className="flex justify-between gap-12 mb-8 mt-8">
        <Button
          className={
            "px-8 py-3 w-[175px]  rounded-full font-semibold flex items-center gap-2 border-2 border-[#00A261] text-[#00A261] bg-white hover:bg-[#ECFDF5] hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
          }
          variant={"outline"}
          size={"lg"}
          type="button"
          disabled={currentIndexes[tab] == 0}
          onClick={prev}
        >
          <span className="flex items-center gap-3">
            <img
              src={"/form/utils/arrow-left.svg"}
              width={18}
              height={18}
              alt="arrow-left"
            />
            <span className="bg-linear-1 text-transparent bg-clip-text">
              {t("back")}
            </span>
          </span>
        </Button>
        <Button
          className={`px-8 py-3 w-[175px] 
            rounded-full font-semibold flex items-center gap-2 
            bg-gradient-to-r from-[#00A261] to-[#003A52]
            data-[state=submit]:bg-linear-energie
            text-white hover:shadow-xl hover:scale-105
            active:scale-95 
            transition-all 
            duration-200 shadow-lg`}
            disabled={loading}
          size={"lg"}
          data-state={submit ? "submit" : "next"}
          type={submit ? "submit" : "button"}
          variant="default"
          onClick={async () => {
            const ver = await verify();
            onSubmit();
            if (ver) next();
          }}
        ><span className="">
          {submit ? t("submit") : t("next")}
          </span>
          {!submit && <img
            src={"/form/utils/arrow-right.svg"}
            width={16}
            height={16}
            alt="arrow-right"
          />}
        </Button>
      </div>
    </div>
  );
});
Container.displayName = "Tab Container";

export default Container;
