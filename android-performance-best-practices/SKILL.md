
---
name: android-performance-best-practices
description: Android performance best practices — startup, memory, battery, app size, Baseline Profiles.
user-invocable: true
---

# Android Performance Best Practices

Cross-cutting skill — always activates alongside the project-type-specific skill.

## Hard Rules
- TTID (Time To Initial Display) < 2 seconds.
- TTFD (Time To Full Display) < 4 seconds.
- No heavy initialization on the main thread during Application.onCreate() or Activity.onCreate().
- Use App Startup library instead of ContentProvider-based init.
- Generate and ship Baseline Profiles for critical user journeys.
- No static references to Activity or Context — causes memory leaks.
- Enable StrictMode in debug builds.
- Enable R8 + shrinkResources for release builds.
- Use WebP for raster assets, vector drawables where possible.
- Batch network requests to respect Doze mode.

## Core Patterns
- Call reportFullyDrawn() when content is ready.
- Defer non-critical init with lazy or background threads.
- Use Macrobenchmark for startup and scroll performance measurement.
- Monitor memory with LeakCanary in debug builds.
- Use Android Vitals / Firebase Performance for production monitoring.
- Prefer WindowInsets over deprecated system UI flags.

## References
- references/app_startup.md
- references/baseline_profiles.md
- references/memory_management.md
- references/battery_optimization.md
- references/strict_mode.md
- references/app_size.md
- references/compose_performance.md
- references/tracing.md
