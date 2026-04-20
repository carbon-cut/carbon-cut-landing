import { StoryObj, Meta } from "@storybook/nextjs";
import { fn } from "storybook/test";
import Q1 from "./q1";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/forms";
import { shellLayout } from "@/app/form/_components/shellLayout";
import { Card, CardContent } from "@/components/ui/card";

const Component = Q1;

const meta = {
  title: "Forms/Energy/Housing/Q1",
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story, context) => {
      const form = useForm({});

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

// TODO: tighten story typing across question modules.
// @ts-ignore
export const MainStory = (args, context) => <Component {...args} mainForm={context.mainForm} />;

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
