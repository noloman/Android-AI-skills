# Scoping

## Component Hierarchy
- SingletonComponent: application lifetime — @Singleton scope.
- ActivityRetainedComponent: survives configuration changes — @ActivityRetainedScoped.
- ViewModelComponent: ViewModel lifetime — @ViewModelScoped.
- ActivityComponent: Activity lifetime — @ActivityScoped.
- FragmentComponent: Fragment lifetime — @FragmentScoped.
- ServiceComponent: Service lifetime — @ServiceScoped.

## Choosing Scope
- @Singleton: app-wide singletons (Retrofit, OkHttpClient, Database, DataStore).
- @ViewModelScoped: shared within a ViewModel's dependency graph.
- Unscoped (no annotation): new instance every time — default and preferred for stateless objects.
- Prefer unscoped — only add scope when sharing or lifecycle binding is needed.

## Rules
- Scoped bindings must be installed in a component that matches the scope.
- @Singleton bindings must be in @InstallIn(SingletonComponent::class).
- A scoped binding cannot depend on a narrower-scoped binding.
- Unscoped bindings can be installed in any component.
- Wider scope = longer lifetime = more memory usage — scope conservatively.

## Common Mistakes
- Over-scoping: making everything @Singleton wastes memory and hides lifecycle issues.
- Under-scoping: creating expensive objects (database, HTTP client) repeatedly.
- Injecting Activity/Fragment context into @Singleton — causes memory leaks.
- Use @ApplicationContext for singletons that need Context.
- Use @ActivityContext only in @ActivityScoped or narrower components.

## Custom Scopes
- Define custom scopes with @Scope annotation for domain-specific lifetimes.
- Map to custom Hilt components with @DefineComponent.
- Rarely needed — standard Hilt scopes cover most cases.
