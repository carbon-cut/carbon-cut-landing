"use client";

import { useMemo } from "react";

import GroupedYear from "@/components/table/grouped-year";
import MatrixTable from "@/components/table/matrix";
import { FieldRequired } from "@/components/ui/field-help";
import { useScopedI18n } from "@/locales/client";
import Typography from "@/components/ui/typography";
import { useInventoryContext } from "../../../context/inventory-context";
import {
  buildFruitTreesRows,
  buildTrackedTreeCropRowFields,
  buildTrackedTreeCropsEditableRows,
  buildTrackedTreeCropsSection,
} from "./config";

export default function TreesSurface() {
  const { mainForm } = useInventoryContext();
  const tTrees = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.trees"
  );

  const trackedSection = useMemo(() => buildTrackedTreeCropsSection(tTrees), [tTrees]);
  const trackedEditableRows = useMemo(() => buildTrackedTreeCropsEditableRows(tTrees), [tTrees]);
  const trackedRowFields = useMemo(() => buildTrackedTreeCropRowFields(tTrees), [tTrees]);
  const fruitTreesRows = useMemo(() => buildFruitTreesRows(tTrees), [tTrees]);

  return (
    <div className="space-y-6">
      <GroupedYear
        title={trackedSection.title}
        description={trackedSection.description}
        rows={trackedSection.rows}
        subcolumns={trackedSection.subcolumns}
        form={mainForm}
        baseName="afat.trees.trackedTreeCrops.dataSet"
        editableRows={trackedEditableRows}
        rowFields={trackedRowFields}
      />

      <MatrixTable
        title={
          <Typography variant="sectionTitle" size="lg" className="inline-flex items-center gap-1">
            <span>{tTrees("fruitTrees.title")}</span>
            <FieldRequired />
          </Typography>
        }
        rows={fruitTreesRows}
        form={mainForm}
        baseName="afat.trees.fruitTrees.dataSet"
      />
    </div>
  );
}
