# Version Catalogs

## File Structure (libs.versions.toml)
- [versions]: define version variables (e.g., kotlin = "2.0.0").
- [libraries]: define dependencies with version references (e.g., kotlinx-coroutines = { group = "org.jetbrains.kotlinx", name = "kotlinx-coroutines-core", version.ref = "coroutines" }).
- [bundles]: group related libraries (e.g., compose = ["compose-ui", "compose-material3", "compose-tooling"]).
- [plugins]: define Gradle plugins (e.g., android-application = { id = "com.android.application", version.ref = "agp" }).

## Naming Conventions
- Use kebab-case for library aliases: kotlinx-coroutines-core.
- Version references: use short, clear names (kotlin, agp, compose, coroutines).
- Bundle names: group by concern (compose, networking, testing).

## Usage in build.gradle.kts
- Access libraries: libs.kotlinx.coroutines.core (dots replace hyphens).
- Access bundles: libs.bundles.compose.
- Access plugins: alias(libs.plugins.android.application).
- Android Studio provides autocomplete for catalog entries.

## Best Practices
- Single source of truth — all dependencies in libs.versions.toml.
- No version strings in build.gradle.kts files.
- Review version catalog changes carefully in PRs — affects entire project.
- Use Renovate or Dependabot for automated version bump PRs.
