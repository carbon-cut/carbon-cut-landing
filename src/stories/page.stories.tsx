import Page from "../app/page";
import Layout from "../app/layout";
import { Meta } from "@storybook/nextjs-vite";
const meta: Meta<typeof Page> = {
  title: "Pages/home",
  component: Page,
  decorators:[
    (Story) => (
      <Layout>
        <Story />
      </Layout>
    )
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default = {
  args: {},
};
