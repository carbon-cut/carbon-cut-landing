import { describe, expect, it } from "vitest";

import {
  quoteInformationSchema,
  type QuoteInformationInput,
} from "@/app/[locale]/collectivity/pricing/_lib/infoSchema";

function makeValidInput(overrides: Partial<QuoteInformationInput> = {}): QuoteInformationInput {
  return {
    customerType: "LEGAL_ENTITY",
    customer: {
      legalName: "Communauté de communes du Val de Loire",
      addressLine1: "12 rue de la Mairie",
      addressLine2: "",
      postalCode: "45000",
      city: "Orléans",
      countryCode: " fra ",
      siren: "732 829 320",
      siret: "",
      vatNumber: "",
    },
    contact: {
      name: "Marie Dupont",
      email: " marie.dupont@example.com ",
      phone: "",
    },
    quoteTerms: {
      contractStartDate: "2026-09-27",
    },
    ...overrides,
  };
}

describe("quote information schema", () => {
  it("normalizes customer data and parses the requested start date", () => {
    const result = quoteInformationSchema.safeParse(makeValidInput());

    expect(result.success).toBe(true);
    if (!result.success) return;

    expect(result.data.customer.countryCode).toBe("FRA");
    expect(result.data.customer.siren).toBe("732829320");
    expect(result.data.customer.addressLine2).toBeUndefined();
    expect(result.data.contact.email).toBe("marie.dupont@example.com");
    expect(result.data.contact.phone).toBeUndefined();
    expect(result.data.quoteTerms.contractStartDate).toEqual(new Date("2026-09-27T00:00:00.000Z"));
  });

  it("rejects an invalid calendar date", () => {
    const result = quoteInformationSchema.safeParse(
      makeValidInput({ quoteTerms: { contractStartDate: "2026-02-29" } })
    );

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Invalid");
  });

  it("requires a French SIREN or SIRET", () => {
    const result = quoteInformationSchema.safeParse(
      makeValidInput({
        customer: {
          ...makeValidInput().customer,
          siren: "",
          siret: "",
        },
      })
    );

    expect(result.success).toBe(false);
    expect(result.error?.issues).toContainEqual(
      expect.objectContaining({ path: ["customer", "siren"], message: "Required" })
    );
  });

  it("permits a buyer outside France without a French registration number", () => {
    const result = quoteInformationSchema.safeParse(
      makeValidInput({
        customer: {
          ...makeValidInput().customer,
          countryCode: "BEL",
          siren: "",
          siret: "",
        },
      })
    );

    expect(result.success).toBe(true);
  });

  it("rejects a French registration number with an invalid checksum", () => {
    const result = quoteInformationSchema.safeParse(
      makeValidInput({
        customer: {
          ...makeValidInput().customer,
          siren: "123 456 789",
        },
      })
    );

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Invalid");
  });
});
