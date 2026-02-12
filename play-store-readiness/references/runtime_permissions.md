# Runtime Permissions

## Request Flow
- Use registerForActivityResult(RequestPermission()) or RequestMultiplePermissions().
- Call checkSelfPermission() before requesting — don't re-request already granted permissions.
- Show rationale UI when shouldShowRequestPermissionRationale() returns true.
- Handle permanent denial: detect when shouldShowRequestPermissionRationale() returns false after denial, then guide user to Settings.

## Modern Permissions (API 31+)
- NEARBY_DEVICES (API 31): required for Bluetooth scanning instead of location.
- POST_NOTIFICATIONS (API 33): required before posting any notification.
- READ_MEDIA_IMAGES, READ_MEDIA_VIDEO, READ_MEDIA_AUDIO (API 33): replace READ_EXTERNAL_STORAGE.
- READ_MEDIA_VISUAL_USER_SELECTED (API 34): partial photo/video access.

## Best Practices
- Request permissions at the point of use — not at app startup.
- Explain why the permission is needed before requesting (rationale screen).
- Degrade gracefully when permission is denied — provide alternative functionality.
- Use Photo Picker (no permission required) instead of READ_MEDIA_IMAGES when possible.
- Use Scoped Storage (MediaStore, SAF) instead of broad file access.

## API 35 Permission Changes
- No new runtime permissions, but foreground service types require matching permissions declared in manifest.
- Health Connect permissions: new fine-grained health data categories.
- Background location: even stricter review process in Play Console.
- Notification permission (POST_NOTIFICATIONS): apps targeting API 35 should prompt thoughtfully — users are denial-fatigued.

## Testing
- Test all permission states: granted, denied, permanently denied.
- Test permission revocation during app usage (Settings > Apps > Permissions).
- Verify permission-dependent features work after process death and restore.
- Test on minimum and maximum target SDK to catch behavior differences.
