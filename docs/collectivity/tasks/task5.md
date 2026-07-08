### Goal

Implement persistence for `CalculationParameterFamily`.

### Acceptance criteria

- [ ] `CalculationParameterFamily` table/model exists
- [ ] Required architecture fields are implemented
- [ ] `key` is stored as the stable family identity
- [ ] `kind` supports factor-like and constant-like families
- [ ] `selectorSchema` is stored in a structured form
- [ ] `gas`, `unit`, and `emissionScope` are supported
- [ ] Migrations run successfully
- [ ] At least one factor-like family and one constant-like family can be stored

effort: M
