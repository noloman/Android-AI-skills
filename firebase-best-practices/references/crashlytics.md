# Crashlytics

## Setup
- Add firebase-crashlytics and the Crashlytics Gradle plugin.
- Crashlytics auto-collects crashes — no additional initialization needed.
- Upload mapping.txt automatically with the Gradle plugin: mappingFileUploadEnabled = true.
- Disable during development: FirebaseCrashlytics.getInstance().setCrashlyticsCollectionEnabled(false).

## Custom Keys & Logs
- Set custom keys for debugging context: setCustomKey("screen", "checkout").
- Keys are key-value pairs — max 64 key-value pairs per crash.
- Use log() for breadcrumbs: log("User tapped checkout button").
- Logs are circular buffer — most recent ~64KB retained per crash.
- Set user ID: setUserId(userId) — helps track user-specific issues.

## Non-Fatal Errors
- Record non-fatal exceptions: recordException(exception).
- Wrap try-catch blocks with recordException for error tracking.
- Use custom Exception subclasses for categorization.
- Non-fatals appear separately from crashes in Crashlytics dashboard.
- Track API errors, parsing failures, and degraded states as non-fatals.

## Privacy
- Never log PII (emails, phone numbers, passwords) in keys or logs.
- Use opaque user IDs — not emails or real names.
- Respect opt-out: check user consent before enabling collection.
- GDPR: provide mechanism to delete crash data associated with a user.
- Anonymize crash data if required by privacy regulations.

## Debugging
- Force a test crash: throw RuntimeException("Test Crashlytics").
- Crashes appear in Firebase Console within ~5 minutes.
- Check for mapping.txt upload in build logs — unsymbolicated crashes are useless.
- Use BigQuery export for advanced crash analytics.
- Monitor crash-free rate — target ≥ 99.5% for healthy apps.
