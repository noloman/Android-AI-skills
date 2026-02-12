# Firebase Analytics

## Setup
- Add firebase-analytics via Firebase BoM.
- Analytics auto-collects: first_open, session_start, app_update, os_update, etc.
- Disable auto-collection if consent is required: setAnalyticsCollectionEnabled(false).
- Enable after consent: setAnalyticsCollectionEnabled(true).
- Analytics data appears in Firebase Console with ~24-hour delay (not real-time).

## Custom Events
- Log custom events: logEvent("purchase_completed", bundle).
- Use predefined event names where possible (FirebaseAnalytics.Event.*).
- Bundle parameters: up to 25 custom parameters per event.
- Parameter names: up to 40 characters, values: up to 100 characters.
- Avoid high-cardinality parameters (user IDs, timestamps) — use user properties instead.

## User Properties
- Set user properties: setUserProperty("subscription_tier", "premium").
- Up to 25 custom user properties per project.
- Use for audience segmentation, not per-event data.
- User properties persist until changed or user resets.
- Predefined properties: age, gender, interest (auto-collected if enabled).

## Consent & Privacy
- Implement consent mode: setConsent(ConsentMap) for GDPR/CCPA compliance.
- Consent types: ANALYTICS_STORAGE, AD_STORAGE, AD_USER_DATA, AD_PERSONALIZATION.
- Without consent: analytics collects pings without identifiers (cookieless mode).
- Never log PII as event parameters or user properties.
- Provide opt-out mechanism in app settings.

## Best Practices
- Define an event taxonomy before implementation — consistency matters.
- Use DebugView in Firebase Console for real-time event validation.
- Enable debug mode: adb shell setprop debug.firebase.analytics.app <package>.
- Link to BigQuery for raw event export and advanced analysis.
- Review automatically collected events — disable unwanted ones if needed.

## Consent Mode V2 (Mandatory EU — March 2024)
- Consent Mode V2 adds two new signals: `AD_USER_DATA` and `AD_PERSONALIZATION`.
- Required for EU user data sent to Google services (Analytics, Ads).
- Implementation: `setConsent(mapOf(ConsentType.AD_USER_DATA to ConsentStatus.GRANTED, ...))`.
- Four consent types: `ANALYTICS_STORAGE`, `AD_STORAGE`, `AD_USER_DATA`, `AD_PERSONALIZATION`.
- Without consent: Google uses cookieless pings — modeling fills data gaps.
- Integrate with your Consent Management Platform (CMP) — update consent on user choice change.
- Test consent states: all granted, all denied, mixed (analytics yes, ads no).
