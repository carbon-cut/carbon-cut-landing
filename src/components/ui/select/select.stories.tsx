import { StoryObj, Meta } from "@storybook/nextjs-vite";

import {
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";

    const options= [
      { label: "Option 1", value: "option-1" },
      { label: "Option 2", value: "option-2" },
      { label: "Option 3", value: "option-3" },
    ];


const meta = {
  title: "UI/Select",
  component: Select,
  subcomponents:{
    SelectGroup,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
  },
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
      children: { table: { disable: true } }
    }
} as Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const children = <Select>
  <SelectTrigger>
      <SelectValue placeholder="Select an option" />
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectTrigger>
</Select>

export const Disabled: Story = {
  args: {
    disabled: true,
    children
  },
};

export const Required: Story = {
  args: {
    required: true,
    children
  },
};

