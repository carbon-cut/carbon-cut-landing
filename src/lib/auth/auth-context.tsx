"use client";

import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuthUser, SessionState } from "@/lib/auth/types";

const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthContextValue = {
  status: AuthStatus;
  user: AuthUser | null;
  refetchSession: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function readSession(): Promise<SessionState> {
  if (isStaticExport) {
    return {
      authenticated: false,
      user: null,
    };
  }

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
    if (isStaticExport) {
      startTransition(() => {
        setStatus("unauthenticated");
        setUser(null);
      });
      return;
    }

    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "same-origin",
    });

    startTransition(() => {
      setStatus("unauthenticated");
      setUser(null);
    });
  }, []);

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
