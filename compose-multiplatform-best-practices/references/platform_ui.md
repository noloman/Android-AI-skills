# Platform-Specific UI in Compose Multiplatform

## expect/actual Composables
```kotlin
// commonMain
@Composable
expect fun PlatformMapView(modifier: Modifier, location: LatLng)

@Composable
expect fun PlatformVideoPlayer(modifier: Modifier, url: String)

// androidMain
@Composable
actual fun PlatformMapView(modifier: Modifier, location: LatLng) {
    AndroidView(factory = { MapView(it) }) { /* configure */ }
}

// iosMain
@Composable
actual fun PlatformMapView(modifier: Modifier, location: LatLng) {
    UIKitView(factory = { MKMapView() }) { /* configure */ }
}
```

## AndroidView / UIKitView Interop
- `AndroidView` — embed any Android View in Compose (maps, WebView, camera).
- `UIKitView` — embed any UIKit UIView in Compose on iOS.
- Always remember to handle lifecycle (create, update, dispose).
- Minimize interop surface — wrap complex platform views, expose simple Compose API.

## When to Use Platform UI
- Maps, video players, camera previews — no Compose equivalent.
- Platform-specific system UI (share sheet, file picker).
- Complex platform widgets with no multiplatform alternative.

## When NOT to Use Platform UI
- Standard UI elements (buttons, text, lists) — use shared Compose.
- Custom graphics — use Canvas API (multiplatform).
- Animations — use Compose Animation APIs (multiplatform).

## Best Practices
- Keep platform composable implementations thin — delegate layout to shared code.
- Use `Modifier` parameter for consistent sizing/positioning.
- Document platform differences in behavior (e.g., scroll physics, haptics).
