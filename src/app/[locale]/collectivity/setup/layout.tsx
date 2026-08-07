import type { ReactNode } from "react";

export default function CollectivitySetupLayout({ children }: { children: ReactNode }) {
  return (
    <main id="content" className="min-h-screen bg-black/55 px-4 py-8">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full items-center justify-center">
        <div className="w-full max-w-2xl rounded-3xl border border-border/70 bg-card px-6 py-7 shadow-xl md:px-8 md:py-8">
          {children}
        </div>
      </section>
    </main>
  );
}
