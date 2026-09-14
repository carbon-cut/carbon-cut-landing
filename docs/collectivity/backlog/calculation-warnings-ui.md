# Calculation warnings UI

Create a localized, accessible warning panel for collectivity calculation output.

- Display the structured `warnings` array returned by debug calculations, including the relevant item or path where available.
- Preserve warnings from full calculations when the persisted result reader is migrated to expose `CalculationRun.warnings`.
- For wastewater `NE` warnings, keep the numeric partial result visible and explain that the treated-effluent pathway could not be estimated; carry the same warning into exports.
- Keep the panel compact and non-blocking; warnings must not be presented as calculation errors.
