# Geofencing

## Setup
- Use GeofencingClient from play-services-location.
- Requires ACCESS_FINE_LOCATION (and ACCESS_BACKGROUND_LOCATION for background).
- Maximum 100 geofences per app per device.
- Geofences are lost on reboot — re-register in BOOT_COMPLETED receiver.

## Creating Geofences
- Geofence.Builder() with requestId, circularRegion(lat, lng, radius), expirationDuration.
- Transition types: GEOFENCE_TRANSITION_ENTER, EXIT, DWELL.
- setLoiteringDelay() for DWELL transitions — how long user must stay.
- Minimum reliable radius: ~100m (smaller radii are unreliable).
- Use unique requestId for each geofence — needed for removal.

## Registering
- Build GeofencingRequest with addGeofences() and initial trigger.
- INITIAL_TRIGGER_ENTER: trigger if already inside geofence.
- INITIAL_TRIGGER_DWELL: trigger if already dwelling.
- Register with addGeofences(request, pendingIntent).
- PendingIntent delivers to BroadcastReceiver or Service.

## Handling Transitions
- Create a BroadcastReceiver to handle geofence events.
- Extract GeofencingEvent from Intent: GeofencingEvent.fromIntent(intent).
- Check for errors: geofencingEvent.hasError().
- Get transition type and triggering geofences from the event.
- Post notification or trigger WorkManager task on transition.

## Best Practices
- Use geofencing instead of continuous location polling — much lower power.
- Keep radius ≥ 100m for reliable detection.
- Handle Geofence expiration — re-register if long-lived.
- Test with mock locations — real geofence testing is slow.
- Handle permission denial — geofencing requires background location for useful behavior.
- Re-register geofences on app update and device reboot.
