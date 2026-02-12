# Navigation in Compose Multiplatform

## Library Options

### Voyager (Recommended for simplicity)
- Screen-based navigation with built-in transitions.
- `Navigator(HomeScreen)` in shared code, platform provides the root.
- Built-in BottomSheet, Tab, and nested navigation support.
- ScreenModel for screen-scoped state (replaces ViewModel).

### Decompose (Recommended for complex apps)
- Component-based architecture with full lifecycle control.
- Platform-agnostic navigation stack management.
- Supports deep links, multi-stack, and state restoration.
- Components hold business logic; Compose renders UI.

### AndroidX Navigation (Multiplatform - experimental)
- `androidx.navigation:navigation-compose` multiplatform artifacts.
- Type-safe routes with `@Serializable` route classes (Navigation 2.8+).
- Most familiar for Android developers but least mature for KMP.

## Best Practices
- Define all routes/screens in commonMain.
- Never reference `NavHostController` from commonMain — wrap in an interface if needed.
- Platform entry points set up the navigation root.
- Use `SavedStateHandle` alternatives (Decompose's `StateKeeper`, Voyager's `ScreenModel`).
- Test navigation logic independently of Compose UI.

## Anti-Patterns
- Passing Android `NavController` to shared composables.
- Using `Activity`-based navigation (startActivity) from shared code.
- Deep coupling between navigation state and UI state.
