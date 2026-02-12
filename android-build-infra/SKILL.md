
---
name: android-build-infra
description: Android build infrastructure — version catalogs, convention plugins, modularization, variants.
user-invocable: true
---

# Android Build Infrastructure

Cross-cutting skill — always activates alongside the project-type-specific skill.

## Hard Rules
- Use Gradle version catalogs (libs.versions.toml) for all dependencies.
- Use convention plugins (build-logic/) for shared build configuration.
- Separate build variants for debug, release, and staging.
- Never hardcode versionCode or versionName in convention plugins.
- Use buildFeatures.buildConfig = true sparingly — prefer other config mechanisms.
- Modularize by feature: feature-api (contracts/routes) and feature-impl (screens/DI).
- Dependencies flow inward — feature modules never depend on other feature modules.
- Use implementation scope by default — api scope only when the type is part of the module's public API.
- Use KSP for annotation processing — KAPT is deprecated and does not support K2 compiler.
- Use the Compose Compiler Gradle plugin (`org.jetbrains.kotlin.plugin.compose`) — not the old compiler artifact dependency.

## Core Patterns
- Group related dependencies in version catalog bundles.
- Keep convention plugins focused — one plugin per concern (android-app, android-library, compose).
- Use product flavors for environment switching (dev, staging, prod).
- Run dependency analysis plugin to detect unused or misscoped dependencies.
- Use Gradle build cache and configuration cache for faster builds.
- Pin Gradle wrapper version in gradle-wrapper.properties.
- Kotlin 2.0+: K2 compiler is default — verify all annotation processors (Room, Hilt, Moshi) are KSP-compatible.

## References
- references/version_catalogs.md
- references/convention_plugins.md
- references/build_variants.md
- references/modularization.md
- references/dependency_management.md
- references/ksp_migration.md
- references/build_performance.md
