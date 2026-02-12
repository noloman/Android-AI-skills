# Navigation Patterns

## Type-Safe Navigation
- Define routes as data classes/objects with kotlinx.serialization.
- Routes encode arguments as properties: data class ProfileRoute(val userId: String).
- Object routes for argument-less destinations: object HomeRoute.
- Navigation library generates type-safe NavType conversions automatically.

## NavHost & NavController
- Single NavHost per navigation graph (usually in the main Activity/screen).
- NavController manages the back stack and destination transitions.
- Access NavController via rememberNavController() in Compose.
- Pass NavController down or use callback lambdas — prefer callbacks for testability.

## Single-Activity Architecture
- One Activity hosts the NavHost — all screens are composable destinations.
- Reduces complexity: no Activity lifecycle coordination issues.
- Deep links resolve to composable destinations within the single Activity.
- Use Fragments only if migrating incrementally from Fragment-based navigation.

## Nested Navigation Graphs
- Group related destinations per feature: navigation(route = "profile_graph") { ... }.
- Each feature module defines its own navigation graph.
- Wire graphs together in the app module's NavHost.
- Use startDestination for the default screen within each graph.

## Arguments & State
- Use SavedStateHandle to receive navigation arguments in ViewModel.
- Arguments survive process death — prefer over transient in-memory passing.
- For complex data: pass an ID and load from repository, not the full object.
- Maximum argument size is limited — avoid large payloads.

## Conditional Navigation
- Auth gates: check login state at NavHost level, redirect to login if needed.
- Use navOptions { popUpTo(startRoute) { inclusive = true } } for auth redirects.
- Onboarding flows: use a one-time navigation guard at the root level.

## Result Passing
- Use SavedStateHandle on the previous back stack entry for results.
- previousBackStackEntry?.savedStateHandle?.set("key", result).
- Avoid shared ViewModels for result passing — they create tight coupling.

## Multi-Stack Bottom Navigation
- Each bottom tab maintains its own back stack (Navigation 2.8+).
- Use `NavHost` per tab or `saveState`/`restoreState` on `navigate()`.
- Preserve scroll position and state when switching tabs.
- Re-selecting the current tab pops to the tab's start destination.

## Navigation 2.8 Serialization
- Routes use `@Serializable` data classes/objects (replaces string routes).
- Type-safe argument passing — compiler verifies argument types.
- Custom NavTypes for complex types: implement `NavType<T>` with serialization.
- Migration: replace `composable("route/{arg}")` with `composable<RouteClass>`.
