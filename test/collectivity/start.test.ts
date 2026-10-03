import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockRedirect, mockRequireCollectivitySession } = vi.hoisted(() => ({
  mockRedirect: vi.fn(),
  mockRequireCollectivitySession: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

vi.mock("@/lib/auth/access", () => ({
  getPrimaryPlanId: (user: { planId?: string[] }) => user.planId?.[0] ?? null,
  requireCollectivitySession: mockRequireCollectivitySession,
}));

describe("collectivity start route", () => {
  beforeEach(() => {
    vi.resetModules();
    mockRedirect.mockReset();
    mockRequireCollectivitySession.mockReset();
    mockRequireCollectivitySession.mockResolvedValue({
      authenticated: true,
      user: {
        id: 4,
        username: "collectivity-user",
        email: "collectivity-user@example.com",
        provider: "local",
        confirmed: true,
        blocked: false,
      },
    });
  });

  it("sends collectivity users with a plan to the workspace setup route", async () => {
    mockRequireCollectivitySession.mockResolvedValue({
      authenticated: true,
      user: {
        id: 4,
        username: "collectivity-user",
        email: "collectivity-user@example.com",
        provider: "local",
        confirmed: true,
        blocked: false,
        planId: ["grand-sfax"],
      },
    });

    const page = (await import("@/app/collectivity/projects/start/page")).default;
    await page();

    expect(mockRequireCollectivitySession).toHaveBeenCalledWith("/collectivity/projects/start");
    expect(mockRedirect).toHaveBeenCalledWith("/collectivity/grand-sfax/setup");
  });

  it("sends collectivity users without a plan to the setup route", async () => {
    const page = (await import("@/app/collectivity/projects/start/page")).default;
    await page();

    expect(mockRedirect).toHaveBeenCalledWith("/collectivity/setup");
  });
});
