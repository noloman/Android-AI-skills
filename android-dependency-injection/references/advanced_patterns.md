# Advanced Hilt/Dagger Patterns

## Provider vs Lazy Injection
- `@Inject lateinit var dep: MyClass` — eager injection at creation time.
- `@Inject lateinit var dep: Provider<MyClass>` — creates new instance on each `dep.get()`.
- `@Inject lateinit var dep: Lazy<MyClass>` — creates once on first `dep.get()`, reuses after.
- Use `Provider` for: factory-like behavior, creating multiple instances.
- Use `Lazy` for: expensive initialization that may not be needed.

## Custom Components (@DefineComponent)
- Create custom Hilt component for custom scoping (e.g., per-user session).
- `@DefineComponent(parent = SingletonComponent::class)` — define custom component.
- `@DefineComponent.Builder` — interface to build the component with custom dependencies.
- `@InstallIn(MyCustomComponent::class)` — install modules in custom scope.
- Use for: multi-tenant apps, feature-scoped dependencies, session-scoped singletons.

## Complex Dependency Graphs
- **Multibindings**: `@IntoSet` / `@IntoMap` for collecting implementations into Set or Map.
- Use `@StringKey` or `@ClassKey` for map bindings.
- Example: plugin systems, feature flag registries, analytics event handlers.
```kotlin
@Module
@InstallIn(SingletonComponent::class)
abstract class AnalyticsModule {
    @Binds @IntoSet
    abstract fun bindFirebaseTracker(impl: FirebaseTracker): AnalyticsTracker

    @Binds @IntoSet
    abstract fun bindMixpanelTracker(impl: MixpanelTracker): AnalyticsTracker
}
// Inject: @Inject lateinit var trackers: Set<@JvmSuppressWildcards AnalyticsTracker>
```

## Qualifiers vs Named
- Prefer custom `@Qualifier` annotations over `@Named("string")`.
- Custom qualifiers are compile-time checked — `@Named` strings can have typos.
```kotlin
@Qualifier @Retention(AnnotationRetention.BINARY) annotation class IoDispatcher
@Qualifier @Retention(AnnotationRetention.BINARY) annotation class DefaultDispatcher
```

## Testing Overrides
- Use `@TestInstallIn` to replace production modules in tests.
- `@UninstallModules(ProductionModule::class)` + test module for per-test overrides.
- `@BindValue` to bind test-specific instances directly.
- Hilt test modules have higher priority — automatically override production bindings.
