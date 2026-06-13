"use client";

import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import InventoryDomainButton from "./InventoryDomainButton";
import type { InventoryFamily } from "../types";

export default function InventoryDomainNav({
  label,
  families,
  activeFamilyKey,
  onFamilyChange,
}: {
  label: string;
  families: InventoryFamily[];
  activeFamilyKey: string;
  onFamilyChange: (familyKey: string) => void;
}) {
  return (
    <div className="z-0 absolute top-0 w-full" aria-label={label}>
      {/*       <Typography asChild variant="sectionTitle" size="sm">
        <h2>{label}</h2>
      </Typography>
 */}
      <div className="mt-3 overflow-x-auto">
        <div className="flex min-w-max items-end h-16">
          {families.map((family, index) => {
            const isActive = family.key === activeFamilyKey;

            return (
              <div
                key={family.key}
                className={cn(index > 0 && !isActive && "border-l border-border/10", "w-full")}
              >
                <InventoryDomainButton
                  active={isActive}
                  iconKey={family.navIcon ?? "municipal"}
                  label={family.title}
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
