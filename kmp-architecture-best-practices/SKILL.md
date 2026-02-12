---
name: kmp-architecture-best-practices
description: Kotlin Multiplatform clean architecture enforcement.
user-invocable: true
---

# KMP Architecture Rules

Activate only if commonMain exists.

## Hard Rules
- No `android.*` imports in commonMain — use expect/actual for platform APIs.
- No `java.time` in commonMain — use `kotlinx-datetime`.
- No Android ViewModel in shared code — use StateHolder pattern.
- No `Dispatchers.Main` hardcoded in commonMain — inject dispatchers.
- Use KSP for annotation processing — KAPT does not support multiplatform.
- No `freeze()` calls — the new Kotlin/Native memory model (default since 1.7.20) makes them unnecessary.
- Shared code must compile for all declared targets — never skip a target in CI.

## Core Patterns

### State Management
- commonMain: `StateHolder` class exposes `StateFlow<UiState>`.
- androidMain: `ViewModel` wraps `StateHolder`, bridges to Android lifecycle.
- iosMain: Swift class holds `StateHolder`, collects flows via `CancellableContinuation` or SKIE/KMP-NativeCoroutines.

### Dependency Injection
- Use Koin Multiplatform or manual factory pattern in commonMain.
- Platform modules provide platform-specific implementations via `actual` declarations or Koin modules.

### Source Set Hierarchy
- Use hierarchical source sets (`appleMain`, `nativeMain`, `jvmMain`) to share platform-adjacent code.
- `commonMain` → `jvmMain` → `androidMain` / `desktopMain`.
- `commonMain` → `nativeMain` → `appleMain` → `iosMain` / `macosMain`.

### Kotlin 2.0+ Considerations
- K2 compiler is default since Kotlin 2.0 — ensure libraries are K2-compatible.
- Compose Compiler is now a Gradle plugin (`org.jetbrains.kotlin.plugin.compose`) — not a separate compiler artifact.

## References
- references/project_structure.md
- references/common_libraries.md
- references/platform_apis.md
- references/testing_kmp.md
- references/dependency_injection.md
