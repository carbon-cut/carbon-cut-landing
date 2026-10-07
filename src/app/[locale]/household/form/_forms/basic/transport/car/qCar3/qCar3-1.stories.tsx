import { StoryObj, Meta } from "@storybook/nextjs";
import { fn } from "storybook/test";
import QCar31 from "./qCar3-1";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/forms";
import { shellLayout } from "@/app/[locale]/household/form/_components/shellLayout";
import { Card, CardContent } from "@/components/ui/card";

const Component = QCar31;

const meta = {
  title: "Forms/Transport/QCar3-1",
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story, context) => {
      const form = useForm({
        defaultValues: {
          transport: {
            cars: [{ engine: "Electrique" }],
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
    setSubmit: fn(() => console.log("setSubmit")),
    next: fn(() => console.log("next")),
    prev: fn(() => console.log("prev")),
    prevAction: null,
    setOnSubmit: fn(() => console.log("setOnSubmit")),
    setQuestions: fn(() => console.log("setQuestions")),
    setVerifyFields: fn(() => console.log("setVerifyFields")),
    currentIndex: 0,
    index: 0,
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;
//TODO type
//@ts-ignore
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
