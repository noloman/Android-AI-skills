# Modularization

## Module Types
- :app — orchestrator module, composes features, no business logic.
- :feature:<name>-api — public contracts: route data classes, repository interfaces.
- :feature:<name>-impl — screens, ViewModels, DI bindings, internal implementation.
- :core:<name> — shared utilities (network, database, design system, common).
- :domain — use cases, business rules, platform-independent logic.

## Dependency Rules
- Features never depend on other feature-impl modules.
- Features depend on other feature-api modules for navigation contracts.
- Core modules are shared — any module can depend on core.
- Domain has no Android dependencies — pure Kotlin.
- :app depends on all feature-impl modules for DI wiring.

## Navigation Between Features
- Feature-api exposes route data classes (e.g., data class ProfileRoute(val userId: String)).
- Navigation is wired in :app module's NavHost.
- Features don't know about each other's internal screens.
- Use interfaces for cross-feature callbacks when needed.

## Benefits
- Parallel compilation — independent modules build concurrently.
- Incremental builds — changes in one feature don't recompile others.
- Clear ownership — each feature is self-contained.
- Testability — feature-impl can be tested in isolation.

## Migration Strategy
- Start with :core extraction (common utilities, networking, design system).
- Extract one feature at a time — highest-churn module first.
- Use dependency analysis plugin to detect improper dependencies.
- Set up module dependency rules in CI to prevent regression.
