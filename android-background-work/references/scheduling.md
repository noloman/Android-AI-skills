# Scheduling

## AlarmManager
- Use setInexactRepeating() for periodic tasks — allows system batching.
- Use setExactAndAllowWhileIdle() only for user-visible alarms (alarm clock, reminders).
- Use setExact() when exact timing matters but Doze exemption isn't needed.
- SCHEDULE_EXACT_ALARM permission required (API 31+) for exact alarms.
- User can revoke exact alarm permission — check with canScheduleExactAlarms().

## Alarm Delivery
- Use BroadcastReceiver as the alarm target.
- PendingIntent with FLAG_IMMUTABLE for the alarm PendingIntent.
- Alarms are lost on reboot — re-schedule in BOOT_COMPLETED receiver.
- Use AlarmManager.AlarmClockInfo for user-visible alarm clock features.

## Doze & Standby Implications
- Doze defers alarms, network, and jobs when device is idle.
- setAndAllowWhileIdle(): fires during Doze but with rate limiting (~1 per 9 min).
- setExactAndAllowWhileIdle(): exact timing during Doze, also rate-limited.
- App Standby buckets throttle alarms for infrequently-used apps.

## Network Scheduling
- Add jitter to periodic network requests — avoid thundering herd on server.
- Use WorkManager with network constraint instead of AlarmManager for network tasks.
- Batch multiple network operations into a single work request.

## Migration from JobScheduler
- JobScheduler is lower-level — use WorkManager as the recommended wrapper.
- WorkManager handles backward compatibility, constraints, and chaining.
- Migrate JobService implementations to Worker/CoroutineWorker.
- WorkManager supports all JobScheduler constraints plus more.
