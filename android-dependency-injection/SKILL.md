
---
name: android-dependency-injection
description: Dependency injection with Hilt/Dagger — setup, scoping, multi-module, testing.
user-invocable: true
---

# Android Dependency Injection

Cross-cutting skill — always activates alongside the project-type-specific skill.

## Hard Rules
- Use Hilt as the default DI framework for Android projects.
- Annotate Application class with @HiltAndroidApp.
- Annotate all Activities and Fragments that use injection with @AndroidEntryPoint.
- Scope dependencies correctly — @Singleton for app-wide, @ViewModelScoped for ViewModel lifetime.
- Never inject Activity or Fragment context into @Singleton-scoped objects — use @ApplicationContext.
- Define bindings in @Module classes — use @Binds for interface-to-implementation, @Provides for construction.
- Use @Qualifier annotations to distinguish same-type bindings — not named strings.
- Keep modules focused — one module per feature boundary.
- Use constructor injection over field injection wherever possible.
- Never use Dagger directly when Hilt is available — Hilt reduces boilerplate.

## Core Patterns
- @InstallIn(SingletonComponent::class) for app-wide singletons.
- @InstallIn(ViewModelComponent::class) for ViewModel-scoped dependencies.
- Use @AssistedInject for WorkManager Workers and other assisted construction.
- Define interface in feature-api, implementation binding in feature-impl module.
- Use @EntryPoint for injecting into classes Hilt doesn't manage (ContentProvider, etc.).
- Wrap third-party SDK initialization in @Provides methods for testability.

## References
- references/hilt_setup.md
- references/scoping.md
- references/multi_module_di.md
- references/testing_di.md
- references/common_mistakes.md
- references/advanced_patterns.md
