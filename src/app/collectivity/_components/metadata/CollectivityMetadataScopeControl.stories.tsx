import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/nextjs";

import CollectivityMetadataDrawer from "./CollectivityMetadataDrawer";
import CollectivityMetadataScopeControl, {
  defaultDrawerLabels,
} from "./CollectivityMetadataScopeControl";
import type {
  CollectivityMetadataValue,
  CollectivityTrendAssessment,
} from "./types";

const meta = {
  title: "Collectivity/Metadata/ScopeControl",
  component: CollectivityMetadataScopeControl,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CollectivityMetadataScopeControl>;

export default meta;
type Story = StoryObj<typeof meta>;

const filledValue: CollectivityMetadataValue = {
  organization: "STEG",
  documentName: "Export électricité 2024",
  status: "verified",
  confidence: "high",
};

const possibleAnomalyTrend: CollectivityTrendAssessment = {
  historicalTrend: "decrease",
  recentTrend: "increase",
  anomalyStatus: "possibly_exceptional",
  selectedMethod: "recent_activity_trend",
  reasonCode: "recent_recovery_after_decline",
  expertNote: "La tendance récente suggère un contexte exceptionnel à confirmer.",
};

export const EmptyScopeState: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl">
      <CollectivityMetadataScopeControl
        drawerTitle="Métadonnées"
        drawerDescription="Renseignez uniquement ce qui est utile pour cette portée."
        value={null}
        onSave={() => undefined}
        onClear={() => undefined}
        addLabel="Ajouter"
        editLabel="Modifier"
        emptyLabel="Aucune métadonnée"
      />
    </div>
  ),
};

export const FilledScopeSummary: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl">
      <CollectivityMetadataScopeControl
        drawerTitle="Métadonnées"
        drawerDescription="Renseignez uniquement ce qui est utile pour cette portée."
        value={filledValue}
        onSave={() => undefined}
        onClear={() => undefined}
        addLabel="Ajouter"
        editLabel="Modifier"
        emptyLabel="Aucune métadonnée"
      />
    </div>
  ),
};

export const DrawerOpenEditState: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl">
      <CollectivityMetadataDrawer
        open
        onOpenChange={() => undefined}
        title="Demande d'électricité"
        description="Renseignez la provenance et la qualité pour la demande d'électricité."
        value={filledValue}
        labels={defaultDrawerLabels}
        onSave={() => undefined}
        onClear={() => undefined}
      />
    </div>
  ),
};

export const DrawerPossibleAnomalyState: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl">
      <CollectivityMetadataDrawer
        open
        onOpenChange={() => undefined}
        title="Demande d'électricité"
        description="Renseignez la provenance et la qualité pour la demande d'électricité."
        value={filledValue}
        trendAssessment={possibleAnomalyTrend}
        trendDecision={null}
        onTrendDecisionChange={() => undefined}
        labels={defaultDrawerLabels}
        onSave={() => undefined}
        onClear={() => undefined}
      />
    </div>
  ),
};

export const ClearResetState: Story = {
  render: () => {
    function ClearResetStory() {
      const [value, setValue] = useState<CollectivityMetadataValue | null>(filledValue);

      return (
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          <CollectivityMetadataScopeControl
            drawerTitle="Métadonnées"
            drawerDescription="Renseignez uniquement ce qui est utile pour cette portée."
            value={value}
            onSave={(nextValue) => setValue(nextValue)}
            onClear={() => setValue(null)}
            addLabel="Ajouter"
            editLabel="Modifier"
            emptyLabel="Aucune métadonnée"
          />
          <button
            type="button"
            className="w-fit rounded-full border border-border px-3 py-1 text-xs"
            onClick={() => setValue(null)}
          >
            Réinitialiser
          </button>
        </div>
      );
    }

    return <ClearResetStory />;
  },
};
