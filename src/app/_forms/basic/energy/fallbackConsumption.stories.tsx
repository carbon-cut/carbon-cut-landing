import type { Meta, StoryObj } from "@storybook/nextjs";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/forms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import QuestionPrompt from "@/app/_forms/components/QuestionPrompt";
import { FieldInput as Input } from "@/components/forms";
import { shellLayout } from "@/app/form/_components/shellLayout";
import { Button } from "@/components/ui/button";
import QuestionFallbackRow from "@/app/_forms/components/QuestionFallbackRow";

type FormValues = {
  kwh?: number | "";
  eur?: number | "";
};

type Surface = "inline" | "tintedPanel";

function ArchetypeCard({
  title = "Energie",
  subtitle = "Fallback consumption input",
  children,
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={shellLayout.canvas}>
      <Card className={shellLayout.card}>
        <CardHeader className={shellLayout.cardHeader}>
          <CardTitle>
            <Typography asChild variant="title" size="md">
              <h2>{title}</h2>
            </Typography>
          </CardTitle>
          <CardDescription>
            <Typography asChild variant="description" size="sm">
              <p>{subtitle}</p>
            </Typography>
          </CardDescription>
        </CardHeader>
        <CardContent className={shellLayout.cardContent}>{children}</CardContent>
      </Card>
    </div>
  );
}

function FallbackPanel({ surface, children }: { surface: Surface; children: React.ReactNode }) {
  if (surface === "inline") return <div className="mt-4">{children}</div>;
  return <div className="mt-6 rounded-2xl bg-section-energy/10 p-4 md:p-5">{children}</div>;
}

function DualInputsDemo({ surface }: { surface: Surface }) {
  const form = useForm<FormValues>({
    defaultValues: { kwh: "", eur: "" },
    mode: "onChange",
  });

  return (
    <ArchetypeCard subtitle="Dual inputs (kWh preferred, € acceptable, both allowed)">
      <Form {...(form as any)}>
        <form className="space-y-4">
          <QuestionPrompt>
            En utilisant votre facture d&apos;électricité comme référence, quelle a été votre
            consommation d&apos;électricité au cours des 12 derniers mois?
          </QuestionPrompt>

          <Input
            form={form as any}
            name={"kwh" as any}
            type="number"
            label="Consommation (préféré)"
            unitAdornment="kWh"
            unitAdornmentPlacement="end"
          />

          <FallbackPanel surface={surface}>
            <Typography asChild variant="description" size="sm" className="text-foreground/80">
              <p className="leading-relaxed">
                Si vous n&apos;avez pas votre facture, vous pouvez indiquer votre dépense mensuelle.
                Vous pouvez aussi remplir les deux.
              </p>
            </Typography>
            <div className="mt-4">
              <Input
                form={form as any}
                name={"eur" as any}
                type="number"
                label="Dépense mensuelle (alternative)"
                unitAdornment="€"
                unitAdornmentPlacement="end"
              />
            </div>
          </FallbackPanel>
        </form>
      </Form>
    </ArchetypeCard>
  );
}

function SideBySideDemo({ note = true }: { note?: boolean }) {
  const form = useForm<FormValues>({
    defaultValues: { kwh: "", eur: "" },
    mode: "onChange",
  });

  return (
    <ArchetypeCard subtitle="Side-by-side inputs (kWh preferred, € acceptable)">
      <Form {...(form as any)}>
        <form className="space-y-4">
          <QuestionPrompt>
            En utilisant votre facture d&apos;électricité comme référence, quelle a été votre
            consommation d&apos;électricité au cours des 12 derniers mois?
          </QuestionPrompt>

          <QuestionFallbackRow
            note={
              note
                ? {
                    title: "Astuce",
                    description:
                      "Si vous avez la consommation, indiquez-la en kWh. Sinon, indiquez votre dépense en €. Vous pouvez remplir les deux.",
                  }
                : undefined
            }
            primary={
              <Input
                form={form as any}
                name={"kwh" as any}
                type="number"
                label="Consommation (préféré)"
                unitAdornment="kWh"
                unitAdornmentPlacement="end"
              />
            }
            fallback={
              <Input
                form={form as any}
                name={"eur" as any}
                type="number"
                label="Dépense mensuelle"
                unitAdornment="€"
                unitAdornmentPlacement="end"
              />
            }
          />
        </form>
      </Form>
    </ArchetypeCard>
  );
}

function RevealFallbackDemo({ surface, defaultOpen }: { surface: Surface; defaultOpen: boolean }) {
  const form = useForm<FormValues>({
    defaultValues: { kwh: "", eur: "" },
    mode: "onChange",
  });
  const [open, setOpen] = useState(defaultOpen);

  const helperCopy = useMemo(
    () => ({
      title: "Vous n’avez pas la consommation en kWh ?",
      body: "Indiquez votre dépense mensuelle en € (optionnel, mais accepté). Vous pouvez aussi remplir les deux.",
    }),
    []
  );

  return (
    <ArchetypeCard subtitle="Reveal fallback (€ hidden unless needed; still allows both)">
      <Form {...(form as any)}>
        <form className="space-y-4">
          <QuestionPrompt>
            En utilisant votre facture d&apos;électricité comme référence, quelle a été votre
            consommation d&apos;électricité au cours des 12 derniers mois?
          </QuestionPrompt>

          <Input
            form={form as any}
            name={"kwh" as any}
            type="number"
            label="Consommation (préféré)"
            unitAdornment="kWh"
            unitAdornmentPlacement="end"
          />

          <div className="flex items-center justify-between gap-3">
            <Typography asChild variant="caption" size="sm" className="text-muted-foreground">
              <p>Alternative disponible</p>
            </Typography>
            <Button type="button" variant="outline" size="sm" onClick={() => setOpen((v) => !v)}>
              {open ? "Masquer" : "Je ne sais pas"}
            </Button>
          </div>

          {open && (
            <FallbackPanel surface={surface}>
              <Typography asChild variant="subtitle" size="sm">
                <p>{helperCopy.title}</p>
              </Typography>
              <Typography
                asChild
                variant="description"
                size="sm"
                className="mt-1 text-foreground/80"
              >
                <p className="leading-relaxed">{helperCopy.body}</p>
              </Typography>
              <div className="mt-4">
                <Input
                  form={form as any}
                  name={"eur" as any}
                  type="number"
                  label="Dépense mensuelle"
                  unitAdornment="€"
                  unitAdornmentPlacement="end"
                />
              </div>
            </FallbackPanel>
          )}
        </form>
      </Form>
    </ArchetypeCard>
  );
}

const meta = {
  title: "Forms/Archetypes/FallbackConsumption",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DualInputsInline: Story = {
  render: () => <DualInputsDemo surface="inline" />,
};

export const DualInputsTintedPanel: Story = {
  render: () => <DualInputsDemo surface="tintedPanel" />,
};

export const SideBySide: Story = {
  render: () => <SideBySideDemo note />,
};

export const SideBySideMobile: Story = {
  render: () => <SideBySideDemo note />,
  globals: {
    viewport: { value: "mobile1" },
  },
  parameters: {
    options: {
      showPanel: false,
    },
  },
};

export const RevealFallbackInline: Story = {
  render: () => <RevealFallbackDemo surface="inline" defaultOpen />,
};

export const RevealFallbackTintedPanel: Story = {
  render: () => <RevealFallbackDemo surface="tintedPanel" defaultOpen />,
};

export const MobileRevealFallback: Story = {
  render: () => <RevealFallbackDemo surface="tintedPanel" defaultOpen={false} />,
  globals: {
    viewport: { value: "mobile1" },
  },
  parameters: {
    options: {
      showPanel: false,
    },
  },
};
