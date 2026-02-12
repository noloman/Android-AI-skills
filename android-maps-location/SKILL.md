
---
name: android-maps-location
description: Maps & location — Google Maps SDK, FusedLocationProvider, geofencing, permissions.
user-invocable: true
---

# Android Maps & Location

Cross-cutting skill — always activates alongside the project-type-specific skill.

## Hard Rules
- Use FusedLocationProviderClient — not LocationManager directly.
- Request only the location accuracy you need (COARSE vs FINE).
- Handle both approximate (COARSE) and precise (FINE) location grants (API 31+).
- Remove location updates when not needed — do not leak location listeners.
- Use foreground service with location type for background location access.
- ACCESS_BACKGROUND_LOCATION requires separate permission request and justification.
- Protect Google Maps API key with app restriction (SHA-1 + package name) in Cloud Console.
- Do not hardcode API keys in source — use Secrets Gradle Plugin or local.properties.
- Handle location permission denial gracefully — degrade to manual location entry.
- Test with mock locations enabled and disabled.

## Core Patterns
- Request FINE + COARSE together — user can downgrade to approximate on API 31+.
- Use LocationRequest.Builder with appropriate priority and interval.
- Prefer geofencing over continuous polling for location-triggered actions.
- Use Maps Compose library for Compose integration.
- Cluster markers for dense map points — avoid rendering thousands of markers.
- Cache geocoding results — avoid repeated API calls for the same coordinates.

## References
- references/google_maps.md
- references/fused_location.md
- references/geofencing.md
- references/location_permissions.md
