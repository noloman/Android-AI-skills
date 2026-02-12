# Multi-Module DI

## Pattern
- feature-api module: defines interfaces (Repository, UseCase contracts).
- feature-impl module: implements interfaces, provides Hilt bindings.
- :app module: depends on all feature-impl modules, wires everything together.
- Core modules: provide shared utilities (networking, database).

## Binding in Feature Modules
- Define @Module in feature-impl with @Binds mapping interface → implementation.
- @InstallIn(SingletonComponent::class) for cross-feature shared instances.
- @InstallIn(ViewModelComponent::class) for per-ViewModel instances.
- Feature-impl module has implementation dependency on feature-api.

## Cross-Feature Dependencies
- Feature A needs Feature B's repository: depend on feature-b-api (interface only).
- Hilt resolves the binding from feature-b-impl at compile time in :app.
- Features never depend on other feature-impl modules directly.
- This maintains loose coupling and parallel build.

## Navigation DI
- Feature-api exposes route classes — no DI needed for navigation contracts.
- ViewModels in feature-impl use @HiltViewModel with injected dependencies.
- Use hiltViewModel() in composable destinations for automatic scoping.
- Shared data: pass via navigation arguments, not shared ViewModel instances.

## Aggregation
- :app module aggregates all @InstallIn modules automatically.
- Hilt scans all transitive dependencies for @Module classes.
- No manual component builder needed — Hilt handles aggregation.
- Use @EntryPoint when injecting into non-Hilt-managed classes in feature modules.
