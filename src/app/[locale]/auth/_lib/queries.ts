import { mutationOptions } from "@tanstack/react-query";
import { postAuth } from "@/app/[locale]/auth/_components/auth-api";
import type { ApiResult } from "@/app/[locale]/auth/_components/auth-api";
import { isAuthUser, isRegistrationPendingResponse } from "@/lib/auth/types";
import type {
  AuthErrorPayload,
  RegistrationPendingResponse,
  SessionState,
  SignUpRequest,
} from "@/lib/auth/types";

type ImmediateRegistrationResponse = Extract<SessionState, { authenticated: true }>;

function isImmediateRegistrationResponse(value: unknown): value is ImmediateRegistrationResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "authenticated" in value &&
    value.authenticated === true &&
    "user" in value &&
    isAuthUser(value.user)
  );
}

export async function postRegistration(
  body: SignUpRequest
): Promise<ApiResult<RegistrationPendingResponse | ImmediateRegistrationResponse>> {
  const result = await postAuth<unknown>("/api/auth/sign-up", body);
  if (!result.ok) return result;

  if (isRegistrationPendingResponse(result.data) || isImmediateRegistrationResponse(result.data)) {
    return { ok: true, data: result.data };
  }

  const error: AuthErrorPayload = {
    error: {
      status: 502,
      message: "Authentication service returned an invalid registration response",
      details: { code: "AUTH_UPSTREAM_INVALID_RESPONSE" },
    },
  };

  return { ok: false, status: 502, error };
}

export const registrationMutationOptions = () =>
  mutationOptions({
    mutationKey: ["auth", "registration"],
    mutationFn: postRegistration,
  });
