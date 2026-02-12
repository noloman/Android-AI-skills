# Location Permissions

## Permission Types
- ACCESS_COARSE_LOCATION: approximate location (~1-3 km), network-based.
- ACCESS_FINE_LOCATION: precise location (~1-100m), GPS + network.
- ACCESS_BACKGROUND_LOCATION: location access when app is not in foreground.
- Request FINE + COARSE together — system shows "Precise" / "Approximate" toggle (API 31+).

## Request Strategy
- Request at the point of use — not at app startup.
- Show rationale before requesting: explain why location is needed.
- Handle denial: provide alternative (manual address entry, zip code).
- Handle permanent denial: guide user to Settings with an explanation.
- Check shouldShowRequestPermissionRationale() to detect permanent denial.

## Background Location
- Requires separate permission request — cannot be bundled with foreground location.
- Request foreground location first, then background location in a separate step.
- Play Store requires justification for background location access.
- Must declare foreground service with location type for background access (API 29+).
- Minimize background location use — alternatives: geofencing, significant motion.

## API 31+ Behavior
- User can grant approximate OR precise location — previously only precise.
- App should handle approximate location gracefully — don't require precise.
- UX: show "approximate" indicator if only coarse location is granted.
- Request upgrade to precise location only when needed (e.g., navigation).

## Testing
- Test all permission states: not requested, granted (fine), granted (coarse only), denied, permanently denied.
- Test permission revocation while app is running.
- Test on API 31+ for approximate/precise distinction.
- Use mock locations for reproducible testing.
- Verify background location behavior with app in background and device in Doze.
