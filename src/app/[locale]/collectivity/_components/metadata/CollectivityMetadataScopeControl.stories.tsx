import type { Meta, StoryObj } from "@storybook/nextjs";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/forms";

import CollectivityMetadataDrawer from "./CollectivityMetadataDrawer";
import CollectivityMetadataScopeControl, {
  defaultDrawerLabels,
} from "./CollectivityMetadataScopeControl";
import type { CollectivityMetadataValue } from "./types";
import type { CollectivityTrendAssessment } from "./CollectivityMetadataTrendSection";

type DemoFormValues = {
  metadata: CollectivityMetadataValue;
};

const meta = {
  title: "Collectivity/Metadata/ScopeControl",
  component: CollectivityMetadataScopeControl,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

const filledValue: CollectivityMetadataValue = {
  source: {
    organization: "STEG",
    documentName: "Export électricité 2024",
    sourceType: "report",
  },
  quality: {
    status: "verified",
    confidence: "high",
  },
};

const possibleAnomalyTrend: CollectivityTrendAssessment = {
  historicalTrend: "decrease",
  recentTrend: "increase",
  anomalyStatus: "possibly_exceptional",
  selectedMethod: "recent_activity_trend",
  reasonCode: "recent_recovery_after_decline",
  expertNote: "La tendance récente suggère un contexte exceptionnel à confirmer.",
};

function StoryShell({ metadata }: { metadata: CollectivityMetadataValue }) {
  const form = useForm<DemoFormValues>({
    defaultValues: {
      metadata,
    },
  });

  return (
    <Form {...form}>
      <CollectivityMetadataScopeControl
        form={form}
        name="metadata"
        drawerTitle="Métadonnées"
        drawerDescription="Renseignez uniquement ce qui est utile pour cette portée."
      />
    </Form>
  );
}

export const EmptyScopeState: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl">
      <StoryShell metadata={{ source: {}, quality: {} }} />
    </div>
  ),
};

export const FilledScopeSummary: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl">
      <StoryShell metadata={filledValue} />
    </div>
  ),
};

export const DrawerOpenEditState: Story = {
  render: () => {
    function DrawerOpenStory() {
      const form = useForm<DemoFormValues>({
        defaultValues: {
          metadata: filledValue,
        },
      });

      return (
        <Form {...form}>
          <CollectivityMetadataDrawer
            open
            onOpenChange={() => undefined}
            title="Demande d'électricité"
            description="Renseignez la provenance et la qualité pour la demande d'électricité."
            form={form}
            name="metadata"
            labels={defaultDrawerLabels}
          />
        </Form>
      );
    }

    return (
      <div className="mx-auto max-w-2xl">
        <DrawerOpenStory />
      </div>
    );
  },
};

export const DrawerPossibleAnomalyState: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl">
      <p className="mb-3 text-sm text-secondary">
        Le composant trend reste séparé pour plus tard, mais il n’est pas monté dans le drawer.
      </p>
      <StoryShell metadata={filledValue} />
      <div className="mt-4 rounded-xl border border-dashed border-border/40 p-4 text-sm text-secondary">
        Trend demo: {possibleAnomalyTrend.reasonCode}
      </div>
    </div>
  ),
};

export const ClearResetState: Story = {
  render: () => {
    function ClearResetStory() {
      const form = useForm<DemoFormValues>({
        defaultValues: {
          metadata: filledValue,
        },
      });

      return (
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          <Form {...form}>
            <CollectivityMetadataScopeControl
              form={form}
              name="metadata"
              drawerTitle="Métadonnées"
              drawerDescription="Renseignez uniquement ce qui est utile pour cette portée."
            />
          </Form>
          <button
            type="button"
            className="w-fit rounded-full border border-border px-3 py-1 text-xs"
            onClick={() => form.reset({ metadata: { source: {}, quality: {} } })}
          >
            Réinitialiser
          </button>
        </div>
      );
    }

    return <ClearResetStory />;
  },
};
