# App Startup

## Metrics
- TTID (Time To Initial Display): time from app launch to first frame rendered.
- TTFD (Time To Full Display): time from app launch to all async content rendered.
- Call reportFullyDrawn() in Activity or Fragment when meaningful content is ready.
- Measure with Macrobenchmark StartupTimingMetric — covers cold, warm, and hot starts.

## App Startup Library
- Use androidx.startup.Initializer to replace ContentProvider-based init.
- Each ContentProvider adds ~2ms to startup — consolidate or replace.
- Declare initializers in AndroidManifest.xml with <meta-data> under InitializationProvider.
- Use dependencies() to control initialization order.
- Disable auto-init with tools:node="remove" for manual/lazy initialization.

## Splash Screen
- Use SplashScreen API (androidx.core.splashscreen) — not a custom Activity.
- Keep splash screen duration minimal — avoid artificial delays.
- Use setKeepOnScreenCondition for async data loading.
- Animate exit with setOnExitAnimationListener if needed.

## Anti-Patterns
- No heavy computation in Application.onCreate().
- No synchronous network or disk I/O on the main thread at startup.
- No eager initialization of large object graphs.
- Defer analytics, crash reporting, and non-critical SDKs.
