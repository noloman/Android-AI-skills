# KMP Project Structure

## Recommended Module Layout
- `:shared` — commonMain business logic, models, repositories
- `:shared:data` — optional split for data layer (network, database)
- `:shared:domain` — optional split for domain layer (use cases)
- `:androidApp` — Android application, Compose UI, ViewModel wrappers
- `:iosApp` — Xcode project, SwiftUI views, StateHolder consumers
- `:desktopApp` — Compose Desktop application (optional)

## Source Set Structure
```
shared/src/
  commonMain/    -> Pure Kotlin, no platform imports
  commonTest/    -> Shared tests (kotlin.test)
  androidMain/   -> Android-specific implementations
  iosMain/       -> iOS-specific implementations
  appleMain/     -> Shared Apple code (iOS + macOS)
  nativeMain/    -> All Kotlin/Native targets
  jvmMain/       -> Shared JVM code (Android + Desktop)
  desktopMain/   -> Desktop-specific implementations
```

## Key Conventions
- `commonMain` must never reference platform types directly — use `expect`/`actual`.
- Place API models and DTOs in commonMain for cross-platform serialization.
- Keep platform implementations thin — most logic stays in commonMain.
- Use `internal` visibility for shared module internals to prevent leaking to platform apps.
- Gradle: use `kotlin("multiplatform")` plugin, NOT `kotlin("jvm")` + manual source sets.
