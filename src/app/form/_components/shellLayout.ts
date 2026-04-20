export const shellLayout = {
  canvas: "min-h-screen bg-surface-warm px-4 py-10 md:px-8",
  frame: "relative mx-auto w-full max-w-[850px] px-0 pt-20 md:pt-24",
  progressWrap: "mb-8",
  tabsRailWrap: "relative mb-4 flex justify-center",
  tabsRail:
    "h-fit max-w-full flex-wrap space-x-2 rounded-full border border-border bg-card p-2 shadow-lg",
  cardWrap: "mx-4 border-0",
  sectionIconWrap: "mb-4 flex justify-center",
  sectionIcon: "rounded-full p-4",
  card: "relative rounded-2xl border border-border/70 bg-transparent bg-gradient-to-br from-card via-card/80 to-card/30 pt-6 shadow-lg backdrop-blur-sm",
  cardHeader: "relative z-10 pb-0 pt-6 text-center",
  // Owns horizontal padding so prompt + fields share one left edge.
  cardContent: "p-8 pt-3 md:p-[3.5rem] md:pt-3",
  actionRow: "mt-4 mb-8 grid grid-cols-2 gap-3 md:grid-cols-4",
} as const;
