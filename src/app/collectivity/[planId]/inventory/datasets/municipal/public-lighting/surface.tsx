"use client";

import { useState } from "react";

import { useScopedI18n } from "@/locales/client";
import MatrixTable from "@/components/table/matrix";
import GroupedYear from "@/components/table/grouped-year";
import { FieldRequired } from "@/components/ui/field-help";
import Typography from "@/components/ui/typography";
import PriceAssumptionsTable from "../../../components/PriceAssumptionsTable";

import { useInventoryContext } from "../../../context/inventory-context";
import type { PublicLightingSurfaceCopy } from "../../../types";
import { buildPublicLightingRows, buildPublicLightingColumns } from "./config";

export default function PublicLightingSurface({ copy }: { copy: PublicLightingSurfaceCopy }) {
  const { mainForm } = useInventoryContext();
  const tFleet = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.publicLighting"
  );

  const [rows] = useState(() => ({
    infrastructure: buildPublicLightingRows("infrastructure", tFleet),
    lamps: buildPublicLightingRows("lamps", tFleet),
    yearly: buildPublicLightingRows("yearly", tFleet),
    lampsColumns: buildPublicLightingColumns("lamps", tFleet),
  }));

  return (
    <div className="space-y-8">
      <MatrixTable
        title={
          <Typography variant="sectionTitle" size="lg" className="inline-flex items-center gap-1">
            <span>{copy.yearlyTitle}</span>
            <FieldRequired content={tFleet("yearlyRequirementTooltip")} />
          </Typography>
        }
        rows={rows.yearly}
        form={mainForm}
        baseName={"municipal.publicLighting.dataSet.yearly"}
      />
      <PriceAssumptionsTable titleKey="electricity" priceKeys={["electricity"]} />
      <MatrixTable
        title={copy.infrastructureTitle}
        rows={rows.infrastructure}
        form={mainForm}
        baseName={"municipal.publicLighting.dataSet.infrastructure"}
      />
      <GroupedYear
        title={copy.lampsTitle}
        description={copy.lampsDescription}
        rows={rows.lamps}
        subcolumns={rows.lampsColumns}
        form={mainForm}
        baseName={"municipal.publicLighting.dataSet.lamps"}
      />
    </div>
  );
}
