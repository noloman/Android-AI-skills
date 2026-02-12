# Secure Storage

## Android Keystore
- Use Android Keystore for cryptographic key storage — keys never leave the TEE/StrongBox.
- Generate keys with KeyGenParameterSpec — set purposes (ENCRYPT_DECRYPT, SIGN_VERIFY).
- Set setUserAuthenticationRequired(true) for biometric-bound keys.
- Use setInvalidatedByBiometricEnrollment(true) to revoke on new biometric enrollment.
- Keys are not exportable — use Keystore for operations, not raw key extraction.

## EncryptedSharedPreferences
- Use EncryptedSharedPreferences from androidx.security.crypto for key-value secrets.
- Backed by AES256-SIV for keys and AES256-GCM for values.
- Master key generated via MasterKey.Builder with AES256_GCM_SPEC.
- Thread-safe but slower than regular SharedPreferences — cache reads.
- Fallback: if device lacks hardware backing, software keystore is used.

## EncryptedFile
- Use EncryptedFile from androidx.security.crypto for file-level encryption.
- Streaming encryption — suitable for large files.
- Same MasterKey as EncryptedSharedPreferences.

## Memory Hygiene
- Wipe sensitive data (passwords, tokens) from memory after use — overwrite char arrays.
- Avoid storing secrets in String (immutable, lingers in memory).
- Use ByteArray and clear it in a finally block.

## Biometric-Bound Keys
- Use `setUserAuthenticationParameters(timeout, AUTH_BIOMETRIC_STRONG)` for biometric-only access.
- `CryptoObject`: wraps `Cipher`/`Signature`/`Mac` for biometric-authenticated crypto operations.
- Pass `CryptoObject` to `BiometricPrompt.authenticate(cryptoObject)` — key is unlocked only on biometric success.
- Timeout: `0` means per-use authentication, `> 0` allows reuse within timeout seconds.

## StrongBox vs TEE
- **StrongBox**: dedicated secure hardware chip — highest security, available on Pixel 3+, Samsung flagship.
- **TEE** (Trusted Execution Environment): hardware-isolated area on main processor — widely available.
- Use StrongBox: `setIsStrongBoxBacked(true)` in `KeyGenParameterSpec` — falls back to TEE if unavailable.
- StrongBox has limited key storage — reserve for most sensitive keys (payment, authentication).
- Check availability: `packageManager.hasSystemFeature(PackageManager.FEATURE_STRONGBOX_KEYSTORE)`.
