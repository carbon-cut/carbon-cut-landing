import Image from "next/image";
import { useScopedI18n } from "@/locales/client";

export default function ProductPreviewSection() {
  const t = useScopedI18n("home.preview");

  return (
    <div
      aria-label={t("ariaLabel")}
      className="flex justify-center bg-background/40  px-4 rounded-t-3xl isolate w-full"
    >
      <Image
        width={3000}
        height={3000}
        alt={t("imageAlt")}
        src={"home/Dashboard Screen.png"}
        className="mx-auto timeline-view range-on-entry/30vh_80vh blur-md opacity-60 animate-deblur motion-reduce:animate-none no-animations:blur-0 no-animations:opacity-100"
      />
    </div>
  );
}
