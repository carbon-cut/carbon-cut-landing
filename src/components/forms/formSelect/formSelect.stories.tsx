import { Meta, StoryObj, StoryFn } from "@storybook/nextjs";
import { FormProvider, useForm } from "react-hook-form";
import FormSelect from "./formSelect";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const meta = {
  title: "Form Components/select",
  component: FormSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => {
      return (
        <FormProvider {...useForm()}>
          <form>
            <Story />
          </form>
        </FormProvider>
      );
    },
  ],
  args: {
    placeholder: "Select an option",
    data: ["Option 1", "Option 2", "Option 3"].map((option) => ({
      label: option,
      value: option,
    })),
  },
} as Meta<typeof FormSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const template: StoryFn<typeof FormSelect> = (args: React.ComponentProps<typeof FormSelect>) => {
  const formSchema = z.object({
    test: z.string().min(2).max(100),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return <FormSelect {...args} form={form} name="test" />;
};

export const Default: Story = template.bind({});

export const WithLabel: Story = template.bind({});
WithLabel.args = {
  label: "Select Label",
};

export const WithDescription: Story = template.bind({});
WithDescription.args = {
  /* description: "Select Description", */
};
