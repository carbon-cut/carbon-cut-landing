### Goal

Implement the parameter resolution service for calculation runs.

### Acceptance criteria

- [ ] Parameter resolution module/service exists
- [ ] Service determines all parameter families and entries needed for one run before formula execution
- [ ] Service gathers all needed parameter entries in one preload phase before formula execution
- [ ] Service accepts family key, selector values, country, and year context
- [ ] Country-specific entries are preferred over global entries
- [ ] Global entries are used as fallback when no country-specific entry exists
- [ ] Validity year filtering is supported
- [ ] Service returns resolved entries in a shape usable for calculation snapshots
- [ ] At least one resolution case can be tested end-to-end

effort: M
