
---
name: android-background-work
description: Android background work — WorkManager, foreground services, notifications, scheduling.
user-invocable: true
---

# Android Background Work

Cross-cutting skill — always activates alongside the project-type-specific skill.

## Hard Rules
- Use WorkManager for all deferrable, persistent background work.
- Declare foreground service types explicitly (API 34+ requirement).
- Use notification channels (API 26+) for all notifications.
- Never hold WakeLocks indefinitely — always release in a finally block.
- Use exact alarms only for user-visible scheduling (alarms, reminders).
- FCM high-priority messages only for user-visible notifications.
- Stop foreground services when work completes — do not leave them running.
- Request POST_NOTIFICATIONS permission (API 33+) before posting notifications.

## Core Patterns
- WorkManager with constraints (network, charging, storage) for intelligent scheduling.
- Use ExistingWorkPolicy.KEEP or REPLACE to avoid duplicate work.
- Chain work requests with then() for sequential dependencies.
- Use expedited work for urgent tasks that must run immediately.
- Prefer inexact alarms (setInexactRepeating) to save battery.
- Use Hilt @AssistedInject for WorkManager Worker injection.

## References
- references/workmanager.md
- references/foreground_services.md
- references/notifications.md
- references/scheduling.md
- references/testing_background_work.md
