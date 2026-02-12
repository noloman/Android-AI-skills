# Hilt Setup

## Gradle Configuration
- Add hilt-android and hilt-android-compiler (KSP) dependencies.
- Apply com.google.dagger.hilt.android plugin.
- Use KSP (not KAPT) for faster annotation processing.
- Add hilt-navigation-compose for ViewModel injection in Navigation Compose.

## Application
- Annotate Application class with @HiltAndroidApp.
- This generates the Hilt component hierarchy rooted at SingletonComponent.
- Application class is required — Hilt cannot work without it.

## Android Entry Points
- @AndroidEntryPoint on Activities that use injection.
- @AndroidEntryPoint on Fragments that use injection.
- Activities must be @AndroidEntryPoint if their Fragments use injection.
- Services, BroadcastReceivers, and Views can also be @AndroidEntryPoint.

## Modules
- @Module + @InstallIn(Component::class) for providing dependencies.
- @Provides for creating instances with constructor logic.
- @Binds for mapping interface to implementation (more efficient than @Provides).
- companion object with @Provides for static factory methods.
- Separate modules by concern: NetworkModule, DatabaseModule, RepositoryModule.

## ViewModel
- Annotate ViewModel with @HiltViewModel.
- Use @Inject constructor for ViewModel dependencies.
- Access in Compose: hiltViewModel() from hilt-navigation-compose.
- Access in Fragment: by viewModels().
- SavedStateHandle is automatically available in @HiltViewModel constructor.

## Hilt with Navigation Compose
- Use `hiltViewModel()` from `hilt-navigation-compose` for ViewModel injection in composable destinations.
- `hiltViewModel()` scopes ViewModel to the current `NavBackStackEntry`.
- Shared ViewModel across destinations: `hiltViewModel(parentEntry)` where `parentEntry` is the navigation graph's back stack entry.
- Access parent entry: `val parentEntry = remember(navBackStackEntry) { navController.getBackStackEntry("parentRoute") }`.
- Each composable destination gets its own ViewModel instance — not shared by default.
- Use `hiltViewModel(navBackStackEntry)` explicitly when sharing is needed.
