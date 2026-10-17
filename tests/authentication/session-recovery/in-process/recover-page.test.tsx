// @vitest-environment jsdom
import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import RecoverPage from "@/app/[locale]/auth/(compact)/recover/page";

vi.stubGlobal("React", React);

const mocks = vi.hoisted(() => ({
  replace: vi.fn(),
  refetchSession: vi.fn(),
  signOut: vi.fn(),
  recoverBrowserSession: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mocks.replace }),
  useSearchParams: () => new URLSearchParams("returnTo=%2Fcollectivity%2Fprojects%2Fstart"),
}));

vi.mock("@/lib/auth/browser-request", () => ({
  recoverBrowserSession: mocks.recoverBrowserSession,
}));

vi.mock("@/lib/auth/auth-context", () => ({
  useAuth: () => ({
    refetchSession: mocks.refetchSession,
    signOut: mocks.signOut,
  }),
}));

vi.mock("@/locales/client", () => ({
  useScopedI18n: () => (key: string) => key,
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props}>{children}</button>
  ),
}));

describe("session recovery page", () => {
  beforeEach(() => {
    mocks.replace.mockReset();
    mocks.refetchSession.mockReset().mockResolvedValue(undefined);
    mocks.signOut.mockReset().mockResolvedValue(true);
    mocks.recoverBrowserSession.mockReset();
  });

  it("refreshes the session and navigates back to the requested path", async () => {
    mocks.recoverBrowserSession.mockResolvedValue("recovered");

    render(<RecoverPage />);

    await waitFor(() => {
      expect(mocks.recoverBrowserSession).toHaveBeenCalledOnce();
      expect(mocks.refetchSession).toHaveBeenCalledOnce();
      expect(mocks.replace).toHaveBeenCalledWith("/collectivity/projects/start");
    });
    expect(mocks.signOut).not.toHaveBeenCalled();
  });

  it("ends the session and sends the user to sign-in when refresh is rejected", async () => {
    mocks.recoverBrowserSession.mockResolvedValue("expired");

    render(<RecoverPage />);

    await waitFor(() => {
      expect(mocks.signOut).toHaveBeenCalledOnce();
      expect(mocks.replace).toHaveBeenCalledWith(
        "/auth/sign-in?returnTo=%2Fcollectivity%2Fprojects%2Fstart&reason=expired"
      );
    });
    expect(mocks.refetchSession).not.toHaveBeenCalled();
  });

  it("explains that recovery is unavailable and offers a retry", async () => {
    mocks.recoverBrowserSession.mockResolvedValue("unavailable");

    render(<RecoverPage />);

    expect(await screen.findByText("error.unavailable")).toBeTruthy();
    expect(screen.getByRole("button", { name: "cta.retry" })).toBeTruthy();
    expect(mocks.replace).not.toHaveBeenCalled();
    expect(mocks.signOut).not.toHaveBeenCalled();
  });

  it("keeps showing the recovery state while the request is pending", async () => {
    let resolveRecovery!: (result: "recovered") => void;
    mocks.recoverBrowserSession.mockReturnValue(
      new Promise((resolve) => {
        resolveRecovery = resolve;
      })
    );

    render(<RecoverPage />);
    expect(screen.getByText("message.loading")).toBeTruthy();

    await act(async () => {
      resolveRecovery("recovered");
    });

    await waitFor(() => expect(mocks.replace).toHaveBeenCalledWith("/collectivity/projects/start"));
  });
});
