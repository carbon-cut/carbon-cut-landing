"use client";

import { useState } from "react";

import { useScopedI18n } from "@/locales/client";
import MatrixTable from "@/components/table/matrix";
import GroupedYear from "@/components/table/grouped-year";

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
        title={copy.infrastructureTitle}
        rows={rows.infrastructure}
        form={mainForm}
        baseName={"municipal.publicLighting.dataSet.infrastructure"}
      />
      {/* <TableGrid
        title={copy.lampsTitle}
        description={copy.lampsDescription}
        rows={rows.lamps}
        columns={rows.lampsColumns}
        form={mainForm}
        baseName={"municipal.publicLighting.dataSet.lamps"}
      /> */}
      <GroupedYear
        title={copy.lampsTitle}
        description={copy.lampsDescription}
        rows={rows.lamps}
        subcolumns={rows.lampsColumns}
        form={mainForm}
        baseName={"municipal.publicLighting.dataSet.lamps"}
      />
      <MatrixTable
        title={copy.yearlyTitle}
        rows={rows.yearly}
        form={mainForm}
        baseName={"municipal.publicLighting.dataSet.yearly"}
      />
    </div>
  );
}
