# Remote Config

## Setup
- Use FirebaseRemoteConfig.getInstance() with default settings.
- Set in-app defaults: setDefaultsAsync(R.xml.remote_config_defaults).
- Defaults are used when no values have been fetched or the fetch fails.
- Define all parameters in res/xml/remote_config_defaults.xml.

## Fetch & Activate
- fetch(): downloads latest values from Firebase — cached for minimumFetchIntervalInSeconds.
- activate(): applies fetched values to the app.
- fetchAndActivate(): convenience method combining both.
- Default minimum fetch interval: 12 hours in production.
- Development: set minimumFetchIntervalInSeconds = 0 for instant updates.

## Feature Flags
- Use boolean parameters for feature toggles: getBoolean("feature_new_checkout").
- Use string parameters for A/B test variants.
- Combine with Firebase A/B Testing for experiment-driven rollouts.
- Use conditions in Firebase Console for percentage rollouts and targeting.
- Always have sensible defaults — app must work without server values.

## Best Practices
- Fetch on app start, activate on next start (double-buffer pattern).
- Or: fetchAndActivate immediately — but handle potential mid-session changes.
- Cache frequently-accessed values locally — avoid repeated getString/getBoolean calls.
- Rate limiting: Firebase throttles excessive fetches (HTTP 429).
- Use Realtime Remote Config for instant updates when critical.

## Testing
- Use Firebase Console "test on device" feature with installation ID.
- Override values in debug builds for development.
- Test default values (no fetch), stale values (expired cache), and fresh values.
- Verify app behavior when Remote Config is unavailable (offline, rate-limited).

## Real-Time Remote Config
- Enable real-time updates: `addOnConfigUpdateListener` for instant config changes.
- Eliminates the need to wait for `fetch()` intervals — pushes changes immediately.
- Use for: kill switches, emergency feature toggles, live A/B test adjustments.
- Still falls back to fetch-and-activate for initial load and offline scenarios.
- Real-time listener fires `onUpdate` — call `activate()` to apply changes.

## Personalization
- Firebase Remote Config Personalization uses ML to optimize parameter values per user.
- Set up a goal metric (e.g., engagement, revenue) and Firebase auto-tunes values.
- Requires Google Analytics integration for the optimization signal.
- Best for: onboarding flows, content ordering, feature exposure.
- Monitor personalization performance in Firebase Console.
