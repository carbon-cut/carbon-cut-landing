// @vitest-environment jsdom
import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider, useAuth } from "@/lib/auth/auth-context";

const fetchMock = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ replace: vi.fn() }) }));

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

  it("clears local auth and private query data even when revocation fails", async () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData(["collectivity", "private"], { secret: true });
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
            planId: ["grand-sfax"],
          },
        }),
      })
      .mockResolvedValueOnce({
        ok: false,
      });

    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AuthProbe />
        </AuthProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("status").textContent).toBe("authenticated");
    });

    await act(async () => {
      screen.getByRole("button", { name: "logout" }).click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("status").textContent).toBe("unauthenticated");
      expect(screen.getByTestId("email").textContent).toBe("");
    });
    expect(queryClient.getQueryData(["collectivity", "private"])).toBeUndefined();
  });

  it("clears auth and private query data when another tab signs out", async () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData(["collectivity", "private"], { secret: true });
    fetchMock.mockResolvedValueOnce({
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
          planId: ["grand-sfax"],
        },
      }),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AuthProbe />
        </AuthProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("status").textContent).toBe("authenticated");
    });

    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "carbon-cut-auth-logout",
          newValue: String(Date.now()),
        })
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("status").textContent).toBe("unauthenticated");
      expect(screen.getByTestId("email").textContent).toBe("");
    });
    expect(queryClient.getQueryData(["collectivity", "private"])).toBeUndefined();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
