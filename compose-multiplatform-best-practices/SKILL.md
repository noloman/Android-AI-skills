---
name: compose-multiplatform-best-practices
description: Compose Multiplatform shared UI best practices.
user-invocable: true
---

# Compose Multiplatform Rules

Activate if shared UI composables exist in commonMain.

## Hard Rules
- No Android ViewModel in shared UI — use StateHolder pattern with StateFlow.
- No `android.*` imports in shared composables — use Compose Multiplatform APIs.
- No `R.drawable` or `R.string` — use Compose Resources API (`Res.drawable`, `Res.string`).
- Navigation logic owned by platform layer or multiplatform navigation library — never depend on `androidx.navigation` directly in commonMain.
- Use `org.jetbrains.kotlin.plugin.compose` Gradle plugin — not the old compiler artifact.
- No `LocalContext.current` in shared code — it's Android-only.

## Core Patterns

### State Management
- StateHolder class in commonMain exposes `StateFlow<UiState>`.
- Platform layer wraps StateHolder with lifecycle-aware collection.
- Shared composables receive state as parameters — fully stateless.

### Platform-Specific UI
- Use `expect`/`actual` `@Composable` functions for platform-specific widgets.
- Keep platform composables minimal — delegate to shared composables where possible.
- iOS: `ComposeUIViewController` hosts shared Compose UI in SwiftUI/UIKit.
- Desktop: `Window`, `Tray`, `MenuBar` from `compose.desktop.currentOs`.

### Resources
- Use Compose Resources: `org.jetbrains.compose.resources` module.
- Place resources in `commonMain/composeResources/`.
- Access via generated `Res` object: `Res.drawable.icon`, `Res.string.app_name`.
- Supports images, strings, fonts, and raw files across all platforms.

### Navigation
- Recommended libraries: Voyager, Decompose, or androidx.navigation (multiplatform alpha).
- Define screen models/configurations in commonMain.
- Platform entry points select the initial screen/route.

## References
- references/navigation.md
- references/resources.md
- references/platform_ui.md
- references/ios_specific.md
- references/desktop_specific.md
