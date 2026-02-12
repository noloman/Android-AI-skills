
---
name: android-testing-best-practices
description: Android testing best practices — Compose UI testing, screenshot tests, Room migrations, CI.
user-invocable: true
---

# Android Testing Best Practices

Cross-cutting skill — always activates alongside the project-type-specific skill.

## Hard Rules
- Follow the test pyramid — many unit tests, fewer integration, fewest E2E.
- Use Compose testing APIs for Compose UI — not Espresso on Compose.
- Prefer fakes over mocks for dependencies.
- Export Room schemas (exportSchema = true) and test all migrations.
- Use descriptive test names that state the scenario and expected outcome.
- No Thread.sleep() in tests — use idling resources or test coroutine control.
- Tests must be deterministic — no flaky randomness or timing dependencies.
- Unit tests run on every PR.
- Use TestDispatcher + runTest for coroutine tests.
- Quarantine flaky tests — do not let them block the pipeline.

## Core Patterns
- One concept per test — single assertion focus.
- AAA structure (Arrange, Act, Assert) in every test.
- Use test data builders or fixtures, not inline object construction.
- Test all UI states: loading, content, error, empty.
- Use Robolectric for fast on-JVM Android tests when instrumented tests aren't needed.
- Separate test source sets: test/ (unit), androidTest/ (instrumented).

## References
- references/compose_ui_testing.md
- references/screenshot_testing.md
- references/instrumented_testing.md
- references/room_migration_testing.md
- references/test_architecture.md
- references/ci_testing.md
- references/test_fixtures.md
