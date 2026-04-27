"use client";

import { useMemo, useState } from "react";

import CollectivityMetadataScopeControl from "@/app/collectivity/_components/metadata/CollectivityMetadataScopeControl";
import type {
  CollectivityMetadataValue,
  CollectivityTrendAssessment,
  CollectivityTrendReviewDecision,
} from "@/app/collectivity/_components/metadata";
import InventoryYearBlockTables from "../../../components/InventoryYearBlockTables";
import { useInventoryContext } from "../../../context/inventory-context";
import type { InventoryYearBlockTableBlock } from "../../../types";

type ElectricityMetadataScopeKey = "tab" | "bt" | "mt" | "ht";

const scopeTitles: Record<ElectricityMetadataScopeKey, string> = {
  tab: "Demande d'électricité",
  bt: "Basse tension",
  mt: "Moyenne tension",
  ht: "Haute tension",
};

const emptyMetadataState: Record<ElectricityMetadataScopeKey, CollectivityMetadataValue | null> = {
  tab: null,
  bt: null,
  mt: null,
  ht: null,
};

const emptyTrendDecisionState: Record<
  ElectricityMetadataScopeKey,
  CollectivityTrendReviewDecision | null
> = {
  tab: null,
  bt: null,
  mt: null,
  ht: null,
};

function getDrawerDescription(scopeTitle: string) {
  return `Renseignez la provenance et la qualité pour ${scopeTitle.toLowerCase()}.`;
}

function parseNumber(value: string) {
  const normalized = value.trim().replace(/\s/g, "").replace(",", ".");
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : null;
}

function formatTrendAssessment(
  yearlyValues: Array<{ year: number; value: number | null }>
): CollectivityTrendAssessment | null {
  const validValues = yearlyValues.filter((item): item is { year: number; value: number } =>
    item.value !== null
  );

  if (validValues.length < 2) {
    return null;
  }

  const first = validValues[0];
  const last = validValues[validValues.length - 1];
  const previous = validValues[validValues.length - 2] ?? last;

  const historicalTrend =
    last.value > first.value ? "increase" : last.value < first.value ? "decrease" : "stable";

  const recentTrend =
    last.value > previous.value
      ? "increase"
      : last.value < previous.value
        ? "decrease"
        : "stable";

  if (historicalTrend === "decrease" && recentTrend === "increase") {
    return {
      historicalTrend,
      recentTrend,
      anomalyStatus: "possibly_exceptional",
      selectedMethod: "recent_activity_trend",
      reasonCode: "recent_recovery_after_decline",
      expertNote: "La tendance récente peut indiquer un contexte exceptionnel à vérifier.",
    };
  }

  if (historicalTrend === "decrease" && recentTrend !== "increase") {
    return {
      historicalTrend,
      recentTrend,
      anomalyStatus: "confirmed_exceptional",
      selectedMethod: "constant_value_stagnation",
      reasonCode: "decline_not_recovered",
      expertNote: "La baisse reste non compensée sur la période récente.",
    };
  }

  return {
    historicalTrend,
    recentTrend,
    anomalyStatus: "normal",
    selectedMethod:
      historicalTrend === "increase" ? "historical_activity_trend" : "recent_activity_trend",
    reasonCode: historicalTrend === "increase" ? "consistent_growth" : "flat_or_recovering",
  };
}

function getBlockTrendAssessment(
  block: InventoryYearBlockTableBlock,
  years: number[],
  getValue: (blockKey: string, rowKey: string, columnKey: string, yearValue: number) => string
) {
  const yearlyValues = years.map((year) => {
    const total = block.columns.reduce<number | null>((sum, column) => {
      const rawValue = getValue(block.key, "consumption", column.key, year);
      const parsedValue = parseNumber(rawValue);

      if (parsedValue === null) {
        return sum;
      }

      return (sum ?? 0) + parsedValue;
    }, null);

    return { year, value: total };
  });

  return formatTrendAssessment(yearlyValues);
}

function scopeKeyFromBlock(
  block: InventoryYearBlockTableBlock
): Exclude<ElectricityMetadataScopeKey, "tab"> {
  return block.key as Exclude<ElectricityMetadataScopeKey, "tab">;
}

export default function ElectricityMetadataPilot({
  blocks,
  description,
  getValue,
}: {
  blocks: InventoryYearBlockTableBlock[];
  description?: string;
  getValue: (blockKey: string, rowKey: string, columnKey: string, yearValue: number) => string;
}) {
  const [metadataByScope, setMetadataByScope] = useState(emptyMetadataState);
  const [trendDecisionByScope, setTrendDecisionByScope] = useState(emptyTrendDecisionState);
  const { years } = useInventoryContext();

  const trendAssessmentByScope = useMemo(() => {
    const assessmentByScope: Record<ElectricityMetadataScopeKey, CollectivityTrendAssessment | null> = {
      tab: null,
      bt: null,
      mt: null,
      ht: null,
    };

    const tabYearlyValues = years.map((year) => {
      const total = blocks.reduce<number | null>((blockSum, block) => {
        const blockTotal = block.columns.reduce<number | null>((sum, column) => {
          const rawValue = getValue(block.key, "consumption", column.key, year);
          const parsedValue = parseNumber(rawValue);

          if (parsedValue === null) {
            return sum;
          }

          return (sum ?? 0) + parsedValue;
        }, null);

        if (blockTotal === null) {
          return blockSum;
        }

        return (blockSum ?? 0) + blockTotal;
      }, null);

      return { year, value: total };
    });

    assessmentByScope.tab = formatTrendAssessment(tabYearlyValues);

    for (const block of blocks) {
      const scopeKey = scopeKeyFromBlock(block);
      assessmentByScope[scopeKey] = getBlockTrendAssessment(block, years, getValue);
    }

    return assessmentByScope;
  }, [blocks, getValue, years]);

  const updateScope = (scopeKey: ElectricityMetadataScopeKey, value: CollectivityMetadataValue | null) => {
    setMetadataByScope((current) => ({
      ...current,
      [scopeKey]: value,
    }));
  };

  const updateTrendDecision = (
    scopeKey: ElectricityMetadataScopeKey,
    value: CollectivityTrendReviewDecision | null
  ) => {
    setTrendDecisionByScope((current) => ({
      ...current,
      [scopeKey]: value,
    }));
  };

  return (
    <section className="space-y-4">
      <CollectivityMetadataScopeControl
        drawerTitle={scopeTitles.tab}
        drawerDescription={getDrawerDescription(scopeTitles.tab)}
        value={metadataByScope.tab}
        trendAssessment={trendAssessmentByScope.tab}
        trendDecision={trendDecisionByScope.tab}
        onTrendDecisionChange={(nextValue) => updateTrendDecision("tab", nextValue)}
        onSave={(nextValue) => updateScope("tab", nextValue)}
        onClear={() => updateScope("tab", null)}
        addLabel="Ajouter"
        editLabel="Modifier"
        emptyLabel="Aucune métadonnée"
      />

      <InventoryYearBlockTables
        title="Demande d'électricité"
        description={
          description ??
          "Chaque année garde sa propre lecture, avec un bloc par niveau de tension."
        }
        blocks={blocks}
        getValue={getValue}
        renderBlockHeaderAddon={(block) => {
          const scopeKey = scopeKeyFromBlock(block);
          return (
            <CollectivityMetadataScopeControl
              drawerTitle={scopeTitles[scopeKey]}
              drawerDescription={getDrawerDescription(scopeTitles[scopeKey])}
              value={metadataByScope[scopeKey]}
              trendAssessment={trendAssessmentByScope[scopeKey]}
              trendDecision={trendDecisionByScope[scopeKey]}
              onTrendDecisionChange={(nextValue) => updateTrendDecision(scopeKey, nextValue)}
              onSave={(nextValue) => updateScope(scopeKey, nextValue)}
              onClear={() => updateScope(scopeKey, null)}
              addLabel="Ajouter"
              editLabel="Modifier"
              emptyLabel="Aucune métadonnée"
              className="pt-0.5"
            />
          );
        }}
      />
    </section>
  );
}
