# Common DI Mistakes

## Scoping Leaks
- Injecting Activity context into @Singleton scope — Activity leaks.
- Fix: use @ApplicationContext for singleton-scoped dependencies.
- Injecting ViewModel into @Singleton — ViewModel outlives its scope.
- Fix: use @ViewModelScoped or don't scope the consuming class.

## Missing Entry Points
- Forgetting @AndroidEntryPoint on Activity that hosts injected Fragments.
- Forgetting @HiltAndroidApp on Application class.
- Forgetting to add hilt-android-compiler to KSP configuration.
- Error: "Hilt Activity must be attached to an @AndroidEntryPoint Application."

## Circular Dependencies
- A depends on B, B depends on A — Dagger/Hilt fails at compile time.
- Fix: introduce an interface to break the cycle.
- Fix: use Provider<T> or Lazy<T> for deferred resolution.
- Review dependency graph if cycles emerge — usually indicates design issue.

## Field Injection Pitfalls
- @Inject lateinit var in Fragments — must call inject before accessing.
- Field injection not available in data classes or objects.
- Prefer constructor injection — field injection hides dependencies.
- Only use field injection where constructor injection is impossible (Activities, Fragments).

## Module Mistakes
- @Provides without @Module — binding is silently ignored.
- @Module without @InstallIn — compile error (Hilt requires component).
- @Binds with implementation class — must be abstract function in abstract module.
- @Provides returning interface type but Hilt can't find the implementation.

## Multi-Module Issues
- Missing feature-impl dependency in :app module — binding not found at compile time.
- Duplicate bindings across modules — use @Qualifier to disambiguate.
- Installing test module in wrong component — bindings not visible to the test.
- Feature module with @InstallIn(ActivityComponent::class) — consider if SingletonComponent is more appropriate.
