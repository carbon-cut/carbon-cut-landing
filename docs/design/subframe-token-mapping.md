# Subframe token mapping

Use this mapping whenever translating a Subframe design into this codebase. Do not copy a Subframe token that is absent from `tailwind.config.ts`; use its established local equivalent when one is listed here.

## Exact color equivalents

| Subframe token  | Local token          | Value              |
| --------------- | -------------------- | ------------------ |
| `brand-primary` | `brand-600`          | `rgb(5 150 105)`   |
| `brand-200`     | `success-200`        | `rgb(167 243 208)` |
| `brand-400`     | `success-400`        | `rgb(52 211 153)`  |
| `brand-900`     | `success-900`        | `rgb(6 78 59)`     |
| `neutral-0`     | `default-background` | `rgb(255 255 255)` |
| `neutral-500`   | `subtext-color`      | `rgb(113 113 122)` |
| `neutral-900`   | `default-font`       | `rgb(24 24 27)`    |

## No exact local equivalent

`neutral-600`, `neutral-800`, and `neutral-950` do not have an exact local token. Stop and choose a token deliberately for the specific surface; do not invent a Tailwind class.

All shared tokens with the same name, including the existing `brand-*`, `success-*`, `warning-*`, and `error-*` tokens, have identical values in the local and Subframe themes.
