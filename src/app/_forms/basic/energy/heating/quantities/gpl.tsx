import React from "react";
import Image from "next/image";
import { QuestionProps, QuestionFC } from "@/app/_forms/types";
import { FormField, FormItem } from "@/components/ui/forms";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";
import { FieldInput as Input, FieldSelect as FormSelect } from "@/components/forms";
import { cn } from "@/lib/utils";
import QuestionFrame from "@/app/_forms/components/QuestionFrame";
import QuestionSelectableCard from "@/app/_forms/components/QuestionSelectableCard";
import QuestionSubheading from "@/app/_forms/components/QuestionSubheading";

type GasTypeId = "butane" | "propane" | "butaneSmall" | "butaneBig" | "propaneBig" | "propaneSmall";

type GasType = {
  id: GasTypeId;
  format: "Grand Format" | "Petit Format";
  color: string;
  icon: { src: string; src2?: string; className?: string };
};

const gasTypes: GasType[] = [
  {
    id: "butane",
    format: "Grand Format",
    color: "from-green-400 to-teal-500",
    icon: { src: "/icons/gpl/butane13kg.png" },
  },
  {
    id: "propane",
    format: "Grand Format",
    color: "from-green-400 to-teal-500",
    icon: { src: "/icons/gpl/Propane35kg.png", className: "h-8 w-8" },
  },
  {
    id: "butaneSmall",
    format: "Petit Format",
    color: "from-blue-300 to-blue-400",
    icon: { src: "/icons/gpl/butane5 5.png" },
  },
  {
    id: "butaneBig",
    format: "Petit Format",
    color: "from-blue-300 to-blue-400",
    icon: { src: "/icons/gpl/butane10kg.png" },
  },
  {
    id: "propaneBig",
    format: "Petit Format",
    color: "from-teal-300 to-teal-400",
    icon: { src: "/icons/gpl/Frame 1.svg", src2: "/icons/gpl/Frame 2.svg" },
  },
  {
    id: "propaneSmall",
    format: "Petit Format",
    color: "from-teal-300 to-teal-400",
    icon: { src: "/icons/gpl/propane 5kg.png" },
  },
] as const;

const groupedByFormat = {
  big: gasTypes.filter((g) => g.format === "Grand Format"),
  small: gasTypes.filter((g) => g.format === "Petit Format"),
} as const;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const assetSrc = (path: string) => `${basePath}${encodeURI(path)}`;

function GasIcon({ type, alt }: { type: GasType; alt: string }) {
  const src = assetSrc(type.icon.src);
  const src2 = type.icon.src2 ? assetSrc(type.icon.src2) : null;
  return (
    <div
      className={cn(
        "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center",
        type.color
      )}
      aria-hidden="true"
    >
      {src2 ? (
        <div className="grid grid-cols-2 gap-1">
          <Image
            src={src}
            alt={alt}
            width={24}
            height={24}
            className={type.icon.className ? type.icon.className : "h-6 w-6"}
          />
          <Image src={src2} alt={alt} width={24} height={24} className="h-6 w-6" />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={24}
          height={24}
          className={type.icon.className ? type.icon.className : "h-6 w-6"}
        />
      )}
    </div>
  );
}

const Gpl: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.energy.heating.options.GPL");

  return (
    <QuestionFrame className="space-y-8">
      <div>
        <Typography asChild variant="title" size="sm" className="mb-2">
          <h3>{t("title")}</h3>
        </Typography>
        <Typography asChild variant="description" size="sm" className="mb-6">
          <p>{t("description")}</p>
        </Typography>

        {Object.entries(groupedByFormat).map(([format, items]) => (
          <div key={format} className="mb-8">
            <div className="mb-4">
              <QuestionSubheading>{t(format)}</QuestionSubheading>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {items.map((gasType) => (
                <FormField
                  key={gasType.id}
                  control={mainForm.control}
                  // @ts-expect-error dynamic field path (schema typed elsewhere)
                  name={`energy.heating.quantities.GPL.types.${format}.${gasType.id}`}
                  render={({ field }) => {
                    const label = t(`types.${gasType.id}`);
                    const checked = field.value === true;

                    return (
                      <FormItem>
                        <QuestionSelectableCard
                          tone="energy"
                          checked={checked}
                          onToggle={() => field.onChange(!checked)}
                          leading={<GasIcon type={gasType} alt={label} />}
                          title={label}
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <Input
                              form={mainForm}
                              name={`energy.heating.quantities.GPL.quantities.${gasType.id}.quantity`}
                              type="number"
                              fallback
                              unitAdornment={t("unit")}
                              unitAdornmentPlacement="end"
                              label={t("quantity")}
                              size="sm"
                            />

                            <FormSelect
                              fallback
                              label={t("frequency.placeholder")}
                              form={mainForm}
                              name={`energy.heating.quantities.GPL.quantities.${gasType.id}.frequency`}
                              placeholder={t("frequency.placeholder")}
                              size="sm"
                              data={[
                                { value: "month", label: t("frequency.month") },
                                { value: "year", label: t("frequency.year") },
                              ]}
                            />
                          </div>
                        </QuestionSelectableCard>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </QuestionFrame>
  );
};

Gpl["Symbol"] = {
  question: "forms.basic.energy.heating.options.GPL.title",
  fields: ["energy.heating.quantities.GPL", "energy.heating.quantities.GPL.quantities"],
};

export default Gpl;
