### Goal

Implement the municipality calculation slice.

### Acceptance criteria

- [x] Municipality formulas are implemented for `fleet`
- [x] Municipality formulas are implemented for `publicLighting`
- [x] Municipality formulas are implemented for `buildings`
- [ ] Municipality formulas are implemented for `treesParksWaste`
- [x] Municipality calculation reads from the saved inventory input shape
- [x] Municipality calculation uses resolved parameter entries from the run preload
- [x] Municipality output is written under the `municipal` branch of the canonical emissions payload
- [x] At least one municipality sample can be manually checked against a known reference

### Notes

- Integrated frontend/backend manual test passed for the implemented municipality datasets.
- `treesParksWaste` / green waste remains open and should be handled separately inside this task.

effort: M
