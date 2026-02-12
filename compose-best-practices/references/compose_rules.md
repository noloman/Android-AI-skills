# Compose Core Rules (Material3)

## Material3 Only
- Use androidx.compose.material3.*
- Use MaterialTheme.colorScheme
- Mixing androidx.compose.material.* and material3.* in same file = BLOCKER

## Architecture
- Stateless composables preferred
- Hoist state
- UI renders state and emits events only
- No business logic in composables

## Side-effects
- No suspend calls in composable body
- Use LaunchedEffect/DisposableEffect with stable keys

## Performance
- Stable keys in Lazy lists
- Avoid allocations in hot recomposition paths
- Prefer immutable/stable parameters
