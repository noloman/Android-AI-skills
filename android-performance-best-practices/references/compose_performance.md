# Compose Performance

## Recomposition Profiling
- Use Layout Inspector in Android Studio to visualize recomposition counts.
- Recomposition highlights: composables that recompose frequently are flagged.
- High recomposition count + no visual change = wasted work — investigate.
- Enable recomposition counts: Layout Inspector > "Show Recomposition Counts" toggle.

## Compose Compiler Reports
- Generate reports: `composeCompiler { reportsDestination.set(layout.buildDirectory.dir("compose_reports")) }`.
- Reports show: restartable, skippable, stable/unstable composables and classes.
- Focus on hot paths: list items, frequently-updated screens, animated content.
- Not all instability needs fixing — strong skipping mode handles most cases.

## Common Performance Issues
- **Unstable lambda allocation**: lambdas that capture changing variables recompose parent. Fix: hoist to ViewModel or use `remember`.
- **Recomposition scope too wide**: entire screen recomposes on small state change. Fix: extract frequently-changing UI into smaller composables.
- **LazyColumn without keys**: forces full rebind on data change. Fix: always provide stable keys.
- **Reading state in wrong scope**: `collectAsState()` at screen level causes full recomposition. Fix: collect in the smallest composable that needs the state.

## Layout Inspector - Compose Tree
- Inspect live Compose hierarchy: see composable names, parameters, and recomposition.
- Identify composables receiving unstable parameters — even with strong skipping.
- Compare visual output vs semantic tree for accessibility verification.
- Available in Android Studio Flamingo+ with Layout Inspector v2.

## Performance Optimization Checklist
- Provide keys to all `LazyColumn`/`LazyRow` items.
- Use `derivedStateOf` for computed values in composition.
- Use `remember` for objects created during composition.
- Avoid heavy computation in `@Composable` functions — move to ViewModel.
- Use `Modifier.graphicsLayer` for animations (avoids recomposition).
- Profile before optimizing — premature optimization wastes time.
