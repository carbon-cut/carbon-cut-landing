# Target B Question Layout/Content Archetypes (Transport + Energy)

## Purpose

Lock representative question layout/content archetypes for Target B so migration can be done pattern-first and section-by-section.

## Archetype Set (11)

1. Minimalist question (single primary field)
- `src/app/_forms/basic/transport/car/qCar.tsx`

2. Large list / repeatable rows / can grow big
- `src/app/_forms/basic/transport/commonTransport/shortDistances/container.tsx`

3. Another minimalist question (binary toggle style)
- `src/app/_forms/basic/transport/commonTransport/airTravel/qAir.tsx`

4. Long and dense structured form block
- `src/app/_forms/basic/transport/commonTransport/airTravel/qAir1.tsx`

5. Multi-block question with many controls/states
- `src/app/_forms/basic/energy/housing/q1.tsx`

6. Question using `SideQuestion` (fallback/secondary input objective)
- `src/app/_forms/basic/energy/q1.tsx`
- Similar references:
  - `src/app/_forms/basic/energy/q2.tsx`
  - `src/app/_forms/basic/energy/heating/heatingBill.tsx`

7. Minimal two-field stack (same question block, two primary inputs)
- `src/app/_forms/basic/transport/car/qCar2.tsx`

8. Alternative input mode (mode switch, at least one path completed)
- `src/app/_forms/basic/transport/car/qCar3/qCar3-1.tsx`
- Similar references:
  - `src/app/_forms/basic/energy/q1.tsx`
  - `src/app/_forms/basic/energy/q2.tsx`

9. Inline unit pair (simple stack + attached unit display)
- `src/app/_forms/basic/energy/heating/quantities/gasTank.tsx`

10. Sectioned matrix inputs (grouped repeated sub-sections)
- `src/app/_forms/basic/energy/heating/quantities/woodCharcoal.tsx`

11. Selectable cards with conditional sub-fields
- `src/app/_forms/basic/energy/heating/quantities/gpl.tsx`

## Scope Notes

- Priority sections: `transport`, `energy`.
- `food` is not part of this model-selection pass.
- These are reference archetypes for migration; other active questions should align to one of these unless a justified exception is approved.

## Agreed Decisions (Locked)

1. Current focus is archetypes only.
- Do not migrate all questions yet.
- First build a full view of question layout/content diversity.

2. Architecture freedom for question code.
- We can change question architecture/design where needed.
- Keep current shape only if it is already clean and reusable.

3. Unit depiction standard (cross-archetype).
- Preferred standard: input suffix/prefix slot (non-editable unit token).
- Placeholder is not the primary unit signal.
- Temporary fallback when suffix/prefix is unavailable: include unit in label (e.g. `Distance (km)`).
- Placeholder cleanup across existing questions is a later pass.

## Execution Checklist (Track Progress)

- [ ] Step 1: Archetype quality review (no coding)
  - For each archetype: mark `keep`, `adjust`, `merge`, or `drop`.

- [ ] Step 2: Freeze `core archetypes` vs `specialized variants`
  - Keep core set small and reusable.
  - Keep variants explicit and justified.

- [ ] Step 3: Define visual/UX contract for each core archetype
  - Required slots/structure.
  - Spacing rhythm and label rules.
  - Error/help placement.
  - Mobile behavior.

- [ ] Step 4: Define validation contract per archetype
  - Standard required-field flow.
  - Fallback/alternative-path rule (`at least one path`).
  - Conditional reveal behavior.

- [ ] Step 5: Lock unit depiction implementation path
  - Primary: suffix/prefix unit token in input controls.
  - Fallback: unit in label where slot is unavailable.
  - Placeholder cleanup tracked as later pass.

- [ ] Step 6: Build archetype foundations in code
  - Start with shared composition building blocks first.
  - Keep behavior parity while improving architecture.

- [ ] Step 7: Archetype-by-archetype rollout
  - Migrate representative questions archetype-first.
  - Only then apply same pattern to remaining questions.

- [ ] Step 8: Story + regression gate for each archetype
  - Default, error, dense, mobile states.
  - Quick manual flow check before moving to next archetype.

## Step 1 Review Results (Initial Pass)

Goal: decide whether each archetype is worth keeping as-is, needs adjustment, should merge into another archetype, or should be dropped.

1. Minimalist question (single primary field)
- Status: `merge` (into a single "Simple prompt + fields" core archetype)
- Notes: current file mixes a clean layout with heavy question-spawning/orchestration logic; keep the UI shape, but split behavior concerns later.

2. Large list / repeatable rows / can grow big
- Status: `keep` (core repeater/list family)
- Notes: good representative of add/remove rows; style hard-codes some colors and icons, so visuals may be normalized later.

3. Minimalist (binary toggle style)
- Status: `merge` (into "Simple prompt + fields")
- Notes: same structural family as #1/#7; also contains question-spawning behavior that should be separated from layout.

4. Long and dense structured form block
- Status: `merge` (variant of repeater/list family)
- Notes: conceptually "repeater list with dense item grid + conditional fields"; keep as a reference, but treat as a specialization of #2.

5. Multi-block question with many controls/states
- Status: `adjust`
- Notes: valuable archetype, but it currently behaves like multiple prompts in one slide; may want a clearer internal sectioning contract.

6. Uses `SideQuestion` (fallback/secondary input objective)
- Status: `keep` (core fallback family)
- Notes: good representation of "secondary required path" style; should align to the shared validation contract later.

7. Minimal two-field stack
- Status: `merge` (into "Simple prompt + fields")
- Notes: exemplar is actually conditional multi-field; still belongs to the same structural family as #1.

8. Alternative input mode (mode switch, at least one path completed)
- Status: `keep` (core alternative/fallback family)
- Notes: distinct behavior/validation needs; this should remain its own core archetype.

9. Inline unit pair (simple stack + attached unit display)
- Status: `adjust` (and likely merge into "Simple prompt + fields" once unit standard is implemented)
- Notes: archetype is fine, but unit depiction should follow the agreed suffix/prefix standard; placeholders/labels will be normalized later.

10. Sectioned matrix inputs (grouped repeated sub-sections)
- Status: `keep` (specialized variant)
- Notes: legitimately different density/structure; likely remains a specialized archetype with strict layout rules.

11. Selectable cards with conditional sub-fields
- Status: `keep` (specialized variant)
- Notes: distinct interaction pattern (select -> reveal nested fields); worth keeping as its own archetype.
