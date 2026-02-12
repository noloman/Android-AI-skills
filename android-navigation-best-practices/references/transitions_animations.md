# Navigation Transitions & Animations

## Shared Element Transitions (Navigation 2.8+)
- Use `SharedTransitionLayout` wrapping the `NavHost` for shared element support.
- Mark shared elements with `Modifier.sharedElement(rememberSharedContentState(key), animatedVisibilityScope)`.
- Match elements across destinations by key — same key = same shared element.
- Works with `AnimatedNavHost` for automatic enter/exit transitions.

## Custom Navigation Animations
- `AnimatedNavHost` replaces `NavHost` for animated transitions.
- Define `enterTransition`, `exitTransition`, `popEnterTransition`, `popExitTransition` per destination or globally.
- Built-in: `fadeIn()`, `fadeOut()`, `slideInHorizontally()`, `slideOutHorizontally()`, `scaleIn()`, `scaleOut()`.
- Combine with `+` operator: `fadeIn() + slideInHorizontally()`.

## Material Motion
- `MaterialSharedAxis` — shared axis transitions (X, Y, Z) for related destinations.
- `MaterialFadeThrough` — fade through for unrelated destinations (e.g., bottom nav switches).
- `MaterialElevationScale` — elevation scale for expanding items.
- Available via `com.google.android.material:material` and Compose equivalents.

## Predictive Back Animations
- Shared element transitions work with predictive back — elements animate in reverse.
- Custom back progress: scale, translate, or fade based on `BackEvent.progress` (0.0–1.0).
- Use `Modifier.graphicsLayer` for performant custom animations during back gesture.

## Best Practices
- Keep transitions under 300ms — longer animations feel sluggish.
- Match enter and exit transitions — inconsistent transitions disorient users.
- Disable transitions for instant navigation (e.g., auth redirects).
- Test on low-end devices — complex animations can drop frames.
- Use `AnimatedVisibilityScope` from NavHost for coordinated animations.
