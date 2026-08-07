"use client";

import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import InventoryDomainButton from "./InventoryDomainButton";
import type { InventoryFamily } from "../types";
import { useScopedI18n } from "@/locales/client";

export default function InventoryDomainNav({
  label,
  families,
  activeFamilyKey,
  onFamilyChange,
}: {
  label: string;
  families: InventoryFamily[];
  activeFamilyKey: InventoryFamily["key"];
  onFamilyChange: (familyKey: InventoryFamily["key"]) => void;
}) {
  const tFamily = useScopedI18n("(pages).collectivityDashboard.inventoryWorkspace.families");

  return (
    <div className="z-0 absolute top-0 w-full" aria-label={label}>
      {/*       <Typography asChild variant="sectionTitle" size="sm">
        <h2>{label}</h2>
      </Typography>
 */}
      <div className="mt-1 overflow-hidden">
        <div className="flex items-end h-[4.25rem] min-w-0">
          {families.map((family, index) => {
            const isActive = family.key === activeFamilyKey;

            return (
              <div
                key={family.key}
                className={cn(
                  "min-w-0 flex-1 h-[4.25rem]",
                  isActive ? "min-w-fit" : "basis-0",
                  index > 0 && !isActive && "border-l border-border/10"
                )}
              >
                <InventoryDomainButton
                  active={isActive}
                  hasError={family.hasError ?? false}
                  familyKey={family.key}
                  label={tFamily(`${family.key}.title`)}
                  onClick={() => onFamilyChange(family.key)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
