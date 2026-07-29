"use client";

import { useMemo } from "react";

import MatrixTable from "@/components/table/matrix";
import { useScopedI18n } from "@/locales/client";

import {
  energyPriceKeys,
  energyPriceUnits,
} from "../InventorySchema/price-assumptions";
import { useInventoryContext } from "../context/inventory-context";
import type { InventoryTableRow } from "../types";

type PriceAssumptionKey = (typeof energyPriceKeys)[number];
type PriceAssumptionsTitleKey = "electricity" | "energy" | "fuelsAndElectricity";

export default function PriceAssumptionsTable({
  priceKeys,
  titleKey,
}: {
  priceKeys: readonly PriceAssumptionKey[];
  titleKey: PriceAssumptionsTitleKey;
}) {
  const { mainForm } = useInventoryContext();
  const tPriceAssumptions = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.priceAssumptionsTable"
  );

  const rows = useMemo<InventoryTableRow[]>(
    () =>
      priceKeys.map((key) => ({
        key,
        label: tPriceAssumptions(`rows.${key}`),
        unit: energyPriceUnits[key][0],
      })),
    [priceKeys, tPriceAssumptions]
  );

  return (
    <MatrixTable
      title={tPriceAssumptions(`titles.${titleKey}`)}
      rows={rows}
      form={mainForm}
      baseName="priceAssumptions.energy"
    />
  );
}
