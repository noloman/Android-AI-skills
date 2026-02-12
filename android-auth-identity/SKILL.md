
---
name: android-auth-identity
description: Authentication & identity — Credential Manager, biometrics, token management, session security.
user-invocable: true
---

# Android Authentication & Identity

Cross-cutting skill — always activates alongside the project-type-specific skill.

## Hard Rules
- Use Credential Manager API for sign-in flows — replaces legacy Smart Lock and FIDO2 APIs.
- Store tokens in EncryptedSharedPreferences or Android Keystore — never in plain SharedPreferences.
- Implement token refresh transparently — user should not see expired-token errors.
- Use BiometricPrompt from androidx.biometric — not deprecated FingerprintManager.
- Require BIOMETRIC_STRONG for sensitive operations (payments, account changes).
- Never store raw passwords on device — use credential management APIs.
- Validate all tokens server-side — client-side validation alone is insufficient.
- Handle account linking carefully — merge conflicts can lose user data.
- Clear all credentials on logout — tokens, cookies, cached user data.
- Support passkeys (WebAuthn) as the primary passwordless credential.

## Core Patterns
- Single AuthRepository abstraction over Credential Manager + token storage.
- Refresh tokens in OkHttp Authenticator — seamless for all API calls.
- Biometric-bound keys for sensitive operations (CryptoObject in BiometricPrompt).
- Use ID tokens (JWT) for user identity, access tokens for API authorization.
- Implement session timeout — re-authenticate after inactivity period.
- Wrap auth state in StateFlow for reactive UI updates.

## References
- references/credential_manager.md
- references/biometric_auth.md
- references/token_management.md
- references/google_sign_in.md
- references/session_security.md
- references/digital_credentials.md
