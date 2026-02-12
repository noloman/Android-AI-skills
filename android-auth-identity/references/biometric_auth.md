# Biometric Authentication

## BiometricPrompt
- Use androidx.biometric.BiometricPrompt — not deprecated FingerprintManager.
- Create with BiometricPrompt(activity/fragment, executor, callback).
- Configure with BiometricPrompt.PromptInfo.Builder().
- setTitle(), setSubtitle(), setDescription() for user-facing text.
- setNegativeButtonText() for cancel action (required unless using device credential).

## Authenticator Types
- BIOMETRIC_STRONG: fingerprint, face (Class 3) — required for crypto operations.
- BIOMETRIC_WEAK: less secure biometrics (Class 2) — no crypto support.
- DEVICE_CREDENTIAL: PIN, pattern, password fallback.
- setAllowedAuthenticators(BIOMETRIC_STRONG or DEVICE_CREDENTIAL) for flexible auth.
- Check availability: BiometricManager.canAuthenticate(authenticators).

## Crypto Integration
- CryptoObject: wraps Cipher, Signature, or Mac bound to biometric auth.
- Key generated with setUserAuthenticationRequired(true) in KeyGenParameterSpec.
- After successful auth, use CryptoObject to perform crypto operation.
- Use for: decrypting tokens, signing transactions, accessing secure data.
- Key invalidated if biometric enrollment changes (setInvalidatedByBiometricEnrollment).

## Authentication Flow
1. Check BiometricManager.canAuthenticate() — handle BIOMETRIC_ERROR_*.
2. Build PromptInfo with title and allowed authenticators.
3. Create CryptoObject if needed (for sensitive operations).
4. Call authenticate(promptInfo) or authenticate(promptInfo, cryptoObject).
5. Handle callback: onAuthenticationSucceeded, onAuthenticationError, onAuthenticationFailed.

## Best Practices
- Use BIOMETRIC_STRONG for payments and sensitive data access.
- Allow DEVICE_CREDENTIAL as fallback for convenience features.
- Never use biometrics as the sole authentication — combine with server-side auth.
- Handle all error codes: ERROR_LOCKOUT (too many attempts), ERROR_NO_BIOMETRICS, etc.
- Test on devices with and without biometric hardware.
