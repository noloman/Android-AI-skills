# Google Maps SDK

## Setup
- Add com.google.android.gms:play-services-maps dependency.
- Add API key in AndroidManifest.xml: <meta-data android:name="com.google.android.geo.API_KEY" android:value="${MAPS_API_KEY}" />.
- Inject API key from local.properties or CI secrets via Secrets Gradle Plugin.
- Restrict API key in Google Cloud Console: Android app restriction + Maps SDK API restriction.

## Maps Compose
- Use maps-compose library for Compose integration.
- GoogleMap composable with CameraPositionState.
- Marker(state = MarkerState(position = latLng), title = "Label").
- rememberCameraPositionState for controlling camera position.
- Use MapProperties for map type, gestures, and controls.

## Markers
- Use Marker composable for individual points.
- MarkerState for position — can be animated.
- Custom marker icons: BitmapDescriptorFactory.fromResource or fromBitmap.
- Use clustering for dense marker sets: maps-utils library + Clustering composable.
- InfoWindow for tap-to-reveal details on markers.

## Camera Control
- CameraUpdateFactory.newLatLngZoom(position, zoom) for programmatic movement.
- Animate: cameraPositionState.animate(cameraUpdate, durationMs).
- Set bounds: CameraUpdateFactory.newLatLngBounds(bounds, padding) to fit all markers.
- Handle camera move events: onCameraMove callback.

## Styling
- Use MapStyleOptions for custom map styling (JSON style).
- Cloud-based map styling for dynamic style updates.
- Dark mode: apply dark map style when app is in dark theme.
- Hide/show map features: POIs, transit, roads, labels.

## Best Practices
- Load map lazily — don't initialize until the map screen is visible.
- Handle Google Play Services unavailability gracefully.
- Set initial camera position from user's last known location.
- Test on devices without Google Play Services (Huawei, etc.) — provide fallback.
