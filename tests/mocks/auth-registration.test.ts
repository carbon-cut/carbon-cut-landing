import { describe, expect, it } from "vitest";
import { MockAuthError, mockSignUp } from "@/mocks/auth";
import type { SignUpRequest } from "@/lib/auth/types";

const validRequest: SignUpRequest = {
  firstName: "Test",
  lastName: "User",
  email: "omitted-name@example.com",
  password: "Password123!",
};

describe("mock registration validation", () => {
  it.each(["firstName", "lastName"] as const)(
    "returns the validation error when %s is omitted",
    (name) => {
      const request: Partial<SignUpRequest> = { ...validRequest };
      delete request[name];

      let error: unknown;
      try {
        mockSignUp(request as SignUpRequest);
      } catch (caught) {
        error = caught;
      }

      expect(error).toBeInstanceOf(MockAuthError);
      expect(error).toMatchObject({
        status: 400,
        body: {
          data: null,
          error: {
            status: 400,
            name: "ValidationError",
            message: "Invalid registration data",
            details: {},
          },
        },
      });
    }
  );
});
