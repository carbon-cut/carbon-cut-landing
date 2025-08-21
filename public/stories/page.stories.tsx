import { Meta, StoryObj } from "@storybook/nextjs";
import Layout from "../../src/app/layout";
import Page from "../../src/app/page";
import React from "react";

const meta: Meta<typeof Layout> = {
  title: "Pages/Home",
  component: Layout,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    children: <Page />,
  },
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const Default: Story = {};
