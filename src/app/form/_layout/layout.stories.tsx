import { Meta, StoryObj } from "@storybook/nextjs";
import Layout from "../layout";
import Page from "../page";
import React from "react";

const meta: Meta<typeof Layout> = {
  title: "Layout/Form",
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
