# Deep Links

## Types
- Custom URI schemes: myapp://profile/123 — simple but not unique across apps.
- Web Links: https://example.com/profile/123 — opens browser or app (user chooses).
- App Links: https://example.com/profile/123 — verified ownership, opens app directly (API 23+).
- Prefer App Links for production — custom schemes for development/testing.

## Intent Filter Configuration
```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" android:host="example.com" android:pathPrefix="/profile" />
</intent-filter>
```

## Navigation Compose Integration
- Define deep links in NavHost: composable("profile/{id}", deepLinks = listOf(navDeepLink { uriPattern = "https://example.com/profile/{id}" })).
- Navigation library handles intent parsing automatically.
- Access arguments via NavBackStackEntry.arguments or SavedStateHandle.

## Testing
- Test with adb: adb shell am start -a android.intent.action.VIEW -d "https://example.com/profile/123".
- Verify correct destination opens with expected arguments.
- Test missing/malformed parameters — ensure graceful fallback.
- Test deep link when app is cold-started vs already running.

## Best Practices
- Handle missing parameters gracefully — show error or navigate to default screen.
- Track deep link entries in analytics — understand user acquisition paths.
- Validate deep link data before processing — treat as untrusted input.
- Define deep links centrally — avoid scattered intent-filter declarations.
