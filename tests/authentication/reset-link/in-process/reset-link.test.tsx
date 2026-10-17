// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { postAuth, replace, refetchSession } = vi.hoisted(() => ({
  postAuth: vi.fn(),
  replace: vi.fn(),
  refetchSession: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
  useSearchParams: () => new URLSearchParams(window.location.search),
}));
vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));
vi.mock("@/app/[locale]/auth/_components/auth-brand", () => ({ default: () => null }));
vi.mock("@/app/[locale]/auth/_components/auth-api", () => ({
  postAuth,
  getErrorCode: () => null,
  isUpstreamAuthError: () => false,
}));
vi.mock("@/lib/auth/auth-context", () => ({ useAuth: () => ({ refetchSession }) }));
vi.mock("@/locales/client", () => ({ useScopedI18n: () => (key: string) => key }));

import { ResetPasswordPageContent } from "@/app/[locale]/auth/_components/reset-password-content";

describe("reset link", () => {
  beforeEach(() => {
    postAuth.mockReset();
    replace.mockReset();
    refetchSession.mockReset();
    window.history.replaceState(
      {},
      "",
      "/auth/reset-password?code=random-secret&returnTo=%2Fcollectivity%2Fprojects"
    );
  });

  it("removes the token from history and submits it in the code field", async () => {
    postAuth.mockResolvedValue({ ok: true, data: { authenticated: true } });
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ResetPasswordPageContent />
      </QueryClientProvider>
    );

    expect(window.location.search).not.toContain("random-secret");
    expect(screen.queryByLabelText("form.code")).toBeNull();
    fireEvent.change(screen.getByLabelText("form.password"), { target: { value: "Password123!" } });
    fireEvent.change(screen.getByLabelText("form.passwordConfirm"), {
      target: { value: "Password123!" },
    });
    fireEvent.click(screen.getByRole("button", { name: "form.submit" }));

    await waitFor(() =>
      expect(postAuth).toHaveBeenCalledWith("/api/auth/reset-password", {
        code: "random-secret",
        password: "Password123!",
        passwordConfirmation: "Password123!",
      })
    );
    await waitFor(() => expect(replace).toHaveBeenCalledWith("/collectivity/projects"));
  });
});
