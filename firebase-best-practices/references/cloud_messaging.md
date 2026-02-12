# Cloud Messaging (FCM)

## FCM HTTP v1 API (Required)
- The legacy FCM server API was sunset June 2024 — migrate all server code to HTTP v1.
- Endpoint: `https://fcm.googleapis.com/v1/projects/{project}/messages:send`.
- Uses OAuth 2.0 access tokens (from service account) instead of server keys.
- Supports platform-specific message customization (android, apns, webpush blocks).
- Message format uses structured JSON — not the legacy flat key/value format.
- Token-based targeting replaces legacy registration IDs.
- Admin SDK (Node.js, Python, Java, Go) handles v1 API automatically.

## Token Management
- FCM token is generated on first app start — unique per app instance.
- Override onNewToken() in FirebaseMessagingService — send new token to your server.
- Token can change: app data cleared, app restored on new device, token refresh.
- Store token on your server linked to the user account.
- Retrieve current token: FirebaseMessaging.getInstance().token.

## Message Types
- Notification messages: display handled by system when app is in background.
- Data messages: always delivered to onMessageReceived() — app handles display.
- Notification + data: system displays notification in background, onMessageReceived in foreground.
- Prefer data messages for full control over notification display.
- Maximum payload size: 4 KB.

## Priority
- High priority: wake device from Doze, deliver immediately — use for user-visible notifications only.
- Normal priority: delivered with batching, respects Doze — use for non-urgent data sync.
- Misuse of high priority can trigger FCM throttling.
- Use content-available for silent data sync (normal priority).

## Topics & Targeting
- Subscribe to topics: FirebaseMessaging.getInstance().subscribeToTopic("news").
- Send to topic from server: /topics/news — broadcast to all subscribers.
- Use conditions for topic combinations: 'news' in topics && 'premium' in topics.
- For individual targeting, use registration tokens (not topics).

## Handling
- Create NotificationChannel before posting notifications (API 26+).
- Handle notification tap: parse intent extras from the notification PendingIntent.
- Handle data messages in onMessageReceived() — runs on background thread.
- Show notification with NotificationCompat.Builder — respect user channel settings.
- Handle messages when app is killed: data messages may not be delivered.
