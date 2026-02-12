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
