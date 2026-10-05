import type { Meta, StoryObj } from "@storybook/nextjs";
import React from "react";

type MatrixRow = {
  area: string;
  goodNow: string;
  mixedNow: string;
  preferred: string;
  notes: string;
};

const rows: MatrixRow[] = [
  {
    area: "Text / Content",
    goodNow: "text-foreground, text-foreground, text-muted-foreground",
    mixedNow: "some text-secondary used as body/content fallback",
    preferred: "text-foreground for key/default copy, muted-foreground for hierarchy",
    notes: "Status: mostly good. Low-risk area.",
  },
  {
    area: "Borders",
    goodNow: "border-border, border-input, border-primary-border",
    mixedNow: "many border-border/* in support/help/home/forms",
    preferred: "border-border or border-input by default; primary-border for action-tonal borders",
    notes: "Status: mixed. Best next cleanup target.",
  },
  {
    area: "Surfaces / Backgrounds",
    goodNow: "bg-card, bg-background, bg-surface-warm, bg-primary-subtle",
    mixedNow: "bg-muted/* used as overlays/tints in several sections",
    preferred: "card/background/muted/surface-* for containers",
    notes: "Status: mixed. Keep decorative exceptions explicit.",
  },
];

const quickActions = [
  "Start with support/help pages first (largest border-border concentration).",
  "Leave marketing overlays for last unless they are visibly inconsistent.",
  "Treat any remaining bg-muted/* and border-border/* as intentional exceptions and document them.",
] as const;

function Swatch({
  label,
  className,
  textClass = "text-foreground",
}: {
  label: string;
  className: string;
  textClass?: string;
}) {
  return (
    <div className="space-y-1">
      <div className={`h-12 rounded-md border border-border ${className}`} />
      <p className={`text-xs ${textClass}`}>{label}</p>
    </div>
  );
}

function VisualMatrix() {
  return (
    <section className="space-y-4 rounded-xl border border-border bg-card p-4">
      <h3 className="text-lg font-semibold text-foreground">Visual Matrix</h3>
      <div className="grid gap-4 lg:grid-cols-3">
        <article className="space-y-3 rounded-lg border border-border bg-background p-3">
          <p className="text-sm font-semibold text-foreground">Text / Content</p>
          <div className="rounded-md border border-border bg-card p-3">
            <p className="text-sm text-foreground">Primary/default content</p>
            <p className="text-sm text-foreground">Standard content (foreground)</p>
            <p className="text-sm text-muted-foreground">Muted content</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3 text-xs text-secondary">
            <p>
              <span className="font-semibold text-foreground">Purpose:</span> `foreground` for
              key/default body text, `muted-foreground` for supportive/meta text.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Swatch
              label="text-foreground (key/default text)"
              className="bg-card"
              textClass="text-foreground"
            />
            <Swatch
              label="text-foreground (default body)"
              className="bg-card"
              textClass="text-foreground"
            />
            <Swatch
              label="text-muted-foreground (support text)"
              className="bg-card"
              textClass="text-muted-foreground"
            />
          </div>
        </article>

        <article className="space-y-3 rounded-lg border border-border bg-background p-3">
          <p className="text-sm font-semibold text-foreground">Borders</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-md border border-border/20 bg-card p-2 text-secondary">
              Current mixed: border-border/20
            </div>
            <div className="rounded-md border border-input bg-card p-2 text-secondary">
              Preferred: border-input
            </div>
            <div className="rounded-md border border-border/10 bg-background p-2 text-secondary">
              Current mixed: border-border/10
            </div>
            <div className="rounded-md border border-border bg-background p-2 text-secondary">
              Preferred: border-border
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Swatch label="border-border" className="bg-card" />
            <Swatch label="border-input" className="bg-card" />
            <Swatch label="border-primary-border" className="bg-primary-subtle" />
          </div>
        </article>

        <article className="space-y-3 rounded-lg border border-border bg-background p-3">
          <p className="text-sm font-semibold text-foreground">Surfaces</p>
          <div className="rounded-md border border-border bg-muted/30 p-3 text-xs text-secondary">
            <p>
              <span className="font-semibold text-foreground">Use guide:</span> `bg-card` for
              default containers, `bg-muted` for secondary/quiet sections, `bg-surface-warm` for
              warm branded backgrounds, `bg-primary-subtle` for action-related highlights.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-md border border-border bg-muted/8 p-2 text-secondary">
              Current mixed: bg-muted/8
            </div>
            <div className="rounded-md border border-border bg-muted p-2 text-secondary">
              Preferred: bg-muted
            </div>
            <div className="rounded-md border border-border bg-muted/5 p-2 text-secondary">
              Current mixed: bg-muted/5
            </div>
            <div className="rounded-md border border-border bg-primary-subtle p-2 text-secondary">
              Preferred: bg-primary-subtle
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Swatch label="bg-card" className="bg-card" />
            <Swatch label="bg-surface-warm" className="bg-surface-warm" />
            <Swatch label="bg-muted" className="bg-muted" />
            <Swatch label="bg-primary-subtle" className="bg-primary-subtle" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-md border border-border bg-card p-2 text-secondary">
              `bg-card`: forms, cards, modal bodies, default content blocks
            </div>
            <div className="rounded-md border border-border bg-surface-warm p-2 text-secondary">
              `bg-surface-warm`: hero/CTA sections and warm branded panels
            </div>
            <div className="rounded-md border border-border bg-muted p-2 text-secondary">
              `bg-muted`: dividers, side panels, low-emphasis grouped areas
            </div>
            <div className="rounded-md border border-border bg-primary-subtle p-2 text-secondary">
              `bg-primary-subtle`: interactive emphasis, selected/active soft states
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

const meta = {
  title: "Design System/Token Semantics Matrix",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Small decision matrix for semantic cleanup planning. Use this to choose what to normalize first without reviewing the full token inventory.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Matrix: Story = {
  render: () => {
    return (
      <div className="mx-auto max-w-5xl space-y-6 text-foreground">
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">Token Semantics Matrix</h2>
          <p className="text-sm text-secondary">
            Snapshot of what is already solid vs where semantics are still mixed.
          </p>
        </section>

        <VisualMatrix />

        <section className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-semibold text-foreground">Area</th>
                <th className="px-4 py-3 font-semibold text-foreground">Good Now</th>
                <th className="px-4 py-3 font-semibold text-foreground">Still Mixed</th>
                <th className="px-4 py-3 font-semibold text-foreground">Preferred Direction</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.area} className="border-b border-border last:border-b-0">
                  <td className="px-4 py-3 font-medium text-foreground">{row.area}</td>
                  <td className="px-4 py-3 text-secondary">{row.goodNow}</td>
                  <td className="px-4 py-3 text-secondary">{row.mixedNow}</td>
                  <td className="px-4 py-3 text-secondary">{row.preferred}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="space-y-2 rounded-xl border border-border bg-background p-4">
          <h3 className="text-lg font-semibold text-foreground">Recommended Next Pass</h3>
          <ul className="list-disc space-y-1 pl-5 text-sm text-secondary">
            {quickActions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ul>
        </section>

        <section className="grid gap-3 md:grid-cols-3">
          {rows.map((row) => (
            <article
              key={`${row.area}-status`}
              className="rounded-xl border border-border bg-card p-3"
            >
              <p className="text-sm font-semibold text-foreground">{row.area}</p>
              <p className="mt-1 text-xs text-muted-foreground">{row.notes}</p>
            </article>
          ))}
        </section>
      </div>
    );
  },
};
