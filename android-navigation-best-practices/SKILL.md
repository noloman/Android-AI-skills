
---
name: android-navigation-best-practices
description: Android navigation — type-safe routes, deep links, App Links, navigation patterns.
---

# Android Navigation Best Practices

Cross-cutting skill — always activates alongside the project-type-specific skill.

## Hard Rules
- Use type-safe navigation (Navigation Compose routes as data classes/objects).
- Verify App Links with Digital Asset Links (assetlinks.json).
- Handle deep link fallbacks for users without the app installed.
- Never put heavy logic in navigation callbacks or destination lambdas.
- Use "standard" launch mode with Navigation — avoid singleTask/singleInstance unless justified.
- Validate all deep link parameters before processing.
- Use SavedStateHandle for navigation arguments that must survive process death.

## Core Patterns
- Single-activity architecture with Navigation Compose.
- Nested navigation graphs per feature module.
- Feature modules expose route contracts (data class/object), not composables.
- Use conditional navigation (auth gates) at the NavHost level.
- Pass results between destinations via SavedStateHandle, not shared ViewModels.
- Test navigation with TestNavHostController.

## References
- references/deep_links.md
- references/app_links.md
- references/navigation_patterns.md
- references/navigation_testing.md
