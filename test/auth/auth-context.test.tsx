// @vitest-environment jsdom
import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AuthProvider, useAuth } from "@/lib/auth/auth-context";

const fetchMock = vi.fn();

vi.stubGlobal("fetch", fetchMock);

function AuthProbe() {
  const { status, user, signOut } = useAuth();

  return (
    <div>
      <div data-testid="status">{status}</div>
      <div data-testid="email">{user?.email ?? ""}</div>
      <button type="button" onClick={() => void signOut()}>
        logout
      </button>
    </div>
  );
}

describe("AuthProvider signOut", () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it("keeps the user authenticated when logout does not return ok", async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          authenticated: true,
          user: {
            id: 7,
            username: "collectivity-super-user",
            email: "collectivity.super@example.com",
            provider: "local",
            confirmed: true,
            blocked: false,
            allowedProducts: ["household", "collectivity"],
            planId: ["grand-sfax"],
          },
        }),
      })
      .mockResolvedValueOnce({
        ok: false,
      });

    render(
      <AuthProvider>
        <AuthProbe />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("status").textContent).toBe("authenticated");
    });

    await act(async () => {
      screen.getByRole("button", { name: "logout" }).click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("status").textContent).toBe("authenticated");
      expect(screen.getByTestId("email").textContent).toBe("collectivity.super@example.com");
    });
  });
});
