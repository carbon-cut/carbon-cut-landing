import Image from "next/image";
import { useScopedI18n } from "@/locales/client";

export default function ProductPreviewSection() {
  const t = useScopedI18n("home.preview");

  return (
    <section
      aria-label={t("ariaLabel")}
      className="flex justify-center py-16 px-4 bg-background"
    >
      <Image
        width={930}
        height={600}
        alt={t("imageAlt")}
        src={"home/Dashboard Screen.png"}
        className="mx-auto rounded-3xl shadow-xl timeline-view range-on-entry/30vh_80vh blur-md opacity-60 animate-deblur motion-reduce:animate-none no-animations:blur-0 no-animations:opacity-100"
      />
    </section>
  );
}
