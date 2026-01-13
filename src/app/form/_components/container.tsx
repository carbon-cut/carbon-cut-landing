import { TabsContent } from "@/components/ui/tabs";
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { QuestionFC, QuestionProps } from "../../_forms/types";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/app/_forms/formSchema";
import { Button } from "@/components/ui/button";
import FormContext from "../_layout/_formContext";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getIcon, getName } from "@/lib/formTabs/geters";
import { TName } from "@/components/ui/forms";
import { TabValues } from "@/lib/formTabs/types";
import { TabContent } from "./_tab";
import { motion } from "framer-motion";
import { useScopedI18n } from "@/locales/client";
import { AlertTriangle } from "lucide-react";
interface ContainerProps {
  setNextTab: () => void;
  initQuestions: {
    [key in TabValues]: [QuestionFC[], React.Dispatch<React.SetStateAction<QuestionFC[]>>];
  };
  mainForm: UseFormReturn<z.infer<typeof formSchema>, any, undefined>;
  loading: boolean;
  scrollToRef: React.RefObject<HTMLDivElement | null>;
}

const Container = React.forwardRef<
  React.ElementRef<typeof TabsContent>,
  React.ComponentPropsWithoutRef<typeof TabsContent> & ContainerProps
>(({ setNextTab, initQuestions, mainForm, loading, scrollToRef, ...props }, ref) => {
  const { tab, setTab, currentIndexes, setCurrentIndexes, verifyFields } = useContext(FormContext);
  const [onSubmit, setOnSubmit] = useState<() => void>(() => () => {});
  const [prevAction, setPrevAction] = useState<"next" | "prev" | null>(null);

  const t = useScopedI18n("forms");
  const tOverview = useScopedI18n("components.forms.overview");

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

  const [height, setHeight] = useState<number | "auto">("auto");
  const showErrorNavigation =
    mainForm.formState.submitCount > 0 && Object.keys(mainForm.formState.errors ?? {}).length > 0;
  const handleNextError = useCallback(() => {
    const hasFieldError = (fields: TName<z.infer<typeof formSchema>>[]) =>
      fields.some((field) => mainForm.getFieldState(field)?.error);
    const tabOrder = ["transport", "energie", "food" /* "waste", "vacation" */] as const;
    const orderedQuestions = tabOrder.flatMap((tabKey) => {
      const questions = initQuestions[tabKey][0];
      const questionEntries = questions.map((question, index) => ({
        tab: tabKey,
        index,
        fields: question.Symbol?.fields ?? [],
        type: "question" as const,
      }));
      const tabHasQuestionError = questionEntries.some((entry) => hasFieldError(entry.fields));
      const tabHasSectionError = Boolean(mainForm.getFieldState(tabKey)?.error);
      if (!tabHasQuestionError && tabHasSectionError) {
        return [
          ...questionEntries,
          {
            tab: tabKey,
            index: 0,
            fields: [],
            type: "section" as const,
          },
        ];
      }
      return questionEntries;
    });

    if (orderedQuestions.length === 0) return;

    const currentPosition = orderedQuestions.findIndex(
      (question) =>
        question.type === "question" &&
        question.tab === tab &&
        question.index === currentIndexes[tab]
    );
    const startIndex = currentPosition >= 0 ? currentPosition + 1 : 0;

    const entryHasError = (entry: (typeof orderedQuestions)[number]) =>
      entry.type === "section" ? true : hasFieldError(entry.fields);

    const findFrom = (start: number, end: number) =>
      orderedQuestions.slice(start, end).find((question) => entryHasError(question));

    const nextError = findFrom(startIndex, orderedQuestions.length) ?? findFrom(0, startIndex);

    if (!nextError) return;

    setTab(nextError.tab);
    setCurrentIndexes((prev) => ({ ...prev, [nextError.tab]: nextError.index }));
  }, [currentIndexes, initQuestions, mainForm, setCurrentIndexes, setTab, tab]);

  useLayoutEffect(() => {
    if (cardRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        // We only have one entry, so we can use entries[0].
        const observedHeight = entries[0].contentRect.height + 70;
        setHeight(observedHeight);
      });

      resizeObserver.observe(cardRef.current);

      return () => {
        // Cleanup the observer when the component is unmounted
        resizeObserver.disconnect();
      };
    }
  }, [cardRef]);

  useEffect(() => {
    if (scrollToRef.current) {
      const targetTop = Math.max((scrollToRef.current.offsetTop ?? 0) + 20, 0);
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    }
  }, [tab, currentIndexes, scrollToRef]);

  return (
    <div
      //style={{ height: "72vh" }}
      ref={ref}
      className=" border-0 mx-4 "
      {...props}
    >
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
            <div className={`p-4 rounded-full ${ColorVariant[tab as keyof typeof ColorVariant]}`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
          );
        })()}
      </div>
      <Card
        className=" pt-6 relative
                    bg-transparent 
                    bg-gradient-to-br from-white via-white/60 to-white/5 
                    backdrop-blur-sm
                    rounded-2xl
                    shadow-lg
                    border border-white/30"
      >
        <CardHeader className="text-center pt-6 pb-0 relative z-10">
          <CardTitle className="text-2xl font-bold">{getName(tab)}</CardTitle>
          <CardDescription className="text-base">
            Question {currentIndexes[tab] + 1} of {initQuestions[tab][0].length}
          </CardDescription>
        </CardHeader>
        <motion.div
          style={{ height }}
          className=""
          animate={{ height }}
          transition={{ duration: 0.09, ease: "linear" }}
        >
          <CardContent ref={cardRef} className="md:p-12 md:pt-3">
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
            <TabContent
              mainForm={mainForm}
              initQuestions={initQuestions.food}
              setNextTab={setNextTab}
              value="food"
              next={next}
              prev={prev}
              setSubmit={setSubmit}
              setOnSubmit={setOnSubmit}
              prevAction={prevAction}
              questions={initQuestions.food[0]}
              setQuestions={initQuestions.food[1]}
              setPrevAction={setPrevAction}
            />
            <TabsContent value="waste"></TabsContent>
            <TabsContent value="vacation"></TabsContent>
          </CardContent>
        </motion.div>
      </Card>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 mt-4">
        <Button
          className={`order-1 md:px-3 px-5 py-1 w-full
            rounded-full font-semibold block gap-2  
            border-2 border-[#00A261] text-[#00A261] bg-white
            hover:bg-[#ECFDF5] 
            hover:shadow-xl hover:scale-105 active:scale-95 transition-all
            duration-200 disabled:opacity-50 disabled:cursor-not-allowed
            disabled:hover:scale-100 disabled:hover:shadow-none`}
          variant={"outline"}
          size={"lg"}
          type="button"
          disabled={currentIndexes[tab] == 0}
          onClick={prev}
        >
          <span className="flex flex-row justify-center items-center gap-3">
            <Image src={"form/utils/arrow-left.svg"} width={18} height={18} alt="arrow-left" />
            <span className="md:text-base text-sm bg-linear-1 text-transparent bg-clip-text">
              {t("back")}
            </span>
            <div />
          </span>
        </Button>
        <div className="order-3 md:order-2 col-span-1 w-full" />
        {showErrorNavigation ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="order-4 ml-auto self-center w-full md:order-2 border-destructive/40 text-destructive hover:bg-destructive/10"
            onClick={handleNextError}
          >
            <AlertTriangle />
            {tOverview("nextErrorButton")}
          </Button>
        ) : (
          <div className="order-3 col-span-1 w-full" />
        )}
        <Button
          className={`order-2 md:order-4 md:px-3 py-1 px-5 w-full
              rounded-full font-semibold block gap-2 
              bg-linear-transport
              data-[state=submit]:bg-linear-energie
              text-white hover:shadow-xl hover:scale-105
              active:scale-95 
              transition-all 
              duration-200 shadow-lg
              `}
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
        >
          <span className="flex flex-row justify-center items-center gap-3">
            <span className="md:text-base text-sm">{submit ? t("submit") : t("next")}</span>
            {!submit && (
              <Image src={"form/utils/arrow-right.svg"} width={16} height={16} alt="arrow-right" />
            )}
          </span>
        </Button>
      </div>
    </div>
  );
});
Container.displayName = "Tab Container";

export default Container;
