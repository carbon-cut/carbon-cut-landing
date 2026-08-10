import { getScopedI18n } from "@/locales/server";
import ProductPreviewSectionClient from "./productPreviewSection.client";

export default async function ProductPreviewSection() {
  const t = await getScopedI18n("home.whatItDoes");

  const content = {
    badge: t("badge"),
    title: t("title"),
    description: t("description"),
    imageAlt: t("imageAlt"),
    items: {
      guided: {
        step: t("items.guided.step"),
        title: t("items.guided.title"),
        description: t("items.guided.description"),
      },
      focus: {
        step: t("items.focus.step"),
        title: t("items.focus.title"),
        description: t("items.focus.description"),
      },
      result: {
        step: t("items.result.step"),
        title: t("items.result.title"),
        description: t("items.result.description"),
      },
    },
  };

  return <ProductPreviewSectionClient content={content} />;
}
