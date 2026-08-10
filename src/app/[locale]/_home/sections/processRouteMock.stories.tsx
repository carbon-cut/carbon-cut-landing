import type { Meta, StoryObj } from "@storybook/nextjs";

function ProcessRouteMock() {
  return (
    <div className="min-h-screen bg-surface-warm px-10 py-16 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <div className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-chart-3/80">
            Route Mock
          </div>
          <h2 className="mt-4 text-4xl font-semibold text-foreground">Process route only</h2>
          <p className="mt-4 max-w-xl text-lg text-foreground/70">
            Standalone route study. No cards, no content composition. Only the path geometry and
            node rhythm.
          </p>
        </div>

        <div className="relative h-[1100px] overflow-hidden rounded-[2.5rem] border border-border/8 bg-card/18">
          <svg
            viewBox="0 0 1200 1200"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <path
              d="M 140 120
                 H 660
                 C 820 120 900 205 900 360
                 V 520
                 C 900 610 850 650 760 650
                 H 340
                 C 185 650 110 735 110 890
                 V 1080
                 H 140"
              fill="none"
              stroke="hsl(var(--chart-3))"
              strokeWidth="20"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle
              cx="140"
              cy="120"
              r="54"
              fill="hsl(var(--surface-warm))"
              stroke="hsl(var(--chart-3))"
              strokeWidth="15"
            />
            <circle
              cx="900"
              cy="520"
              r="54"
              fill="hsl(var(--surface-warm))"
              stroke="hsl(var(--chart-3))"
              strokeWidth="15"
            />
            <circle
              cx="140"
              cy="1080"
              r="54"
              fill="hsl(var(--surface-warm))"
              stroke="hsl(var(--chart-3))"
              strokeWidth="15"
            />

            <path
              d="M 1060 280 V 890"
              fill="none"
              stroke="hsl(var(--chart-3))"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M 1015 845 L 1060 890 L 1105 845"
              fill="none"
              stroke="hsl(var(--chart-3))"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: "Home/ProcessRouteMock",
  component: ProcessRouteMock,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ProcessRouteMock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {};
