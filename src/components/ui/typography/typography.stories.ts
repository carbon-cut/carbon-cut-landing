import type { Meta, StoryObj } from "@storybook/nextjs";
import Typography from "./typography";

const meta = {
  title: "UI/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "title",
        "subtitle",
        "description",
        "label",
        "caption",
        "muted",
        "marketingTitle",
        "marketingSubtitle",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", "huge"],
    },
    asChild: { control: "boolean" },
  },
  args: {
    variant: "default",
    size: "md",
    children: "Texte de demonstration",
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
