# Release Checklist

## Pre-Build
- Increment versionCode (must be unique, strictly increasing).
- Update versionName to match release semantics.
- Verify release signing configuration is correct.
- Ensure debuggable = false in release buildType.
- Confirm minifyEnabled = true and shrinkResources = true.

## Build & Test
- Build release AAB (not APK).
- Test the release build on a real device — R8 can break reflection-based code.
- Run instrumented tests against release build variant.
- Verify ProGuard/R8 mapping.txt is generated.
- Check app size — compare against previous release and size budget.
- Verify edge-to-edge UI — test content doesn't overlap system bars (status bar, navigation bar).

## Play Console Preparation
- Upload mapping.txt for crash symbolication.
- Upload native debug symbols if using NDK.
- Update Data Safety section if data practices changed.
- Write release notes — describe user-facing changes.
- Update screenshots and store listing if UI changed.
- Verify Play Integrity API integration if using device attestation.

## Staged Rollout
- Start with 5–10% rollout for the first 24–48 hours.
- Monitor Android Vitals: crash rate, ANR rate, excessive wakeups.
- Monitor user feedback and reviews during rollout.
- Target crash-free rate ≥ 99.5% before expanding.
- Expand progressively: 10% → 25% → 50% → 100%.

## Rollback Plan
- Keep the previous version available for immediate re-release.
- Use Play Console "Halt rollout" to stop a bad release.
- If critical issues found, prepare a hotfix and restart staged rollout.
- Document post-mortem for any production incidents.

## Post-Release
- Verify in-app update prompts work (if using Play In-App Updates API).
- Monitor crash-free rate for 48 hours post-100% rollout.
- Archive release branch and tag in version control.
