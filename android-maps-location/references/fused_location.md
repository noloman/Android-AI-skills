# Fused Location Provider

## Setup
- Use com.google.android.gms:play-services-location dependency.
- Get client: LocationServices.getFusedLocationProviderClient(context).
- Requires ACCESS_FINE_LOCATION or ACCESS_COARSE_LOCATION permission.
- Check permission before every location request.

## Last Known Location
- getLastLocation(): fast, no power cost, may return null.
- Returns null if: location turned off, device just booted, Google Play Services data cleared.
- Use as initial location while waiting for fresh updates.
- Always handle null — don't assume location is available.

## Location Updates
- Build LocationRequest with Priority and interval.
- PRIORITY_HIGH_ACCURACY: GPS + network (most power, ~1m accuracy).
- PRIORITY_BALANCED_POWER_ACCURACY: network-based (~100m, lower power).
- PRIORITY_LOW_POWER: passive, minimal power (~1km accuracy).
- PRIORITY_PASSIVE: only receive locations from other apps' requests.

## Request Configuration
- setIntervalMillis: desired update interval.
- setMinUpdateIntervalMillis: fastest acceptable interval.
- setMaxUpdateDelayMillis: batch delivery delay for power saving.
- setMinUpdateDistanceMeters: minimum displacement for update.
- Use setWaitForAccurateLocation(true) for initial high-accuracy fix.

## Receiving Updates
- requestLocationUpdates(request, callback, looper) for callback-based.
- requestLocationUpdates(request, pendingIntent) for background delivery.
- Always call removeLocationUpdates() when done.
- Use callbackFlow for coroutine/Flow integration.

## Best Practices
- Request lowest acceptable priority — save battery.
- Remove updates in onPause/onStop — unless background location is needed.
- Background location requires foreground service with location type (API 29+).
- ACCESS_BACKGROUND_LOCATION is a separate permission request.
- Handle location settings: use SettingsClient.checkLocationSettings() and prompt user.
