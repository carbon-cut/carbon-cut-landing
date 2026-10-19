// @vitest-environment jsdom
import "fake-indexeddb/auto";
import { describe, expect, it, vi } from "vitest";
import { coordinateRefresh } from "@/lib/auth/refresh-coordination";

describe("refresh lease fallback", () => {
  it("takes over an abandoned expired lease", async () => {
    const open = indexedDB.open("carbon-cut-auth", 1);
    const database = await new Promise<IDBDatabase>((resolve, reject) => {
      open.onupgradeneeded = () => open.result.createObjectStore("leases", { keyPath: "key" });
      open.onsuccess = () => resolve(open.result);
      open.onerror = () => reject(open.error);
    });
    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction("leases", "readwrite");
      transaction.objectStore("leases").put({
        key: "refresh",
        owner: "crashed-tab",
        expiresAt: Date.now() - 1,
        generation: 0,
        completedAt: 0,
        status: 0,
      });
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
    database.close();

    const refresh = vi.fn(async () => Response.json({ authenticated: true }));
    expect((await coordinateRefresh(refresh)).ok).toBe(true);
    expect(refresh).toHaveBeenCalledOnce();
  });

  it("keeps the session available for retry when no cross-tab lock can be acquired", async () => {
    const existing = indexedDB;
    vi.stubGlobal("indexedDB", undefined);
    const refresh = vi.fn(async () => Response.json({ authenticated: true }));
    try {
      expect((await coordinateRefresh(refresh)).status).toBe(503);
      expect(refresh).not.toHaveBeenCalled();
    } finally {
      vi.stubGlobal("indexedDB", existing);
    }
  });
});
