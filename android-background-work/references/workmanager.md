# WorkManager

## Request Types
- OneTimeWorkRequest: single execution, optionally expedited.
- PeriodicWorkRequest: repeating work with minimum interval of 15 minutes.
- Periodic work has a flex window — work runs within [interval - flex, interval].

## Constraints
- NetworkType: CONNECTED, UNMETERED, METERED, NOT_ROAMING.
- requiresCharging(): run only when device is charging.
- requiresStorageNotLow(): run only when storage is sufficient.
- requiresBatteryNotLow(): run only when battery is adequate.
- Combine constraints: Constraints.Builder().setRequiredNetworkType(CONNECTED).setRequiresCharging(true).

## Work Policies
- ExistingWorkPolicy.KEEP: skip if existing work with same unique name is running.
- ExistingWorkPolicy.REPLACE: cancel existing work and start new.
- ExistingWorkPolicy.APPEND: chain after existing work completes.
- Use enqueueUniqueWork() with a descriptive unique name.

## Chaining
- then(): sequential execution — output of one feeds into next.
- WorkManager.getInstance().beginWith(a, b).then(c): a and b run in parallel, then c.
- Pass data via Data objects (key-value, max 10KB).
- Use inputMerger for combining outputs from parallel work.

## Retry
- BackoffPolicy.LINEAR or BackoffPolicy.EXPONENTIAL.
- Minimum backoff delay: 10 seconds, maximum: 5 hours.
- Return Result.retry() from doWork() to trigger retry.

## Observation
- Observe WorkInfo via LiveData or Flow: getWorkInfoByIdFlow(workId).
- Check state: ENQUEUED, RUNNING, SUCCEEDED, FAILED, BLOCKED, CANCELLED.
- Use tags for querying groups of work: getWorkInfosByTagFlow("sync").

## Hilt Integration
- Use @HiltWorker annotation on Worker class.
- Inject dependencies via @AssistedInject constructor.
- @Assisted for workerParams: Context and WorkerParameters.
- Register HiltWorkerFactory in Application.

## WorkManager 2.9+ Features
- **Flow-based observation**: `getWorkInfoByIdFlow(id)` — native Kotlin Flow support.
- **Improved diagnostics**: `WorkManager.getInstance(context).getWorkInfosByTag("tag")` with detailed state.
- **Foreground service type**: specify foreground service type for long-running workers.
- `setForeground(ForegroundInfo(id, notification, FOREGROUND_SERVICE_TYPE_DATA_SYNC))`.

## Expedited Work
- `setExpedited(OutOfQuotaPolicy.RUN_AS_NON_EXPEDITED_WORK_REQUEST)` for urgent tasks.
- Expedited work has higher priority — runs sooner, less affected by Doze.
- Quota system limits expedited work — excess falls back to regular scheduling.
- Use for: important sync after user action, time-sensitive processing.
- NOT a replacement for foreground services — still subject to system constraints.
