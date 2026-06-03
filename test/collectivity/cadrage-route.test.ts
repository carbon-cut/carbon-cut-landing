import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockGetServerSession } = vi.hoisted(() => ({
  mockGetServerSession: vi.fn(),
}));

vi.mock("@/lib/auth/session", () => ({
  getServerSession: mockGetServerSession,
}));

describe("collectivity cadrage route", () => {
  beforeEach(() => {
    vi.resetModules();
    mockGetServerSession.mockReset();
    mockGetServerSession.mockResolvedValue({
      authenticated: true,
      user: {
        id: 5,
        username: "collectivity-no-inventory-user",
        email: "collectivity.no-inventory@example.com",
        provider: "local",
        confirmed: true,
        blocked: false,
        productType: "collectivity",
      },
    });
  });

  it("returns a field error when the plan id is already taken", async () => {
    const { POST } = await import("@/app/api/collectivity/cadrage/route");
    const response = await POST(
      new Request("http://localhost/api/collectivity/cadrage", {
        method: "POST",
        body: JSON.stringify({
          country: "tunisia",
          planId: "grand-sfax",
          territoryName: "Sfax",
          referenceYear: "2023",
          supportYears: ["2022"],
        }),
      })
    );

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({
      error: {
        status: 409,
        message: "collectivityPlanIdNotUnique",
        details: {
          fieldErrors: {
            planId: "collectivityPlanIdNotUnique",
          },
        },
      },
    });
  });
});
