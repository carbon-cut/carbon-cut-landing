import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockRedirect, mockRequireServerSession } = vi.hoisted(() => ({
  mockRedirect: vi.fn(),
  mockRequireServerSession: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

vi.mock("@/lib/auth/session", () => ({
  requireServerSession: mockRequireServerSession,
}));

describe("auth access helpers", () => {
  beforeEach(() => {
    vi.resetModules();
    mockRedirect.mockReset();
    mockRequireServerSession.mockReset();
  });

  it("redirects collectivity users away from household routes", async () => {
    mockRequireServerSession.mockResolvedValue({
      authenticated: true,
      user: {
        id: 4,
        username: "collectivity-user",
        email: "collectivity.ready@example.com",
        provider: "local",
        confirmed: true,
        blocked: false,
        productType: "collectivity",
        planId: ["grand-sfax"],
      },
    });

    const { requireHouseholdSession } = await import("@/lib/auth/access");
    await requireHouseholdSession("/form");

    expect(mockRedirect).toHaveBeenCalledWith("/collectivity/grand-sfax/cadrage");
  });

  it("redirects household users away from collectivity routes", async () => {
    mockRequireServerSession.mockResolvedValue({
      authenticated: true,
      user: {
        id: 1,
        username: "demo-user",
        email: "demo@example.com",
        provider: "local",
        confirmed: true,
        blocked: false,
        productType: "household",
      },
    });

    const { requireCollectivitySession } = await import("@/lib/auth/access");
    await requireCollectivitySession("/collectivity/start");

    expect(mockRedirect).toHaveBeenCalledWith("/form");
  });

  it("redirects collectivity users without a plan from plan routes to setup", async () => {
    mockRequireServerSession.mockResolvedValue({
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

    const { requireCollectivityPlanSession } = await import("@/lib/auth/access");
    await requireCollectivityPlanSession({
      requestedPlanId: "grand-sfax",
      requestedModule: "inventaire",
      returnTo: "/collectivity/grand-sfax/inventaire",
    });

    expect(mockRedirect).toHaveBeenCalledWith("/collectivity/setup/cadrage");
  });
});
