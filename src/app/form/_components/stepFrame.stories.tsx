import type { Meta, StoryObj } from "@storybook/nextjs";
import React from "react";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { Car, Plane, Trash2, UtensilsCrossed, Zap } from "lucide-react";
import { getIndex, getName } from "@/lib/formTabs/geters";
import { TabTrigger } from "./_tab";
import ProgressBar from "./_progressBar";
import QuestionList from "./questionList";
import Container from "./container";
import FormShellStoryHarness from "./formShellStoryHarness";

const meta = {
  title: "Form/Shell/StepFrame",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function StepFrameCanvas({
  tab = "transport",
  questionIndex = 0,
  withErrors = false,
}: {
  tab?: "transport" | "energy" | "food";
  questionIndex?: number;
  withErrors?: boolean;
}) {
  return (
    <FormShellStoryHarness
      tab={tab}
      currentIndexes={{ [tab]: questionIndex }}
      onReady={({ mainForm }) => {
        if (!withErrors) return;
        mainForm.setError("transport.hasCar", {
          type: "manual",
          message: "Required",
        });
      }}
    >
      {({ mainForm, initQuestions, scrollToRef, setNextTab }) => {
        const dataLengths = {
          transport: initQuestions.transport[0].length,
          energy: initQuestions.energy[0].length,
          food: initQuestions.food[0].length,
          waste: 0,
          vacation: 0,
          total:
            initQuestions.transport[0].length +
            initQuestions.energy[0].length +
            initQuestions.food[0].length,
        };

        return (
          <div className="min-h-screen bg-surface-warm px-4 py-10 md:px-8">
            <Tabs
              className="relative mx-auto px-0 pt-20 md:pt-24 lg:w-[850px]"
              value={tab}
              onValueChange={() => {}}
            >
              <div>
                <ProgressBar
                  ref={scrollToRef}
                  tab={tab}
                  dataLengths={dataLengths}
                  currentQuestion={questionIndex}
                  currentSectionDataLength={dataLengths[tab]}
                  currentSectionName={getName(tab)}
                >
                  <QuestionList
                    mainForm={mainForm}
                    list={{
                      transport: initQuestions.transport[0],
                      energy: initQuestions.energy[0],
                      food: initQuestions.food[0],
                    }}
                    dialog={false}
                    setDialog={() => {}}
                  />
                </ProgressBar>
              </div>
              <div className="relative mb-4 flex justify-center">
                <TabsList className="h-fit max-w-full flex-wrap space-x-2 rounded-full bg-white p-2 shadow-lg">
                  <TabTrigger
                    value="transport"
                    data-state={
                      getIndex(tab) > 0 ? "completed" : tab === "transport" ? "active" : "inactive"
                    }
                  >
                    <Car className="h-4 w-4" />
                  </TabTrigger>
                  <TabTrigger
                    value="energy"
                    data-state={
                      getIndex(tab) > 1 ? "completed" : tab === "energy" ? "active" : "inactive"
                    }
                  >
                    <Zap className="h-4 w-4" />
                  </TabTrigger>
                  <TabTrigger
                    value="food"
                    data-state={
                      getIndex(tab) > 2 ? "completed" : tab === "food" ? "active" : "inactive"
                    }
                  >
                    <UtensilsCrossed className="h-4 w-4" />
                  </TabTrigger>
                  <TabTrigger disabled value="waste">
                    <Trash2 className="h-4 w-4" />
                  </TabTrigger>
                  <TabTrigger disabled value="vacation">
                    <Plane className="h-4 w-4" />
                  </TabTrigger>
                </TabsList>
              </div>
              <Container
                scrollToRef={scrollToRef}
                mainForm={mainForm}
                initQuestions={initQuestions}
                setNextTab={setNextTab}
                value={tab}
                loading={false}
              />
            </Tabs>
          </div>
        );
      }}
    </FormShellStoryHarness>
  );
}

export const FirstStep: Story = {
  render: () => <StepFrameCanvas tab="transport" questionIndex={0} />,
};

export const MidFlow: Story = {
  render: () => <StepFrameCanvas tab="energy" questionIndex={1} />,
};

export const WithErrors: Story = {
  render: () => <StepFrameCanvas tab="transport" questionIndex={0} withErrors />,
};
