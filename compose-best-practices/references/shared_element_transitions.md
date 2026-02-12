# Shared Element Transitions in Compose

## Setup
- Wrap `NavHost` with `SharedTransitionLayout` to enable shared transitions.
- Available in `androidx.compose.animation` (experimental API, stabilizing in 2025).

## Usage
```kotlin
SharedTransitionLayout {
    AnimatedNavHost(navController, startDestination = "list") {
        composable("list") {
            ItemList(
                onItemClick = { navController.navigate("detail/${it.id}") },
                animatedVisibilityScope = this
            )
        }
        composable("detail/{id}") {
            ItemDetail(animatedVisibilityScope = this)
        }
    }
}
```

## Marking Shared Elements
```kotlin
// In list item
Image(
    painter = painterResource(item.image),
    modifier = Modifier.sharedElement(
        rememberSharedContentState(key = "image-${item.id}"),
        animatedVisibilityScope = animatedVisibilityScope
    )
)

// In detail screen — same key matches the element
Image(
    painter = painterResource(item.image),
    modifier = Modifier.sharedElement(
        rememberSharedContentState(key = "image-${item.id}"),
        animatedVisibilityScope = animatedVisibilityScope
    )
)
```

## Shared Bounds vs Shared Element
- `sharedElement`: element morphs position and size between destinations.
- `sharedBounds`: container morphs — content inside can differ between destinations.
- Use `sharedBounds` for: card expanding to full screen, FAB expanding to new screen.

## Best Practices
- Use unique, stable keys for shared elements — typically `"type-${id}"`.
- Keep shared elements lightweight — complex composables slow the transition.
- Works with predictive back — elements animate in reverse during back gesture.
- Test on low-end devices — shared element transitions can be janky without hardware acceleration.
- Combine with `fadeIn`/`fadeOut` for non-shared content during transition.
