# Play Integrity API

## Overview
- Play Integrity replaces SafetyNet Attestation (deprecated, shut down June 2024).
- Provides three verdict types: device integrity, app integrity, account integrity.
- Use for: anti-fraud, cheating prevention, premium content protection, account security.

## Verdict Types
- **Device Integrity**: `MEETS_DEVICE_INTEGRITY` (genuine device), `MEETS_BASIC_INTEGRITY` (may be rooted/emulator), empty (high risk).
- **App Integrity**: `PLAY_RECOGNIZED` (installed from Play Store), `UNRECOGNIZED_VERSION`, `UNEVALUATED`.
- **Account Integrity**: `LICENSED` (user has Play license for app), `UNLICENSED`, `UNEVALUATED`.

## Integration
- Add `com.google.android.play:integrity` dependency.
- Request integrity token: `IntegrityManager.requestIntegrityToken(request)`.
- Send token to your server — never verify on client side.
- Server decrypts and verifies token via Play Integrity API: `playintegrity.decodeIntegrityToken`.
- Token is single-use — request a new token for each verification.

## Server-Side Verification
- Decrypt integrity token using your Google Cloud service account.
- Verify the `requestDetails.nonce` matches what your client sent.
- Check `appIntegrity.appRecognitionVerdict` and `deviceIntegrity.deviceRecognitionVerdict`.
- Decide enforcement based on verdict combination — not just device integrity.
- Log verdicts for monitoring and fraud pattern detection.

## Migration from SafetyNet
- SafetyNet Attestation: `SafetyNet.getClient().attest()` → Play Integrity: `IntegrityManager.requestIntegrityToken()`.
- SafetyNet response fields map to Play Integrity verdicts.
- Server-side: replace SafetyNet verification endpoint with Play Integrity decryption.
- Test thoroughly — Play Integrity may return different verdicts than SafetyNet for same devices.

## Best Practices
- Cache verdicts for a reasonable period — don't request on every action.
- Implement tiered enforcement: allow basic integrity, restrict no integrity.
- Do NOT block rooted devices unconditionally — legitimate users root for development.
- Handle API errors gracefully — Play Integrity depends on Play Services.
- Rate limits apply — batch critical checks, don't request on every screen load.
