import { Meta, StoryObj } from "@storybook/nextjs";
import Layout from "../../src/app/[locale]/layout";
import Page from "../../src/app/[locale]/page";
import React from "react";

const meta: Meta<typeof Layout> = {
  title: "Pages/Home",
  component: Layout,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    children: <Page params={Promise.resolve({ locale: "fr" })} />,
  },
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const Default: Story = {};
