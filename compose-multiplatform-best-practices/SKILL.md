
---
name: compose-multiplatform-best-practices
description: Compose Multiplatform shared UI best practices.
---

# Compose Multiplatform Rules

Activate if shared UI exists in commonMain.

## Hard Rules
- No Android ViewModel in shared UI.
- No android.* imports.
- Navigation owned by platform layer.

## State
Shared UI uses StateHolder exposing StateFlow.

## Coroutines
- No Dispatchers.Main hardcoded.
