"use client";

import React, {
  type ReactNode,
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SESSION_EXPIRED_EVENT } from "@/lib/auth/browser-request";
import { sanitizeReturnTo } from "@/lib/auth/redirect";
import { getAuthSignInRoute } from "@/lib/routing/routes";
import type { AuthUser, SessionState } from "@/lib/auth/types";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthContextValue = {
  status: AuthStatus;
  user: AuthUser | null;
  refetchSession: () => Promise<void>;
  signOut: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function readSession(): Promise<SessionState> {
  const response = await fetch("/api/auth/session", {
    credentials: "same-origin",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to read session");
  }

  return (await response.json()) as SessionState;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const endingSession = useRef(false);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<AuthUser | null>(null);

  const applySession = useCallback((session: SessionState) => {
    startTransition(() => {
      if (session.authenticated) {
        setStatus("authenticated");
        setUser(session.user);
        return;
      }

      setStatus("unauthenticated");
      setUser(null);
    });
  }, []);

  const refetchSession = useCallback(async () => {
    try {
      const session = await readSession();
      applySession(session);
    } catch {
      startTransition(() => {
        setStatus("unauthenticated");
        setUser(null);
      });
    }
  }, [applySession]);

  const signOut = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
      });
    } catch {
      // Cookie cleanup is attempted locally; browser state is still cleared.
    } finally {
      queryClient.clear();
      localStorage.setItem("carbon-cut-auth-logout", String(Date.now()));
      startTransition(() => {
        setStatus("unauthenticated");
        setUser(null);
      });
    }
    return true;
  }, [queryClient]);

  useEffect(() => {
    const onExpired = async () => {
      if (endingSession.current) return;
      endingSession.current = true;
      const returnTo = sanitizeReturnTo(window.location.pathname + window.location.search);
      try {
        await signOut();
      } catch {
        queryClient.clear();
      }
      const destination = new URL(getAuthSignInRoute(returnTo), window.location.origin);
      destination.searchParams.set("reason", "expired");
      router.replace(destination.pathname + destination.search);
      endingSession.current = false;
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === "carbon-cut-auth-logout") {
        queryClient.clear();
        startTransition(() => {
          setStatus("unauthenticated");
          setUser(null);
        });
        router.replace(
          getAuthSignInRoute(sanitizeReturnTo(window.location.pathname + window.location.search))
        );
      }
    };
    window.addEventListener(SESSION_EXPIRED_EVENT, onExpired);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(SESSION_EXPIRED_EVENT, onExpired);
      window.removeEventListener("storage", onStorage);
    };
  }, [queryClient, router, signOut]);

  useEffect(() => {
    void refetchSession();
  }, [refetchSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user,
      refetchSession,
      signOut,
    }),
    [refetchSession, signOut, status, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
