import type { Meta, StoryObj } from "@storybook/nextjs";
import React from "react";
import { fn } from "storybook/test";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/forms";
import QCar from "./qCar";
import { shellLayout } from "@/app/form/_components/shellLayout";
import { Card, CardContent } from "@/components/ui/card";

const meta = {
  title: "Forms/Transport/Car/QCar",
  component: QCar,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story, context) => {
      const form = useForm({
        defaultValues: {
          transport: {
            hasCar: 0,
            metaCars: [],
            cars: [],
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
} satisfies Meta<typeof QCar>;

export default meta;
type Story = StoryObj<typeof meta>;

// @ts-ignore storybook passes mainForm via decorator
export const Default: Story = {
  // @ts-ignore
  render: (args, context) => <QCar {...args} mainForm={context.mainForm} />,
};

export const Mobile: Story = {
  // @ts-ignore
  render: (args, context) => <QCar {...args} mainForm={context.mainForm} />,
  globals: {
    viewport: { value: "mobile1" },
  },
  parameters: {
    options: {
      showPanel: false,
    },
  },
};
