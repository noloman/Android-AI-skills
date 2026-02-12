# Battery Optimization

## Doze Mode
- Doze restricts network, alarms, and JobScheduler when the device is idle.
- App Standby buckets further throttle infrequently-used apps.
- Use WorkManager — it respects Doze constraints automatically.
- Avoid requesting ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS unless absolutely necessary.

## Network
- Batch network requests — avoid frequent small requests.
- Use WorkManager with NetworkType.CONNECTED constraint for deferrable uploads.
- Prefetch data intelligently — predict user needs without over-fetching.
- Compress payloads — smaller transfers use less radio time.

## Alarms
- Prefer setInexactRepeating() over setExact() — allows system batching.
- Use setExactAndAllowWhileIdle() only for user-visible alarms (e.g., alarm clock).
- Avoid setRepeating() with short intervals — minimum effective period is ~1 minute.
- Add jitter to periodic network requests to avoid thundering herd.

## Location
- Use FusedLocationProviderClient — optimizes power across GPS, WiFi, and cell.
- Request lowest acceptable accuracy (PRIORITY_BALANCED_POWER_ACCURACY for most use cases).
- Remove location updates when not needed (removeLocationUpdates).
- Use geofencing for location-triggered actions instead of continuous polling.

## WakeLock Anti-Patterns
- Never acquire a WakeLock without a timeout: acquire(timeout).
- Always release in a finally block.
- Prefer WorkManager foreground service over raw WakeLock.
- Monitor with Battery Historian for unexpected wakelocks.
