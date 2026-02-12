# Session Security

## Session Management
- Define session lifetime based on app sensitivity (banking: 15 min, social: 30 days).
- Track last-active timestamp — expire session after inactivity period.
- Store session state in EncryptedSharedPreferences.
- Clear session on logout: tokens, cached data, navigation state.

## Re-Authentication
- Require re-auth for sensitive operations: password change, payment, account deletion.
- Use BiometricPrompt for seamless re-auth (if biometrics enrolled).
- Fall back to full credential entry if biometrics fail.
- Server should enforce re-auth — don't rely solely on client-side checks.

## Device Binding
- Use Android Keystore to generate device-bound keys.
- Include device attestation in auth flow for high-security apps.
- Detect device change: invalidate sessions when device fingerprint changes.
- Use Play Integrity API for device integrity verification.

## Secure Logout
- Clear all tokens (access, refresh, ID) from secure storage.
- Clear Credential Manager state: clearCredentialState().
- Revoke tokens server-side — prevent reuse.
- Clear WebView cookies if using web-based auth.
- Navigate to login screen and clear back stack.

## Attack Mitigation
- Token fixation: always issue new tokens on successful auth.
- Session hijacking: bind sessions to device/IP when feasible.
- Brute force: implement account lockout after N failed attempts (server-side).
- Replay attacks: use nonces in authentication challenges.
- Man-in-the-middle: enforce certificate pinning for auth endpoints.

## Play Integrity for Session Security
- Use Play Integrity API verdicts to assess session trust level.
- High-risk verdicts: require re-authentication or step-up verification.
- Low-risk sessions: allow longer session lifetime and fewer re-auth prompts.
- Bind session token to device integrity verdict — invalidate on verdict change.
- Don't block all unrecognized devices — many legitimate users have non-standard setups.
