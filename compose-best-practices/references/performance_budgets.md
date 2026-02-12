# Performance Budgets (Pragmatic Defaults)

## Hot-path triggers (treat as HIGH)
- Lazy lists and item composables
- Animations and frequently-updating state
- New effects that collect/launch work on composition

## Guardrails
- Stable keys mandatory in Lazy lists.
- No heavy allocations in composition (especially item lambdas).
- Keep effects correctly keyed to avoid repeated work.
- Prefer localized state to avoid full-screen recomposition.

## On budget risk, propose
- safer alternative (remember/derivedStateOf/move to state holder)
- simple validation approach (repro scenario, before/after notes, existing benchmarks if present)
