import { Button } from "./button";
import { StoryObj, Meta } from "@storybook/nextjs";
import { fn } from "storybook/test";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: { type: "boolean" },
      defaultValue: false,
    },
  },
  args: {
    onClick: fn(() => console.log("Button clicked")),
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "default",
    size: "default",
    children: "Primary button!!",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "default",
    children: "Secondary button",
  },
};

export const Small: Story = {
  args: {
    variant: "default",
    size: "sm",
    children: "Small button",
  },
};

export const Large: Story = {
  args: {
    variant: "default",
    size: "lg",
    children: "Large button",
  },
};
