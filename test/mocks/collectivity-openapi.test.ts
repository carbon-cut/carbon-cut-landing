import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { setupServer } from "msw/node";

import { mockSignIn } from "@/mocks/auth";
import { collectivityHandlers } from "@/mocks/handlers/collectivity";

const server = setupServer(...collectivityHandlers);

describe("collectivity project mock contract", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("returns the compact project shape after saving an inventory draft", async () => {
    const session = mockSignIn({
      identifier: "collectivity.ready@example.com",
      password: "123",
    });
    const response = await fetch(
      "http://localhost:1337/api/collectivity/projects/grand-sfax-inventory/current-inventory/input",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inventoryInput: { municipalElectricityConsumptionKwh: 42000 } }),
      }
    );

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(Object.keys(body.data.project).sort()).toEqual([
      "currentInventoryId",
      "id",
      "slug",
      "updatedAt",
    ]);
    expect(body.data.currentInventory.inventoryInput).toEqual({
      municipalElectricityConsumptionKwh: 42000,
    });
  });
});
