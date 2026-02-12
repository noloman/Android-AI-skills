# Notifications

## Notification Channels (API 26+)
- Create channels in Application.onCreate() — must exist before posting notifications.
- Each channel has: id, name, importance level, optional description.
- Importance levels: IMPORTANCE_HIGH (sound + popup), IMPORTANCE_DEFAULT (sound), IMPORTANCE_LOW (no sound), IMPORTANCE_MIN (no sound or visual).
- Users can customize per channel — respect their settings.
- Don't create too many channels — group by user-facing feature.

## POST_NOTIFICATIONS Permission (API 33+)
- Request android.permission.POST_NOTIFICATIONS before posting.
- Without permission, notifications are silently dropped.
- Time the request: after user understands value, not at app startup.
- Handle denial gracefully — app should still function.

## Building Notifications
- Use NotificationCompat.Builder for backward compatibility.
- Required: setSmallIcon(), setContentTitle(), setContentText().
- Set PendingIntent with FLAG_IMMUTABLE for tap action.
- Use setAutoCancel(true) to dismiss on tap.

## Styles
- BigTextStyle: expandable text content.
- BigPictureStyle: large image preview.
- InboxStyle: multi-line list format.
- MessagingStyle: chat conversation format (required for messaging apps).
- Use appropriate style — improves user experience and system ranking.

## Actions & Grouping
- Add up to 3 notification actions with addAction().
- Use PendingIntent with FLAG_IMMUTABLE for each action.
- Group related notifications: setGroup("group_key").
- Provide a group summary notification for the bundle.
- Use direct reply action for messaging-style notifications.
