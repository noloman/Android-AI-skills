# Target SDK Compliance

## Annual Requirement
- Google requires new apps to target the latest API level within ~1 year of release.
- App updates must target within ~1 year for existing apps.
- Non-compliant apps are hidden from new-device Play Store listings.

## API 31 (Android 12)
- Exported attribute required on all components with intent-filters.
- PendingIntent mutability flag required (FLAG_IMMUTABLE or FLAG_MUTABLE).
- Exact alarm permission (SCHEDULE_EXACT_ALARM) for non-alarm-clock use cases.
- Approximate location option (ACCESS_COARSE_LOCATION) alongside precise.

## API 33 (Android 13)
- POST_NOTIFICATIONS runtime permission required.
- Per-app language preferences (AppCompatDelegate.setApplicationLocales).
- READ_MEDIA_* permissions replace READ_EXTERNAL_STORAGE.
- Body sensor background permission.

## API 34 (Android 14)
- Foreground service types must be declared in manifest.
- Implicit intent restrictions — must specify package for most intents.
- Must register for RECEIVER_EXPORTED or RECEIVER_NOT_EXPORTED on dynamic receivers.
- Photo/video partial access (READ_MEDIA_VISUAL_USER_SELECTED).

## Compatibility Framework
- Use Developer Options > App Compatibility Changes to test API behavior changes.
- Toggle individual changes on/off for targeted testing.
- Test critical flows with the target SDK's default enforcement enabled.
