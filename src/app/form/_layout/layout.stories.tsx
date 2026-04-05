import { Meta, StoryObj } from "@storybook/nextjs";
import Layout from "../layout";
import React from "react";

const meta: Meta<typeof Layout> = {
  title: "Layout/Form",
  component: Layout,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    children: (
      <div className="min-h-screen bg-surface-warm px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/40 bg-white/70 p-10 shadow-lg">
          <h2 className="text-3xl font-extrabold text-primary">Form Layout Shell</h2>
          <p className="mt-4 text-base text-muted-foreground">
            Story-only shell for reviewing the layout context without router or server runtime.
          </p>
        </div>
      </div>
    ),
  },
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const Default: Story = {};
