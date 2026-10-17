// @vitest-environment jsdom
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const replace = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ replace }) }));
vi.mock("@/locales/client", () => ({ useScopedI18n: () => (key: string) => key }));

import RecoverCurrentPath from "@/app/[locale]/auth/_components/recover-current-path";

describe("server-rendered recovery bridge", () => {
  it("keeps the full nested URL when a backend 401 reaches the layout", async () => {
    replace.mockReset();
    window.history.replaceState(
      {},
      "",
      "/collectivity/projects/grand-sfax/inventory?year=2026#energy"
    );
    render(<RecoverCurrentPath />);

    await waitFor(() =>
      expect(replace).toHaveBeenCalledWith(
        "/auth/recover?returnTo=%2Fcollectivity%2Fprojects%2Fgrand-sfax%2Finventory%3Fyear%3D2026%23energy"
      )
    );
  });
});
