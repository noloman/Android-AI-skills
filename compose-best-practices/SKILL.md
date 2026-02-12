
---
name: compose-best-practices
description: Strict Android Compose best practices with optional enterprise enforcement.
user-invocable: true
---

# Compose Best Practices (Material3 Only)

## Hard Rule
- Only androidx.compose.material3.* allowed.
- Mixing material.* and material3.* = BLOCKER.

## Enterprise Mode Auto-Detection (Optional Strict Mode)
Enterprise Mode activates automatically when any of these files exist in the project root:
- detekt.yml / detekt.yaml
- lint.xml
- ktlint configuration (e.g., .editorconfig with ktlint rules, ktlint.gradle.kts)
- spotless configuration (spotless.gradle.kts)

When Enterprise Mode is active:
- Treat new lint/detekt violations in touched code as HIGH severity.
- Prefer fixing issues over suppressing them.
- If suppression is necessary, scope it narrowly and justify it.

When Enterprise Mode is not active:
- Do NOT assume lint/detekt/ktlint is used.
- Provide tool-agnostic guidance only.


## Core Rules
- Stateless composables
- StateFlow for UI state
- SharedFlow for one-off events
- stateIn with WhileSubscribed(5_000)
- No suspend in composable body
- Stable keys in Lazy lists
- Avoid allocations in hot recomposition paths
- Use MaterialTheme.colorScheme

## References
- references/enterprise_mode.md
- references/compose_compiler_stability.md
- references/performance_budgets.md
