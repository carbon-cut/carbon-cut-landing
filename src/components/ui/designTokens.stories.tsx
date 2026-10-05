import type { Meta, StoryObj } from "@storybook/nextjs";
import React from "react";

type ColorToken = {
  name: string;
  cssVar: string;
  utility: string;
  note?: string;
};

type GradientToken = {
  name: string;
  cssVar: string;
  utility: string;
  note?: string;
};

const semanticColorTokens: ColorToken[] = [
  { name: "background", cssVar: "--background", utility: "bg-background text-foreground" },
  { name: "foreground", cssVar: "--foreground", utility: "text-foreground" },
  { name: "surface-warm", cssVar: "--surface-warm", utility: "bg-surface-warm" },
  { name: "card", cssVar: "--card", utility: "bg-card text-card-foreground" },
  { name: "card-foreground", cssVar: "--card-foreground", utility: "text-card-foreground" },
  {
    name: "card-primary",
    cssVar: "--card-primary",
    utility: "bg-card-primary text-card-primary-foreground",
  },
  {
    name: "card-primary-foreground",
    cssVar: "--card-primary-foreground",
    utility: "text-card-primary-foreground",
  },
  {
    name: "card-primary-muted",
    cssVar: "--card-primary-muted",
    utility: "text-card-primary-muted",
  },
  { name: "popover", cssVar: "--popover", utility: "bg-popover text-popover-foreground" },
  {
    name: "popover-foreground",
    cssVar: "--popover-foreground",
    utility: "text-popover-foreground",
  },
  {
    name: "primary",
    cssVar: "--primary",
    utility: "bg-primary text-primary-foreground",
    note: "Action color",
  },
  {
    name: "primary-foreground",
    cssVar: "--primary-foreground",
    utility: "text-primary-foreground",
  },
  { name: "primary-hover", cssVar: "--primary-hover", utility: "bg-primary-hover" },
  { name: "primary-subtle", cssVar: "--primary-subtle", utility: "bg-primary-subtle" },
  {
    name: "primary-subtle-hover",
    cssVar: "--primary-subtle-hover",
    utility: "bg-primary-subtle-hover",
  },
  { name: "primary-border", cssVar: "--primary-border", utility: "border-primary-border" },
  { name: "secondary", cssVar: "--secondary", utility: "bg-secondary text-secondary-foreground" },
  {
    name: "secondary-foreground",
    cssVar: "--secondary-foreground",
    utility: "text-secondary-foreground",
  },
  { name: "muted", cssVar: "--muted", utility: "bg-muted text-muted-foreground" },
  { name: "muted-foreground", cssVar: "--muted-foreground", utility: "text-muted-foreground" },
  { name: "accent", cssVar: "--accent", utility: "bg-accent text-accent-foreground" },
  { name: "accent-foreground", cssVar: "--accent-foreground", utility: "text-accent-foreground" },
  {
    name: "destructive",
    cssVar: "--destructive",
    utility: "bg-destructive text-destructive-foreground",
  },
  {
    name: "destructive-foreground",
    cssVar: "--destructive-foreground",
    utility: "text-destructive-foreground",
  },
  { name: "border", cssVar: "--border", utility: "border-border" },
  { name: "input", cssVar: "--input", utility: "bg-input border-input" },
  { name: "ring", cssVar: "--ring", utility: "ring-ring" },
  { name: "chart-1", cssVar: "--chart-1", utility: "text-chart-1 bg-chart-1" },
  { name: "chart-2", cssVar: "--chart-2", utility: "text-chart-2 bg-chart-2" },
  { name: "chart-3", cssVar: "--chart-3", utility: "text-chart-3 bg-chart-3" },
  { name: "chart-4", cssVar: "--chart-4", utility: "text-chart-4 bg-chart-4" },
  { name: "chart-5", cssVar: "--chart-5", utility: "text-chart-5 bg-chart-5" },
];

const sectionTokens: ColorToken[] = [
  { name: "section-transport", cssVar: "--section-transport", utility: "bg-section-transport" },
  {
    name: "section-transport-light",
    cssVar: "--section-transport-light",
    utility: "bg-section-light-transport",
  },
  { name: "section-food", cssVar: "--section-food", utility: "bg-section-food" },
  { name: "section-food-light", cssVar: "--section-food-light", utility: "bg-section-light-food" },
  { name: "section-vacation", cssVar: "--section-vacation", utility: "bg-section-vacation" },
  {
    name: "section-vacation-light",
    cssVar: "--section-vacation-light",
    utility: "bg-section-light-vacation",
  },
  { name: "section-energy", cssVar: "--section-energy", utility: "bg-section-energy" },
  {
    name: "section-energy-light",
    cssVar: "--section-energy-light",
    utility: "bg-section-light-energy",
  },
  { name: "section-waste", cssVar: "--section-waste", utility: "bg-section-waste" },
  {
    name: "section-waste-light",
    cssVar: "--section-waste-light",
    utility: "bg-section-light-waste",
  },
];

const gradientTokens: GradientToken[] = [
  {
    name: "linear-primary-diagonal",
    cssVar: "--linear-primary-diagonal",
    utility: "bg-linear-primary-diagonal",
  },
  {
    name: "linear-accent-horizontal",
    cssVar: "--linear-accent-horizontal",
    utility: "bg-linear-accent-horizontal",
  },
  {
    name: "linear-accent-diagonal",
    cssVar: "--linear-accent-diagonal",
    utility: "bg-linear-accent-diagonal",
  },
  {
    name: "linear-section-transport",
    cssVar: "--linear-section-transport",
    utility: "bg-linear-section-transport",
  },
  {
    name: "linear-section-food",
    cssVar: "--linear-section-food",
    utility: "bg-linear-section-food",
  },
  {
    name: "linear-section-vacation",
    cssVar: "--linear-section-vacation",
    utility: "bg-linear-section-vacation",
  },
  {
    name: "linear-section-energy",
    cssVar: "--linear-section-energy",
    utility: "bg-linear-section-energy",
  },
  {
    name: "linear-section-waste",
    cssVar: "--linear-section-waste",
    utility: "bg-linear-section-waste",
  },
];

function TokenGrid({ title, tokens }: { title: string; tokens: ColorToken[] }) {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tokens.map((token) => (
          <article key={token.cssVar} className="rounded-xl border border-border/10 bg-card p-3">
            <div
              className="h-16 rounded-md border border-border/10"
              style={{ backgroundColor: `hsl(var(${token.cssVar}))` }}
            />
            <p className="mt-2 text-sm font-semibold text-foreground">{token.name}</p>
            <p className="text-xs text-secondary">{token.cssVar}</p>
            <p className="mt-1 text-xs text-muted-foreground">{token.utility}</p>
            {token.note ? <p className="mt-1 text-xs text-chart-3">{token.note}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function GradientGrid({ tokens }: { tokens: GradientToken[] }) {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Gradient Tokens</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tokens.map((token) => (
          <article key={token.cssVar} className="rounded-xl border border-border/10 bg-card p-3">
            <div
              className="h-16 rounded-md border border-border/10"
              style={{ backgroundImage: `var(${token.cssVar})` }}
            />
            <p className="mt-2 text-sm font-semibold text-foreground">{token.name}</p>
            <p className="text-xs text-secondary">{token.cssVar}</p>
            <p className="mt-1 text-xs text-muted-foreground">{token.utility}</p>
            {token.note ? <p className="mt-1 text-xs text-chart-3">{token.note}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function UtilityMappingTable() {
  const rows = [
    { type: "Color", utility: "bg-primary", source: "--primary" },
    { type: "Color", utility: "text-foreground", source: "--foreground" },
    { type: "Color", utility: "border-primary-border", source: "--primary-border" },
    { type: "Color", utility: "text-chart-3", source: "--chart-3" },
    {
      type: "Gradient",
      utility: "bg-linear-primary-diagonal",
      source: "--linear-primary-diagonal",
    },
    {
      type: "Gradient",
      utility: "bg-linear-accent-horizontal",
      source: "--linear-accent-horizontal",
    },
    { type: "Gradient", utility: "bg-linear-accent-diagonal", source: "--linear-accent-diagonal" },
    {
      type: "Gradient",
      utility: "bg-linear-section-transport",
      source: "--linear-section-transport",
    },
    { type: "Gradient", utility: "bg-linear-section-energy", source: "--linear-section-energy" },
    {
      type: "Behavior",
      utility: "transition-discrete",
      source: "transition-behavior: allow-discrete",
    },
  ] as const;

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Utility Mapping</h3>
      <div className="overflow-x-auto rounded-xl border border-border/10 bg-card">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border/10 bg-muted/5">
            <tr>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">Utility</th>
              <th className="px-4 py-3 font-semibold">Source</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={`${row.type}-${row.utility}`}
                className="border-b border-border/10 last:border-b-0"
              >
                <td className="px-4 py-3 text-secondary">{row.type}</td>
                <td className="px-4 py-3 font-medium text-foreground">{row.utility}</td>
                <td className="px-4 py-3 text-secondary">{row.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ThemePreview({ dark = false }: { dark?: boolean }) {
  const themeLabel = dark ? "Dark Theme Preview" : "Light Theme Preview";

  return (
    <section className={dark ? "dark" : ""}>
      <div className="space-y-4 rounded-2xl border border-border/10 bg-background p-4">
        <h3 className="text-lg font-semibold text-foreground">{themeLabel}</h3>
        <div className="grid gap-3 md:grid-cols-3">
          <article className="rounded-xl border border-border bg-card p-3">
            <p className="text-sm font-semibold text-foreground">Surface</p>
            <p className="mt-1 text-sm text-muted-foreground">card + border + muted text</p>
          </article>
          <article className="rounded-xl border border-primary-border bg-primary-subtle p-3">
            <p className="text-sm font-semibold text-foreground">Primary Subtle</p>
            <button className="mt-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              Primary Action
            </button>
          </article>
          <article className="rounded-xl border border-border/10 bg-card p-3">
            <p className="text-sm font-semibold text-foreground">Gradient CTA</p>
            <button className="mt-2 rounded-full bg-linear-primary-diagonal px-3 py-1 text-xs font-semibold text-primary-foreground">
              CTA Gradient
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}

const meta = {
  title: "Design System/Tokens",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Complete token inventory to support naming cleanup and semantic decisions. Includes semantic tokens, section tokens, gradients, utility mappings, and light/dark previews.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullInventory: Story = {
  render: () => {
    return (
      <div className="mx-auto max-w-7xl space-y-8 p-2 text-foreground">
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">Design Token Inventory</h2>
          <p className="text-sm text-secondary">
            Use this page as the source of truth for cleanup decisions before renaming.
          </p>
        </section>
        <UtilityMappingTable />
        <TokenGrid title="Semantic Color Tokens" tokens={semanticColorTokens} />
        <TokenGrid title="Section Color Tokens" tokens={sectionTokens} />
        <GradientGrid tokens={gradientTokens} />
        <ThemePreview />
        <ThemePreview dark />
      </div>
    );
  },
};
