
---
name: kotlin-coroutines-best-practices
description: Kotlin Coroutines & Flow best practices for Android and KMP projects.
user-invocable: true
---

# Kotlin Coroutines & Flow Best Practices

Cross-cutting skill — always activates alongside the project-type-specific skill.

## Hard Rules
- No GlobalScope — use scoped coroutines (viewModelScope, lifecycleScope, custom CoroutineScope).
- No blocking calls on Dispatchers.Main.
- Structured concurrency — maintain parent-child job hierarchies.
- Cooperative cancellation — check isActive in long-running loops.
- Never catch CancellationException.
- Never swallow exceptions silently.
- Inject dispatchers — no hardcoded Dispatchers.Main in shared code.
- Prefer Flow over callbacks.
- Test coroutines with TestDispatcher + runTest.

## Core Patterns
- StateFlow for UI state, SharedFlow for events.
- stateIn with WhileSubscribed(5_000) for cold-to-hot conversion.
- withContext for dispatcher switching.
- supervisorScope for isolated failure handling.
- flowOn to change upstream dispatcher.
- catch operator for upstream flow errors.
- Prefer callbackFlow over raw Channel for callback interop.

## References
- references/structured_concurrency.md
- references/error_handling.md
- references/testing.md
- references/dispatchers.md
- references/flow_types.md
- references/flow_operators.md
- references/channels.md
- references/anti_patterns.md
