
---
name: kmp-architecture-best-practices
description: Kotlin Multiplatform clean architecture enforcement.
user-invocable: true
---

# KMP Architecture Rules

Activate only if commonMain exists.

## Hard Rules
- No android.* imports in commonMain.
- No java.time in commonMain.
- No Android ViewModel in shared code.

## State Pattern
commonMain:
- StateHolder exposes StateFlow.

androidMain:
- ViewModel wraps StateHolder.

## Coroutines
- No Dispatchers.Main hardcoded in commonMain.
- Inject dispatchers if needed.
