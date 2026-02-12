# Compose Compiler Stability Guidelines

## Strong Skipping Mode (Default in Compose Compiler 2.0+)
- Strong skipping is enabled by default — composables with unstable parameters can still be skipped.
- The compiler uses structural equality (equals) checks for all parameters, including unstable ones.
- Reduces the need for `@Stable` and `@Immutable` annotations in most cases.
- Lambda parameters are automatically remembered — less boilerplate needed.
- Still useful to annotate: parameters where `equals()` is expensive or incorrect.

## Stability Best Practices
- Prefer immutable UI models (data class with val properties).
- Avoid mutable collections in composable parameters (MutableList/MutableMap) — use `kotlinx.collections.immutable` if needed.
- Avoid allocations in hot recomposition paths; use `remember`/`derivedStateOf` or move to state holder.
- Provide stable Lazy keys for reorderable lists.
- Use `rememberUpdatedState` for callbacks captured in effects.

## When to Use @Stable/@Immutable
- Use `@Immutable` for data classes that are truly deeply immutable.
- Use `@Stable` for types where changes are always observable via Compose snapshots.
- Do NOT annotate to hide instability — compiler now handles most cases via strong skipping.
- Review Compose Compiler reports (`composeCompiler { reportsDestination.set(...) }`) to identify actual recomposition issues.

## Stability & Recomposition Diagnostics Checklist
1. Mixed M2/M3 imports — BLOCKER, remove all `androidx.compose.material.*`.
2. Missing Lazy keys — add stable keys to all Lazy list items.
3. Allocations in recomposition — use `remember`/`derivedStateOf` or move to state holder/ViewModel.
4. Unstable params — watch for mutable collections and changing lambdas.
5. Wrong effect keys — verify `LaunchedEffect`/`DisposableEffect` keys match intended lifecycle.

## Compose Compiler Reports
- Generate reports: `composeCompiler { reportsDestination.set(layout.buildDirectory.dir("compose_reports")) }`.
- Reports show: stable/unstable classes, skippable/restartable composables.
- Use to identify remaining performance issues — focus on hot paths only.
- Do NOT aim for 100% stable — strong skipping makes most instability harmless.
