# Performance Budgets (Pragmatic Defaults)

## Hot-Path Triggers (Treat as HIGH Priority)
- **Lazy lists and item composables** — recompose on every scroll; allocations here cause jank.
- **Animations and frequently-updating state** — recompose at 60fps; any allocation per frame is costly.
- **Effects that collect/launch work on composition** — wrong keys cause repeated subscriptions.
- **Shared state read by many composables** — changes trigger wide recomposition trees.

## Concrete Metrics
| Metric | Target | Measurement |
|---|---|---|
| Frame render time | < 16ms (60fps) / < 8ms (120fps) | Compose metrics, systrace |
| Recomposition count per frame | Minimize — 0 unnecessary recompositions | Layout Inspector recomposition counts |
| Composition time for a single item | < 1ms | Compose compiler metrics |
| Lazy list scroll jank | 0 janky frames in normal scrolling | Macrobenchmark `FrameTimingMetric` |
| Initial composition | < 50ms for a screen | `reportFullyDrawn()` + traces |

## Guardrails
- **Stable keys mandatory** in all Lazy lists — use business IDs, not indices.
- **No allocations in composition** — especially in `item {}` lambdas (no `listOf()`, `mapOf()`, `Pair()`).
- **Keep effects correctly keyed** — `LaunchedEffect(key)` should match the data lifecycle.
- **Prefer localized state** — avoid full-screen recomposition by scoping state reads narrowly.
- **Use `derivedStateOf`** for computed values that change less often than their inputs.
- **Never read `mutableStateOf` in a parent** and pass the derived value down — read at the leaf.

## When Budget Is At Risk
1. Propose a safer alternative: `remember {}`, `derivedStateOf {}`, or move computation to ViewModel.
2. Suggest a validation approach:
   - Enable recomposition counts in Layout Inspector.
   - Create a before/after Macrobenchmark with `FrameTimingMetric`.
   - Check Compose compiler reports for skippability of affected composables.
3. If existing benchmarks are present, run them to verify no regression.

## Common Fixes by Symptom
| Symptom | Likely Cause | Fix |
|---|---|---|
| Janky scrolling | Allocation in `item {}` lambda | Extract to stable model, use `remember` |
| Entire screen recomposes | State read too high in the tree | Move state read closer to consumer |
| Animation stutters | Heavy computation in animated composable | Offload to `derivedStateOf` or ViewModel |
| Slow initial render | Too many composables in first frame | Use `LazyColumn` or defer off-screen content |
