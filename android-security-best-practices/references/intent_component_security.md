# Intent & Component Security

## Exported Attribute (API 31+)
- Every Activity, Service, BroadcastReceiver, and ContentProvider with intent-filters must declare android:exported explicitly.
- Set exported="false" unless the component must be accessible to other apps.
- API 31+ enforces this — missing exported attribute causes install failure.

## Custom Permissions
- Define custom permissions for sensitive components: android:permission="com.example.MY_PERMISSION".
- Use signature-level protection for inter-app communication within your apps.
- Declare permissions in the manifest, not at runtime.

## PendingIntent Security
- Always use FLAG_IMMUTABLE unless the PendingIntent must be modified by the receiver.
- Use FLAG_MUTABLE only when: fillIn() is needed, or inline reply actions require mutation.
- Specify explicit intents in PendingIntents — avoid implicit intents.
- Avoid FLAG_UPDATE_CURRENT without FLAG_IMMUTABLE — can be hijacked.

## Intent Handling
- Prefer explicit intents for internal navigation.
- Validate all extras from incoming implicit intents — treat as untrusted input.
- Use Intent.resolveActivity() before startActivity() for implicit intents.
- Never pass sensitive data via implicit intents.

## BroadcastReceiver Protection
- Register receivers with exported="false" for internal broadcasts.
- Use LocalBroadcastManager alternative: SharedFlow or EventBus for in-process events.
- For system broadcasts, specify the action explicitly.

## ContentProvider
- Set android:exported="false" unless sharing data with other apps.
- Use grantUriPermissions with FLAG_GRANT_READ_URI_PERMISSION for temporary access.
- Define readPermission and writePermission for fine-grained access control.
