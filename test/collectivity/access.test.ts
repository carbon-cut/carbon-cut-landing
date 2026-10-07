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

  it("allows authenticated users to access household routes", async () => {
    mockRequireServerSession.mockResolvedValue({
      authenticated: true,
      user: {
        id: 4,
        username: "collectivity-user",
        email: "collectivity.ready@example.com",
        provider: "local",
        confirmed: true,
        blocked: false,
        planId: ["grand-sfax"],
      },
    });

    const { requireHouseholdSession } = await import("@/lib/auth/access");
    const session = await requireHouseholdSession("/form");

    expect(session.user.email).toBe("collectivity.ready@example.com");
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it("allows authenticated users to access collectivity entry routes", async () => {
    mockRequireServerSession.mockResolvedValue({
      authenticated: true,
      user: {
        id: 1,
        username: "demo-user",
        email: "demo@example.com",
        provider: "local",
        confirmed: true,
        blocked: false,
      },
    });

    const { requireCollectivitySession } = await import("@/lib/auth/access");
    const session = await requireCollectivitySession("/collectivity/projects/start");

    expect(session.user.email).toBe("demo@example.com");
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it("defers project authorization to the backend when cached plan IDs are absent", async () => {
    mockRequireServerSession.mockResolvedValue({
      authenticated: true,
      user: {
        id: 5,
        username: "collectivity-no-inventory-user",
        email: "collectivity.no-inventory@example.com",
        provider: "local",
        confirmed: true,
        blocked: false,
      },
    });

    const { requireCollectivityPlanSession } = await import("@/lib/auth/access");
    await requireCollectivityPlanSession({
      requestedPlanId: "grand-sfax",
      requestedModule: "inventory",
      returnTo: "/collectivity/grand-sfax/inventory",
    });

    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it("defers a mismatched cached project slug to the backend", async () => {
    mockRequireServerSession.mockResolvedValue({
      authenticated: true,
      user: {
        id: 4,
        username: "collectivity-user",
        email: "collectivity.ready@example.com",
        provider: "local",
        confirmed: true,
        blocked: false,
        planId: ["grand-sfax"],
      },
    });

    const { requireCollectivityPlanSession } = await import("@/lib/auth/access");
    await requireCollectivityPlanSession({
      requestedPlanId: "wrong-slug",
      requestedModule: "inventory",
      returnTo: "/collectivity/wrong-slug/inventory",
    });

    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it("allows an authenticated user to access both household and collectivity routes", async () => {
    mockRequireServerSession.mockResolvedValue({
      authenticated: true,
      user: {
        id: 7,
        username: "collectivity-super-user",
        email: "collectivity.super@example.com",
        provider: "local",
        confirmed: true,
        blocked: false,
        planId: ["grand-sfax"],
      },
    });

    const { requireHouseholdSession, requireCollectivitySession, getCollectivityDefaultRoute } =
      await import("@/lib/auth/access");

    const householdSession = await requireHouseholdSession("/form");
    const collectivitySession = await requireCollectivitySession("/collectivity/projects/start");

    expect(householdSession.user.email).toBe("collectivity.super@example.com");
    expect(collectivitySession.user.email).toBe("collectivity.super@example.com");
    expect(getCollectivityDefaultRoute(collectivitySession.user)).toBe(
      "/collectivity/projects/grand-sfax/setup"
    );
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it("sends authenticated users with a project to its setup page", async () => {
    mockRequireServerSession.mockResolvedValue({
      authenticated: true,
      user: {
        id: 4,
        username: "collectivity-user",
        email: "collectivity.ready@example.com",
        provider: "local",
        confirmed: true,
        blocked: false,
        planId: ["grand-sfax"],
      },
    });

    const { getAuthenticatedUserHomeRoute } = await import("@/lib/auth/access");

    expect(getAuthenticatedUserHomeRoute({})).toBe("/");
    expect(getAuthenticatedUserHomeRoute({})).toBe("/");
    expect(getAuthenticatedUserHomeRoute({ planId: ["grand-sfax"] })).toBe(
      "/collectivity/projects/grand-sfax/setup"
    );
  });
});
