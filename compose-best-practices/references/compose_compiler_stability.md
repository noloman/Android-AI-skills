# Compose Compiler Stability Guidelines

- Prefer immutable UI models (data class with val properties).
- Avoid mutable collections in composable parameters (MutableList/MutableMap).
- Avoid allocations in hot recomposition paths; use remember/derivedStateOf or move to state holder.
- Provide stable Lazy keys for reorderable lists.
- Use rememberUpdatedState for callbacks captured in effects.
- Use @Stable/@Immutable only when correct; do not annotate to hide instability.
