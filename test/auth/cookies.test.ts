import { describe, expect, it, vi } from "vitest";
import { clearSessionCookies, readAuthCookies, writeSessionCookies } from "@/lib/auth/cookies";
import type { AuthSessionResponse } from "@/lib/auth/types";

function createCookieStore() {
  const values = new Map<string, string>();
  const deleted: string[] = [];
  const set = vi.fn((name: string, value: string) => {
    values.set(name, value);
  });
  const get = vi.fn((name: string) => {
    const value = values.get(name);
    return value ? { value } : undefined;
  });
  const del = vi.fn((name: string) => {
    deleted.push(name);
    values.delete(name);
  });

  return {
    values,
    deleted,
    set,
    get,
    delete: del,
  };
}

const session: AuthSessionResponse = {
  access_token: "access-token",
  refresh_token: "refresh-token",
  user: {
    id: 1,
    username: "tester",
    email: "tester@example.com",
    provider: "local",
    confirmed: true,
    blocked: false,
  },
};

describe("auth cookies", () => {
  it("writes and reads the session cookies", () => {
    const cookieStore = createCookieStore();

    writeSessionCookies(cookieStore, session);

    const output = readAuthCookies(cookieStore);
    expect(output.accessToken).toBe("access-token");
    expect(output.refreshToken).toBe("refresh-token");
    expect(output.user?.email).toBe("tester@example.com");
  });

  it("clears all auth cookies", () => {
    const cookieStore = createCookieStore();

    writeSessionCookies(cookieStore, session);
    clearSessionCookies(cookieStore);

    expect(cookieStore.deleted).toEqual(["cc_access_token", "cc_refresh_token", "cc_auth_user"]);
  });
});
