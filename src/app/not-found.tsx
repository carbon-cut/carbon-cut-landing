import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useScopedServerI18n } from "@/locales/server";

function NotFound() {
  const t = useScopedServerI18n("(pages)");
  const tNav = useScopedServerI18n("home.nav");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background px-6 py-16">
      <div className="pointer-events-none absolute inset-0 opacity-90">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,hsl(var(--chart-1)_/_0.30),transparent_40%),radial-gradient(circle_at_80%_20%,hsl(var(--chart-2)_/_0.22),transparent_42%),radial-gradient(circle_at_50%_78%,hsl(var(--chart-3)_/_0.18),transparent_45%)]" />
      </div>
      <div className="relative max-w-3xl w-full text-center space-y-6 px-4 text-primary">
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--chart-1))] via-[hsl(var(--chart-2))] to-[hsl(var(--chart-3))] text-6xl md:text-8xl font-black tracking-tight drop-shadow-sm">
          404
        </p>
        <h1 className="text-3xl md:text-4xl font-bold drop-shadow-sm">{t("404.title")}</h1>
        <p className="text-lg md:text-xl leading-relaxed whitespace-pre-line text-secondary">
          {t("404.description")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild className="px-7 py-5 text-base shadow-lg shadow-primary/20">
            <Link href="/">{t("404.button")}</Link>
          </Button>
          <Link
            className="text-primary underline-offset-4 hover:underline text-base font-medium"
            href="/#faq"
          >
            {tNav("faq")}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
