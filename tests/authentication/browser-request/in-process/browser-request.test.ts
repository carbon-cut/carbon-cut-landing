// @vitest-environment jsdom
import "fake-indexeddb/auto";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchAuthenticated, SESSION_EXPIRED_EVENT } from "@/lib/auth/browser-request";

const fetchMock = vi.fn();
vi.stubGlobal("fetch", fetchMock);

function session(authenticated: boolean) {
  return Response.json(
    authenticated
      ? { authenticated, user: { email: "a@example.com" } }
      : {
          authenticated,
          user: null,
        }
  );
}

describe("authenticated browser requests", () => {
  beforeEach(() => fetchMock.mockReset());

  it("rotates once and retries once after a protected 401", async () => {
    fetchMock
      .mockResolvedValueOnce(new Response(null, { status: 401 }))
      .mockResolvedValueOnce(Response.json({ authenticated: true }))
      .mockResolvedValueOnce(Response.json({ data: 1 }));

    const result = await fetchAuthenticated("/api/collectivity/projects");
    expect(result.status).toBe(200);
    expect(fetchMock.mock.calls.map(([url]) => url)).toEqual([
      "/api/collectivity/projects",
      "/api/auth/refresh",
      "/api/collectivity/projects",
    ]);
  });

  it("ends the session after a repeated 401", async () => {
    const expired = vi.fn();
    window.addEventListener(SESSION_EXPIRED_EVENT, expired);
    fetchMock
      .mockResolvedValueOnce(new Response(null, { status: 401 }))
      .mockResolvedValueOnce(session(true))
      .mockResolvedValueOnce(new Response(null, { status: 401 }));

    expect((await fetchAuthenticated("/api/collectivity/projects")).status).toBe(401);
    expect(expired).toHaveBeenCalledOnce();
    window.removeEventListener(SESSION_EXPIRED_EVENT, expired);
  });

  it("does not refresh a 403 or backend outage", async () => {
    fetchMock
      .mockResolvedValueOnce(new Response(null, { status: 403 }))
      .mockResolvedValueOnce(new Response(null, { status: 503 }));
    expect((await fetchAuthenticated("/api/collectivity/projects")).status).toBe(403);
    expect((await fetchAuthenticated("/api/collectivity/projects")).status).toBe(503);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("ends the session when refresh is revoked and a competing refresh did not restore it", async () => {
    const expired = vi.fn();
    window.addEventListener(SESSION_EXPIRED_EVENT, expired);
    fetchMock
      .mockResolvedValueOnce(new Response(null, { status: 401 }))
      .mockResolvedValueOnce(new Response(null, { status: 401 }))
      .mockResolvedValueOnce(session(false));

    expect((await fetchAuthenticated("/api/collectivity/projects")).status).toBe(401);
    expect(expired).toHaveBeenCalledOnce();
    window.removeEventListener(SESSION_EXPIRED_EVENT, expired);
  });

  it("shares an in-flight refresh between concurrent requests in one tab", async () => {
    fetchMock.mockImplementation(async (url: string) => {
      if (url === "/api/auth/refresh") {
        await new Promise((resolve) => setTimeout(resolve, 10));
        return session(true);
      }
      const callCount = fetchMock.mock.calls.filter(([path]) => path === url).length;
      return callCount <= 2 ? new Response(null, { status: 401 }) : Response.json({ data: true });
    });

    const [first, second] = await Promise.all([
      fetchAuthenticated("/api/collectivity/projects"),
      fetchAuthenticated("/api/collectivity/projects"),
    ]);
    expect(first.ok && second.ok).toBe(true);
    expect(fetchMock.mock.calls.filter(([url]) => url === "/api/auth/refresh")).toHaveLength(1);
  });

  it("uses one rotation across tabs without Web Locks", async () => {
    vi.resetModules();
    const tabA = await import("@/lib/auth/browser-request");
    vi.resetModules();
    const tabB = await import("@/lib/auth/browser-request");
    fetchMock.mockImplementation(async (url: string) => {
      if (url === "/api/auth/refresh") {
        await new Promise((resolve) => setTimeout(resolve, 30));
        return session(true);
      }
      const calls = fetchMock.mock.calls.filter(([path]) => path === url).length;
      return calls <= 2 ? new Response(null, { status: 401 }) : Response.json({ data: true });
    });

    const [first, second] = await Promise.all([
      tabA.fetchAuthenticated("/api/collectivity/projects"),
      tabB.fetchAuthenticated("/api/collectivity/projects"),
    ]);

    expect(first.ok && second.ok).toBe(true);
    expect(fetchMock.mock.calls.filter(([url]) => url === "/api/auth/refresh")).toHaveLength(1);
  });
});
