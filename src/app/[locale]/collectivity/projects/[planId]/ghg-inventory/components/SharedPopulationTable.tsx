"use client";

import MatrixTable from "@/components/table/matrix";
import { FieldRequired } from "@/components/ui/field-help";
import Typography from "@/components/ui/typography";
import { useScopedI18n } from "@/locales/client";

import { useInventoryContext } from "../context/inventory-context";
import { sharedData } from "../InventorySchema/shared-data/config";

export default function SharedPopulationTable() {
  const { mainForm } = useInventoryContext();
  const tNaturalGas = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.naturalGas"
  );
  const rows = sharedData.population.metricKeys.map((key) => ({
    key,
    label: tNaturalGas(`population.${key}`),
    unit: sharedData.population.units.dataSet[key][0],
  }));

  return (
    <MatrixTable
      title={
        <Typography variant="heading2" className="inline-flex items-center gap-1">
          <span>{tNaturalGas("populationTitle")}</span>
          <FieldRequired content={tNaturalGas("populationRequirementTooltip")} />
        </Typography>
      }
      rows={rows}
      form={mainForm}
      baseName="sharedData.population.dataSet"
    />
  );
}
