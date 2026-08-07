import { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";
import PreAssessment from "./index";

const meta = {
  title: "Form/PreAssessment",
  component: PreAssessment,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    onContinue: fn(() => console.log("onContinue")),
  },
} satisfies Meta<typeof PreAssessment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  globals: {
    viewport: { value: "mobile1" },
  },
  parameters: {
    options: {
      showPanel: false,
    },
  },
};
