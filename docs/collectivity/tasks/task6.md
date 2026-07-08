### Goal

Implement persistence for `CalculationParameterEntry` and `SourceReference`.

### Acceptance criteria

- [ ] `CalculationParameterEntry` table/model exists
- [ ] `SourceReference` table/model exists
- [ ] Required architecture fields are implemented
- [ ] `CalculationParameterEntry.familyId` relation is supported
- [ ] `CalculationParameterEntry.sourceReferenceId` relation is supported
- [ ] A parameter entry can be stored with no source reference
- [ ] A parameter entry can be stored with a source reference
- [ ] A family can have multiple entries
- [ ] Country-specific and global entries are supported
- [ ] Migrations run successfully

effort: M
