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

## API 35 (Android 15)
- Edge-to-edge is mandatory — apps draw behind system bars by default, no opt-out.
- Private Space: users can create a separate space for sensitive apps — handle account separation.
- Foreground service restrictions tightened: `dataSync` type limited to 6 hours, `mediaProcessing` to 6 hours.
- New foreground service types: `mediaProcessing` added.
- 16KB page size support required for native code (NDK) — rebuild .so libraries with 16KB alignment.
- Minimum target SDK for install: API 24 — apps targeting below 24 cannot be installed on Android 15 devices.
- Package visibility restrictions expanded.
- Health Connect integration: new health data categories and granular permissions.

## Compatibility Framework
- Use Developer Options > App Compatibility Changes to test API behavior changes.
- Toggle individual changes on/off for targeted testing.
- Test critical flows with the target SDK's default enforcement enabled.
