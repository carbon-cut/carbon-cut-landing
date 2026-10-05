import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "./button";

const meta = {
  title: "Design System/Button",
  component: Button,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Button primitive aligned to product-first behavior. Base motion is neutral and expressive behavior remains opt-in (`cta`, `footer`). Semantic utilities follow a standard split: `primary.*` for actions and `ink.*` for text/neutral.",
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VariantMatrix: Story = {
  render: () => {
    const variants = [
      "default",
      "outline",
      "secondary",
      "ghost",
      "link",
      "destructive",
      "cta",
      "footer",
    ] as const;
    const sizes = ["sm", "default", "lg"] as const;

    return (
      <div className="space-y-4">
        {variants.map((variant) => (
          <div key={variant} className="flex flex-wrap items-center gap-3">
            <span className="min-w-28 text-sm font-semibold text-foreground">{variant}</span>
            {sizes.map((size) => (
              <Button key={`${variant}-${size}`} variant={variant} size={size}>
                {variant}/{size}
              </Button>
            ))}
            <Button variant={variant} size="default" disabled>
              disabled
            </Button>
          </div>
        ))}
      </div>
    );
  },
};

export const OnDifferentSurfaces: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-border/10 bg-background p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-secondary">
          Background
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="default">Primary</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </div>
      <div className="rounded-xl border border-border/10 bg-surface-warm p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-secondary">
          Warm Surface
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="default">Primary</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </div>
      <div className="rounded-xl border border-border/10 bg-card p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-secondary">Card</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="default">Primary</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </div>
    </div>
  ),
};
