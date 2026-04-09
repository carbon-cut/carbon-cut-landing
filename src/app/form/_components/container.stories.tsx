import type { Meta, StoryObj } from "@storybook/nextjs";
import React from "react";
import Container from "./container";
import FormShellStoryHarness from "./formShellStoryHarness";
import { Tabs } from "@/components/ui/tabs";

const meta = {
  title: "Form/Shell/Container",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function ContainerCanvas({
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
      {({ mainForm, initQuestions, scrollToRef, setNextTab }) => (
        <div className="min-h-screen bg-surface-warm px-4 py-10">
          <Tabs value={tab}>
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
      )}
    </FormShellStoryHarness>
  );
}

export const FirstQuestion: Story = {
  render: () => <ContainerCanvas tab="transport" questionIndex={0} />,
};

export const MidSectionQuestion: Story = {
  render: () => <ContainerCanvas tab="energy" questionIndex={1} />,
};

export const WithErrors: Story = {
  render: () => <ContainerCanvas tab="transport" questionIndex={0} withErrors />,
};
