# Foreground Services

## Service Types (API 34+)
- Must declare foreground service type in AndroidManifest.xml.
- Types: dataSync, camera, connectedDevice, health, location, mediaPlayback, mediaProjection, microphone, phoneCall, remoteMessaging, shortService, specialUse, systemExempted.
- Declare in manifest: android:foregroundServiceType="location|dataSync".
- Pass type when starting: ServiceCompat.startForeground(service, id, notification, FOREGROUND_SERVICE_TYPE_LOCATION).

## Permissions
- Declare <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />.
- API 34+: also declare <uses-permission android:name="android.permission.FOREGROUND_SERVICE_LOCATION" /> (per type).
- Some types require runtime permissions (location, camera, microphone).

## Notification Requirement
- Foreground services must display a persistent notification.
- Call startForeground(notificationId, notification) within 5 seconds of service start.
- Notification cannot be dismissed by the user while service is running.
- Use a meaningful notification — explain what the service is doing.

## Lifecycle
- Start with Context.startForegroundService() (API 26+).
- Call startForeground() immediately in onCreate() or onStartCommand().
- Stop when work completes: stopForeground(STOP_FOREGROUND_REMOVE) + stopSelf().
- Do not leave foreground services running indefinitely — system may restrict.

## Short-Lived Services
- shortService type: for tasks that complete in under ~3 minutes.
- System may stop shortService after the timeout.
- Use for: quick uploads, brief processing, transient operations.
- Prefer WorkManager expedited work over short foreground services when possible.

## API 35 Restrictions
- `dataSync` foreground service type: limited to 6 hours of continuous execution.
- `mediaProcessing` type: limited to 6 hours (new type in API 35).
- System stops services exceeding the time limit — must handle gracefully.
- For work exceeding time limits: break into chunks and use WorkManager.
- `location`, `mediaPlayback`, `camera`, `microphone` types: no time limit.

## IntentService Migration
- `IntentService` is deprecated — use WorkManager or CoroutineWorker instead.
- IntentService limitations: no lifecycle awareness, no guaranteed execution, no constraints.
- Migration: replace IntentService with `OneTimeWorkRequest` + `CoroutineWorker`.
- For immediate work: use coroutines in ViewModel or foreground service.
