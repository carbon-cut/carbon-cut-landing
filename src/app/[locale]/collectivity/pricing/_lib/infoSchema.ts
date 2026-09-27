import { z } from "zod";
import { isEuMemberCountry } from "./countryRules";

const ISO_3166_1_ALPHA_3_CODES = new Set([
  "ABW",
  "AFG",
  "AGO",
  "AIA",
  "ALA",
  "ALB",
  "AND",
  "ARE",
  "ARG",
  "ARM",
  "ASM",
  "ATA",
  "ATF",
  "ATG",
  "AUS",
  "AUT",
  "AZE",
  "BDI",
  "BEL",
  "BEN",
  "BES",
  "BFA",
  "BGD",
  "BGR",
  "BHR",
  "BHS",
  "BIH",
  "BLM",
  "BLR",
  "BLZ",
  "BMU",
  "BOL",
  "BRA",
  "BRB",
  "BRN",
  "BTN",
  "BVT",
  "BWA",
  "CAF",
  "CAN",
  "CCK",
  "CHE",
  "CHL",
  "CHN",
  "CIV",
  "CMR",
  "COD",
  "COG",
  "COK",
  "COL",
  "COM",
  "CPV",
  "CRI",
  "CUB",
  "CUW",
  "CXR",
  "CYM",
  "CYP",
  "CZE",
  "DEU",
  "DJI",
  "DMA",
  "DNK",
  "DOM",
  "DZA",
  "ECU",
  "EGY",
  "ERI",
  "ESH",
  "ESP",
  "EST",
  "ETH",
  "FIN",
  "FJI",
  "FLK",
  "FRA",
  "FRO",
  "FSM",
  "GAB",
  "GBR",
  "GEO",
  "GGY",
  "GHA",
  "GIB",
  "GIN",
  "GLP",
  "GMB",
  "GNB",
  "GNQ",
  "GRC",
  "GRD",
  "GRL",
  "GTM",
  "GUF",
  "GUM",
  "GUY",
  "HKG",
  "HMD",
  "HND",
  "HRV",
  "HTI",
  "HUN",
  "IDN",
  "IMN",
  "IND",
  "IOT",
  "IRL",
  "IRN",
  "IRQ",
  "ISL",
  "ISR",
  "ITA",
  "JAM",
  "JEY",
  "JOR",
  "JPN",
  "KAZ",
  "KEN",
  "KGZ",
  "KHM",
  "KIR",
  "KNA",
  "KOR",
  "KWT",
  "LAO",
  "LBN",
  "LBR",
  "LBY",
  "LCA",
  "LIE",
  "LKA",
  "LSO",
  "LTU",
  "LUX",
  "LVA",
  "MAC",
  "MAF",
  "MAR",
  "MCO",
  "MDA",
  "MDG",
  "MDV",
  "MEX",
  "MHL",
  "MKD",
  "MLI",
  "MLT",
  "MMR",
  "MNE",
  "MNG",
  "MNP",
  "MOZ",
  "MRT",
  "MSR",
  "MTQ",
  "MUS",
  "MWI",
  "MYS",
  "MYT",
  "NAM",
  "NCL",
  "NER",
  "NFK",
  "NGA",
  "NIC",
  "NIU",
  "NLD",
  "NOR",
  "NPL",
  "NRU",
  "NZL",
  "OMN",
  "PAK",
  "PAN",
  "PCN",
  "PER",
  "PHL",
  "PLW",
  "PNG",
  "POL",
  "PRI",
  "PRK",
  "PRT",
  "PRY",
  "PSE",
  "PYF",
  "QAT",
  "REU",
  "ROU",
  "RUS",
  "RWA",
  "SAU",
  "SDN",
  "SEN",
  "SGP",
  "SGS",
  "SHN",
  "SJM",
  "SLB",
  "SLE",
  "SLV",
  "SMR",
  "SOM",
  "SPM",
  "SRB",
  "SSD",
  "STP",
  "SUR",
  "SVK",
  "SVN",
  "SWE",
  "SWZ",
  "SXM",
  "SYC",
  "SYR",
  "TCA",
  "TCD",
  "TGO",
  "THA",
  "TJK",
  "TKL",
  "TKM",
  "TLS",
  "TON",
  "TTO",
  "TUN",
  "TUR",
  "TUV",
  "TWN",
  "TZA",
  "UGA",
  "UKR",
  "UMI",
  "URY",
  "USA",
  "UZB",
  "VAT",
  "VCT",
  "VEN",
  "VGB",
  "VIR",
  "VNM",
  "VUT",
  "WLF",
  "WSM",
  "YEM",
  "ZAF",
  "ZMB",
  "ZWE",
]);

const countryCodeSchema = z
  .string()
  .trim()
  .min(1, "Required")
  .refine(
    (value) => value.length === 0 || ISO_3166_1_ALPHA_3_CODES.has(value.toUpperCase()),
    "Invalid"
  )
  .transform((value) => value.toUpperCase());

const emailSchema = z
  .string()
  .trim()
  .min(1, "Required")
  .refine((value) => value.length === 0 || z.string().email().safeParse(value).success, "Invalid");

function isIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

const contractStartDateSchema = z
  .string()
  .trim()
  .min(1, "Required")
  .refine((value) => value.length === 0 || isIsoDate(value), "Invalid")
  .transform((value) => new Date(`${value}T00:00:00.000Z`));

const requiredText = (maximum: number) =>
  z.string().trim().min(1, "Required").max(maximum, "Invalid");

const optionalTrimmedString = z
  .string()
  .trim()
  .optional()
  .transform((value) => value || undefined);

function hasValidLuhnChecksum(value: string) {
  const checksum = [...value].reverse().reduce((sum, digit, index) => {
    const parsedDigit = Number(digit);
    const doubledDigit = index % 2 === 1 ? parsedDigit * 2 : parsedDigit;
    return sum + (doubledDigit > 9 ? doubledDigit - 9 : doubledDigit);
  }, 0);

  return checksum % 10 === 0;
}

function optionalFrenchRegistrationNumber(length: 9 | 14) {
  return z
    .string()
    .trim()
    .optional()
    .transform((value) => value?.replace(/\s/g, "") || undefined)
    .refine(
      (value) =>
        value === undefined ||
        (new RegExp(`^\\d{${length}}$`).test(value) && hasValidLuhnChecksum(value)),
      "Invalid"
    );
}

const optionalPhoneSchema = z
  .string()
  .trim()
  .max(30, "Invalid")
  .optional()
  .transform((value) => value || undefined);

export const quoteInformationSchema = z
  .object({
    customerType: z.enum(["LEGAL_ENTITY"]),

    customer: z.object({
      legalName: requiredText(200),

      addressLine1: requiredText(200),

      addressLine2: optionalTrimmedString,

      postalCode: requiredText(30),

      city: requiredText(100),

      countryCode: countryCodeSchema,

      siren: optionalFrenchRegistrationNumber(9),
      siret: optionalFrenchRegistrationNumber(14),

      vatNumber: optionalTrimmedString,
      hasNoVatNumber: z.boolean().default(false),
    }),

    contact: z.object({
      name: requiredText(150),

      email: emailSchema,
      phone: optionalPhoneSchema,
    }),

    quoteTerms: z.object({
      contractStartDate: contractStartDateSchema,
    }),
  })
  .superRefine((data, ctx) => {
    const isFrance = data.customer.countryCode === "FRA";
    const isEuExceptFrance = isEuMemberCountry(data.customer.countryCode) && !isFrance;

    if (isEuExceptFrance && !data.customer.vatNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["customer", "vatNumber"],
        message: "Required",
      });
    }

    if (isEuExceptFrance && data.customer.hasNoVatNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["customer", "hasNoVatNumber"],
        message: "Invalid",
      });
    }

    if (!isEuExceptFrance && !data.customer.vatNumber && !data.customer.hasNoVatNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["customer", "vatNumber"],
        message: "Required",
      });
    }

    if (!isEuExceptFrance && data.customer.vatNumber && data.customer.hasNoVatNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["customer", "vatNumber"],
        message: "Invalid",
      });
    }

    if (isFrance && !data.customer.siren) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["customer", "siren"],
        message: "Required",
      });
    }

    if (isFrance && !data.customer.siret) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["customer", "siret"],
        message: "Required",
      });
    }
  });

export type QuoteInformationInput = z.input<typeof quoteInformationSchema>;

export type QuoteInformation = z.output<typeof quoteInformationSchema>;
