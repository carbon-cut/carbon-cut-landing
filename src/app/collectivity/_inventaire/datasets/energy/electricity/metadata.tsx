"use client";

import { useForm } from "react-hook-form";

import CollectivityMetadataScopeControl from "@/app/collectivity/_components/metadata/CollectivityMetadataScopeControl";
import type { CollectivityMetadataValue } from "@/app/collectivity/_components/metadata";
import { Form } from "@/components/ui/forms";
import InventoryYearBlockTables from "@/components/table/year-block";
import type { InventoryYearBlockTableBlock } from "../../../types";

type ElectricityMetadataDemoForm = {
  metadata: CollectivityMetadataValue;
};

export default function ElectricityMetadataPilot({
  blocks,
  description,
  getValue,
}: {
  blocks: InventoryYearBlockTableBlock[];
  description?: string;
  getValue: (blockKey: string, rowKey: string, columnKey: string, yearValue: number) => string;
}) {
  const demoForm = useForm<ElectricityMetadataDemoForm>({
    defaultValues: {
      metadata: {
        source: {},
        quality: {},
      },
    },
  });

  return (
    <section className="space-y-4">
      <Form {...demoForm}>
        <CollectivityMetadataScopeControl
          form={demoForm}
          name="metadata"
          drawerTitle="Demande d'électricité"
          drawerDescription="Renseignez la provenance et la qualité pour la demande d'électricité."
        />
      </Form>

      <InventoryYearBlockTables
        title="Demande d'électricité"
        description={
          description ?? "Chaque année garde sa propre lecture, avec un bloc par niveau de tension."
        }
        blocks={blocks}
        getValue={getValue}
      />
    </section>
  );
}
