# Compose Review Checklist

## Pre-flight
- Mixed material.* and material3.* imports? -> BLOCKER
- MaterialTheme from material3?

## Architecture
- Stateless composables?
- State hoisted?
- Immutable UI state?

## Flows & Coroutines
- StateFlow for UI state?
- SharedFlow for one-off events?
- stateIn with WhileSubscribed?
- Lifecycle-aware collection?

## Side-effects
- Correct keys?
- No suspend in composition?

## Lists
- Stable keys?
- Allocations in item lambda?
