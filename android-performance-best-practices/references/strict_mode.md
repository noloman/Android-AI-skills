# StrictMode

## ThreadPolicy
- Detects disk reads/writes on the main thread.
- Detects network calls on the main thread.
- Detects custom slow calls (StrictMode.noteSlowCall).
- Enable in Application.onCreate() for debug builds only.
- Use penaltyLog() during development, penaltyDeath() for strict enforcement.

## VmPolicy
- Detects leaked Activity instances.
- Detects leaked SQLite cursors and closeable objects.
- Detects file URI exposure (API 18+).
- Detects untagged network sockets (API 26+).
- Use detectAll() or be selective with detectLeakedClosableObjects(), detectActivityLeaks(), etc.

## Setup
```kotlin
if (BuildConfig.DEBUG) {
    StrictMode.setThreadPolicy(
        StrictMode.ThreadPolicy.Builder()
            .detectAll()
            .penaltyLog()
            .build()
    )
    StrictMode.setVmPolicy(
        StrictMode.VmPolicy.Builder()
            .detectAll()
            .penaltyLog()
            .build()
    )
}
```

## Common Violations
- SharedPreferences.commit() blocks the main thread — use apply() instead.
- Room queries without suspend or withContext(Dispatchers.IO).
- Bitmap decoding on the main thread — use Coil/Glide async loading.

## Suppressing False Positives
- Use StrictMode.allowThreadDiskReads {} for known-safe synchronous reads.
- Framework methods sometimes trigger false disk reads — suppress selectively.
- Never disable StrictMode entirely — suppress specific known violations.
