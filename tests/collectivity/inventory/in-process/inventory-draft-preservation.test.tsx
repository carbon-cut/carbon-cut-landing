// @vitest-environment jsdom

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { buildInventoryDefaultValues } from "@/app/[locale]/collectivity/projects/[planId]/ghg-inventory/inventoryDefaultValues";
import { buildInventoryDraftInput } from "@/app/[locale]/collectivity/projects/[planId]/ghg-inventory/inventoryDraft";
import { buildInventoryRegistry } from "@/app/[locale]/collectivity/projects/[planId]/ghg-inventory/registry";
import { useInventoryForm } from "@/app/[locale]/collectivity/projects/[planId]/ghg-inventory/useInventoryForm";

vi.stubGlobal("React", React);

const savedTerritorialActivity = {
  transport: {
    territoryVehicles: {
      dataSet: {
        rows: [{ vehicleType: "privateVehicles", fuel: "petrol" }],
      },
    },
  },
};

function getMunicipalAssetsDefaults() {
  const { workspace } = buildInventoryRegistry(null, "patrimoine_communal");

  return {
    ...buildInventoryDefaultValues(savedTerritorialActivity, [2024], workspace),
    years: { reference: 2024, comparisons: [] },
  };
}

function InventoryDraftHarness({
  showTerritorialField,
  onSave,
}: {
  showTerritorialField: boolean;
  onSave: (draft: ReturnType<typeof buildInventoryDraftInput>) => void;
}) {
  const form = useInventoryForm(getMunicipalAssetsDefaults(), {
    perimeter: "patrimoine_communal",
    applicability: null,
  });

  return (
    <form>
      {showTerritorialField ? (
        <input
          aria-label="Territorial vehicle type"
          {...form.register("transport.territoryVehicles.dataSet.rows.0.vehicleType")}
        />
      ) : null}
      <button type="button" onClick={() => onSave(buildInventoryDraftInput(form.getValues()))}>
        Save draft
      </button>
    </form>
  );
}

describe("inventory draft preservation for hidden territorial activity", () => {
  it("loads and saves saved territorial activity while its field is hidden", () => {
    const onSave = vi.fn();
    render(<InventoryDraftHarness showTerritorialField={false} onSave={onSave} />);

    fireEvent.click(screen.getByRole("button", { name: "Save draft" }));

    const savedDraft = onSave.mock.calls[0]?.[0];
    expect(savedDraft?.transport.territoryVehicles.dataSet.rows[0]?.vehicleType).toBe(
      "privateVehicles"
    );
    expect(savedDraft).not.toHaveProperty("years");
  });

  it("retains current territorial activity after its field is unmounted", () => {
    const onSave = vi.fn();
    const { rerender } = render(<InventoryDraftHarness showTerritorialField onSave={onSave} />);

    fireEvent.change(screen.getByRole("textbox", { name: "Territorial vehicle type" }), {
      target: { value: "mixedCars" },
    });
    rerender(<InventoryDraftHarness showTerritorialField={false} onSave={onSave} />);
    fireEvent.click(screen.getByRole("button", { name: "Save draft" }));

    const savedDraft = onSave.mock.calls[0]?.[0];
    expect(savedDraft?.transport.territoryVehicles.dataSet.rows[0]?.vehicleType).toBe("mixedCars");
  });
});
