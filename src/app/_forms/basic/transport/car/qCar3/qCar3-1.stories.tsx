import { StoryObj, Meta } from "@storybook/nextjs";
import { fn } from "storybook/test";
import QCar31 from "./qCar3-1";
import { useForm, UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/forms";

const Component = QCar31;

const meta = {
  title: "Forms/Transport/QCar3-1",
  component: Component,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story, context) => {
      const form = useForm({});

      return (
        <div style={{ width: "300px" }}>
          <Form {...form}>
            <form>
              <Story {...context} mainForm={form} />
            </form>
          </Form>
        </div>
      );
    },
  ],
  args: {
    setSubmit: fn(() => console.log("setSubmit")),
    next: fn(() => console.log("next")),
    prev: fn(() => console.log("prev")),
    prevAction: null,
    setOnSubmit: fn(() => console.log("setOnSubmit")),
    setQuestions: fn(() => console.log("setQuestions")),
    currentIndex: 0,
    index: 0,
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;
//TODO type
//@ts-ignore
export const MainStory = (args, context) => <Component {...args} mainForm={context.mainForm} />;
