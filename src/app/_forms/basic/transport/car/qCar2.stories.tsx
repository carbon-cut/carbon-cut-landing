import type { Meta, StoryObj } from "@storybook/nextjs";
import React from "react";
import { fn } from "storybook/test";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/forms";
import QCar2Factory from "./qCar2";
import { shellLayout } from "@/app/form/_components/shellLayout";
import { Card, CardContent } from "@/components/ui/card";

const Component = QCar2Factory(0);

const meta = {
  title: "Forms/Transport/Car/QCar2",
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story, context) => {
      const form = useForm({
        defaultValues: {
          transport: {
            cars: [
              {
                engine: "Diesel",
                make: "",
                model: "",
                thermalAvg: "",
                electricAvg: "",
                distanceWeekly: "",
              },
            ],
          },
        },
      });

      return (
        <div className={shellLayout.canvas}>
          <div className={shellLayout.frame}>
            <Card className={shellLayout.card}>
              <CardContent className={shellLayout.cardContent}>
                <Form {...form}>
                  <form>
                    <Story {...context} mainForm={form} />
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    },
  ],
  args: {
    // Provided by decorator at runtime; this placeholder keeps TS/next build happy.
    mainForm: undefined as any,
    setSubmit: fn(() => {}),
    next: fn(() => {}),
    prev: fn(() => {}),
    prevAction: null,
    setOnSubmit: fn(() => {}),
    setQuestions: fn(() => {}),
    setVerifyFields: fn(() => {}),
    currentIndex: 0,
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

// @ts-ignore storybook passes mainForm via decorator
export const Combustion: Story = {
  // @ts-ignore
  render: (args, context) => <Component {...args} mainForm={context.mainForm} />,
};

export const Electric: Story = {
  // @ts-ignore
  render: (args, context) => {
    // Force electric engine for this story.
    context.mainForm?.setValue?.("transport.cars.0.engine" as any, "Electrique");
    return <Component {...args} mainForm={context.mainForm} />;
  },
};

export const Mobile: Story = {
  // @ts-ignore
  render: (args, context) => <Component {...args} mainForm={context.mainForm} />,
  globals: {
    viewport: { value: "mobile1" },
  },
  parameters: {
    options: {
      showPanel: false,
    },
  },
};
