
---
name: play-store-readiness
description: Play Store compliance — Data Safety, permissions, target SDK, signing, release process.
user-invocable: true
---

# Play Store Readiness

Cross-cutting skill — always activates alongside the project-type-specific skill.

## Hard Rules
- Data Safety section must accurately match actual SDK data collection behavior.
- Request runtime permissions at the point of use with a rationale UI.
- Handle permanent permission denial gracefully (direct user to Settings).
- Meet Google's annual target SDK minimum requirement.
- Enroll in Play App Signing — use a separate upload key.
- Ship AAB (Android App Bundle), not APK.
- Use staged rollout (5–10%) for all production releases.
- Monitor crash-free rate — target ≥ 99.5% (Google Play's "bad behavior" threshold is 99%).
- Never ship release builds with debuggable=true.
- Increment versionCode on every release.

## Core Patterns
- Audit all third-party SDKs for data collection before publishing.
- Use Photo Picker and Scoped Storage instead of broad storage permissions.
- Test against the compatibility framework for new target SDK behavior.
- Upload mapping.txt (R8) and native symbols for crash symbolication.
- Write release notes for every staged rollout.
- Have a rollback plan before every release.
- Target API 35 (Android 15) for new apps — edge-to-edge is mandatory, foreground service restrictions tightened.

## References
- references/data_safety.md
- references/runtime_permissions.md
- references/target_sdk_compliance.md
- references/app_signing.md
- references/release_checklist.md
