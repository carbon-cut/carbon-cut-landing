import React, { type ReactNode } from "react";

export default function AuthShellLayout({ children }: { children: ReactNode }) {
  return (
    <main id="content" className="min-h-screen bg-black/55 px-4 py-10 md:py-16">
      <section className="mx-auto flex w-full max-w-5xl items-center justify-center">
        <div className="w-full rounded-3xl border border-border bg-card px-5 py-6 shadow-xl md:px-10 md:py-10">
          {children}
        </div>
      </section>
    </main>
  );
}
