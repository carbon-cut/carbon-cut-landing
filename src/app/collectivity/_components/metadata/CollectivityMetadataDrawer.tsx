"use client";

import { useEffect, useRef } from "react";

import type { FieldValues, UseFormReturn } from "react-hook-form";
import { TName } from "@/components/ui/forms";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InventoryFieldFiles, InventoryFieldInput } from "@/app/collectivity/_components/fields";
import {
  metadataConfidenceValues,
  metadataQualityStatusValues,
  metadataSourceTypeValues,
} from "@/app/collectivity/_inventaire/InventorySchema/_shared";

import { EMPTY_METADATA_VALUE, cloneCollectivityMetadataValue } from "./utils";
import type { CollectivityMetadataDrawerLabels, CollectivityMetadataValue } from "./types";
import { InventoryFieldSelect } from "../fields/InventoryFieldSelect";
import { InventoryFieldTextarea } from "../fields/InventoryFieldTextArea";

const sourceTypeLabels: Record<(typeof metadataSourceTypeValues)[number], string> = {
  invoice: "Facture",
  report: "Rapport",
  excel: "Excel",
  manual: "Saisie manuelle",
  estimate: "Estimation",
};

const qualityStatusLabels: Record<(typeof metadataQualityStatusValues)[number], string> = {
  missing: "Manquante",
  provided: "Fournie",
  estimated: "Estimée",
  verified: "Vérifiée",
};

const confidenceLabels: Record<(typeof metadataConfidenceValues)[number], string> = {
  low: "Faible",
  medium: "Moyenne",
  high: "Élevée",
};

const sourceTypeOptions = metadataSourceTypeValues.map((value) => ({
  value,
  label: sourceTypeLabels[value],
}));

const qualityStatusOptions = metadataQualityStatusValues.map((value) => ({
  value,
  label: qualityStatusLabels[value],
}));

const confidenceOptions = metadataConfidenceValues.map((value) => ({
  value,
  label: confidenceLabels[value],
}));

function getFieldName<TFieldValues extends FieldValues>(name: TName<TFieldValues>, path: string) {
  return `${name}.${path}` as TName<TFieldValues>;
}

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-1">
      <h4 className="text-sm font-medium text-foreground">{title}</h4>
      <p className="text-xs text-secondary">{description}</p>
    </div>
  );
}

type Props<TFieldValues extends FieldValues> = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  form: UseFormReturn<TFieldValues, undefined>;
  name: TName<TFieldValues>;
  labels: CollectivityMetadataDrawerLabels;
};

export default function CollectivityMetadataDrawer<TFieldValues extends FieldValues>({
  open,
  onOpenChange,
  title,
  description,
  form,
  name,
  labels,
}: Props<TFieldValues>) {
  const snapshotRef = useRef<CollectivityMetadataValue | null>(null);
  const commitRef = useRef(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    snapshotRef.current =
      cloneCollectivityMetadataValue(form.getValues(name) as CollectivityMetadataValue | null) ??
      EMPTY_METADATA_VALUE;
    commitRef.current = false;
  }, [form, name, open]);

  const fieldName = (path: string) => getFieldName(name, path);

  const restoreSnapshot = () => {
    form.setValue(name as any, (snapshotRef.current ?? EMPTY_METADATA_VALUE) as any, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && !commitRef.current) {
      restoreSnapshot();
    }

    onOpenChange(nextOpen);
  };

  const handleSave = () => {
    commitRef.current = true;
    onOpenChange(false);
  };

  const handleClear = () => {
    commitRef.current = true;
    form.setValue(name as any, EMPTY_METADATA_VALUE as any, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent className="px-0">
        <div className="mx-auto flex max-h-full w-full max-w-3xl flex-col">
          <DrawerHeader className="px-4 pb-4 pt-5">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>

          <div className="max-h-[80vh] overflow-hidden pl-4">
            <ScrollArea className="h-[50vh]">
              <div className="mx-1 space-y-6 pr-4">
                <section className="space-y-4">
                  <SectionHeading
                    title={labels.provenanceTitle}
                    description="Renseignez la source qui soutient ce jeu de données."
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <InventoryFieldInput
                      form={form}
                      name={fieldName("source.organization")}
                      label="Organisation"
                      placeholder="Ex. STEG"
                    />
                    <InventoryFieldInput
                      form={form}
                      name={fieldName("source.documentName")}
                      label="Document"
                      placeholder="Ex. Export électricité 2024"
                    />
                    <InventoryFieldInput
                      form={form}
                      name={fieldName("source.contactPerson")}
                      label="Contact"
                      placeholder="Ex. cellule énergie"
                    />
                    <InventoryFieldInput
                      form={form}
                      name={fieldName("source.collectionDate")}
                      label="Date de collecte"
                      type="date"
                    />
                    <InventoryFieldSelect
                      form={form}
                      name={fieldName("source.sourceType")}
                      label="Type de source"
                      placeholder="Choisir un type de source"
                      options={sourceTypeOptions}
                    />
                    <InventoryFieldFiles
                      form={form}
                      name={fieldName("source.documents")}
                      label="Documents"
                      description="Ajoutez les fichiers joints qui soutiennent cette source."
                    />
                  </div>
                </section>

                <section className="space-y-4">
                  <SectionHeading
                    title={labels.qualityTitle}
                    description="Indiquez le niveau de fiabilité attaché à cette collecte."
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <InventoryFieldSelect
                      form={form}
                      name={fieldName("quality.status")}
                      label="Statut"
                      placeholder="Choisir un statut"
                      options={qualityStatusOptions}
                    />
                    <InventoryFieldSelect
                      form={form}
                      name={fieldName("quality.confidence")}
                      label="Confiance"
                      placeholder="Choisir une confiance"
                      options={confidenceOptions}
                    />
                    <InventoryFieldTextarea
                      form={form}
                      name={fieldName("quality.comment")}
                      label="Commentaire"
                      placeholder="Ajouter un commentaire sur la qualité ou les limites de la source."
                    />
                  </div>
                </section>
              </div>
            </ScrollArea>
          </div>

          <DrawerFooter className="border-t border-border/10 px-4 py-4 sm:flex-row sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={handleSave}>
                {labels.saveLabel}
              </Button>
              <DrawerClose asChild>
                <Button type="button" variant="outline">
                  {labels.cancelLabel}
                </Button>
              </DrawerClose>
            </div>

            <Button
              type="button"
              variant="destructive"
              onClick={handleClear}
              className="sm:ml-auto"
            >
              {labels.clearLabel}
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
