import type { Meta, StoryObj } from "@storybook/nextjs";
import ProgressBar from "./_progressBar";
import { Button } from "@/components/ui/button";
import { shellLayout } from "./shellLayout";

const dataLengths = {
  transport: 8,
  energy: 6,
  food: 7,
  waste: 0,
  vacation: 0,
  total: 21,
} as const;

const meta = {
  title: "Form/Shell/ProgressBar",
  component: ProgressBar,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className={`${shellLayout.canvas} mx-auto max-w-4xl`}>
        <Story />
      </div>
    ),
  ],
  args: {
    dataLengths,
    currentQuestion: 0,
    currentSectionDataLength: 8,
    currentSectionName: "Transport",
    tab: "transport",
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Start: Story = {};

export const Midway: Story = {
  args: {
    currentQuestion: 3,
    currentSectionDataLength: 6,
    currentSectionName: "Energie",
    tab: "energy",
  },
};

export const EndWithOverviewAction: Story = {
  args: {
    currentQuestion: 6,
    currentSectionDataLength: 7,
    currentSectionName: "Food",
    tab: "food",
    children: <Button variant="outline">Preview</Button>,
  },
};
