import Typography from "./typography";
import { StoryObj, Meta } from "@storybook/nextjs";

const meta =  {
  title: 'UI/Typography',
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'title', 'subtitle', 'description']
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'huge', 'xl', 'md', 'sm']
    },
    asChild: { control: 'boolean' },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Title: Story = {
  args: {
    variant: 'title',
    children: 'Title',
  },
};

export const Subtitle: Story = {
  args: {
    variant: 'subtitle',
    children: 'Subtitle',
  },
};

export const Description: Story = {
  args: {
    variant: 'description',
    children: 'Description',
  },
};

export const Huge: Story = {
  args: {
    variant: 'default',
    size: 'huge',
    children: 'Huge Text',
  },
};

export const Xl: Story = {
  args: {
    variant: 'default',
    size: 'xl',
    children: 'Extra Large Text',
  },
};

export const Md: Story = {
  args: {
    variant: 'default',
    size: 'md',
    children: 'Medium Text',
  },
};

export const Sm: Story = {
  args: {
    variant: 'default',
    size: 'sm',
    children: 'Small Text',
  },
};
