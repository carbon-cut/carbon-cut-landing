import type { Meta, StoryObj } from "@storybook/nextjs";
import React from "react";
import QuestionList from "./questionList";
import FormShellStoryHarness from "./formShellStoryHarness";

const meta = {
  title: "Form/Shell/QuestionList",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  render: () => (
    <FormShellStoryHarness>
      {({ mainForm, initQuestions }) => (
        <div className="min-h-screen bg-surface-warm p-10">
          <QuestionList
            list={{
              transport: initQuestions.transport[0],
              energy: initQuestions.energy[0],
              food: initQuestions.food[0],
            }}
            mainForm={mainForm}
            dialog={false}
            setDialog={() => {}}
          />
        </div>
      )}
    </FormShellStoryHarness>
  ),
};

export const Open: Story = {
  render: () => (
    <FormShellStoryHarness>
      {({ mainForm, initQuestions }) => (
        <div className="min-h-screen bg-surface-warm p-10">
          <QuestionList
            list={{
              transport: initQuestions.transport[0],
              energy: initQuestions.energy[0],
              food: initQuestions.food[0],
            }}
            mainForm={mainForm}
            dialog
            setDialog={() => {}}
          />
        </div>
      )}
    </FormShellStoryHarness>
  ),
};

export const WithErrors: Story = {
  render: () => (
    <FormShellStoryHarness
      onReady={({ mainForm }) => {
        mainForm.setError("transport.hasCar", {
          type: "manual",
          message: "Required",
        });
      }}
    >
      {({ mainForm, initQuestions }) => (
        <div className="min-h-screen bg-surface-warm p-10">
          <QuestionList
            list={{
              transport: initQuestions.transport[0],
              energy: initQuestions.energy[0],
              food: initQuestions.food[0],
            }}
            mainForm={mainForm}
            dialog
            setDialog={() => {}}
          />
        </div>
      )}
    </FormShellStoryHarness>
  ),
};
