
---
name: firebase-best-practices
description: Firebase integration — Auth, Firestore, Crashlytics, Remote Config, FCM, Analytics.
user-invocable: true
---

# Firebase Best Practices

Cross-cutting skill — always activates alongside the project-type-specific skill.

## Hard Rules
- Use Firebase BoM for consistent library versions.
- Never expose Firebase Admin SDK credentials in client code.
- Write Firestore security rules before going to production — default deny.
- Do not log PII or sensitive data to Crashlytics.
- Respect user consent before enabling Analytics data collection.
- Always handle FirebaseAuth token refresh — tokens expire after 1 hour.
- Use google-services.json per build variant (debug/release/staging).
- Never store Firestore documents larger than 1 MB.
- Rate-limit Remote Config fetches — minimum 12-hour interval in production.
- Handle FCM token rotation — re-register on onNewToken.
- Use FCM HTTP v1 API only — legacy FCM server API was sunset June 2024.
- Implement Google Consent Mode V2 before collecting analytics in the EU (mandatory since March 2024).

## Core Patterns
- Initialize Firebase in Application.onCreate() or use App Startup library.
- Use Firebase Auth with Credential Manager for modern sign-in flows.
- Structure Firestore for read patterns — denormalize over normalize.
- Use Crashlytics custom keys and breadcrumbs for debugging context.
- Wrap Firebase APIs in repository interfaces for testability.
- Use Firebase Emulator Suite for local development and testing.

## References
- references/firebase_auth.md
- references/firestore.md
- references/crashlytics.md
- references/remote_config.md
- references/cloud_messaging.md
- references/analytics.md
