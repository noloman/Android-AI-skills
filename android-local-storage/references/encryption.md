# Storage Encryption

## EncryptedSharedPreferences
- Use for key-value secrets (tokens, API keys, small sensitive data).
- Backed by AES256-SIV (keys) and AES256-GCM (values).
- Create with MasterKey.Builder(context, MasterKey.DEFAULT_MASTER_KEY_ALIAS).
- Thread-safe but slower than regular SharedPreferences.
- Migrate from regular SharedPreferences when adding encryption.

## EncryptedFile
- Use for file-level encryption (documents, exported data).
- Streaming encryption — suitable for large files.
- Same MasterKey as EncryptedSharedPreferences.
- Use for: database exports, log files, downloaded sensitive content.

## SQLCipher for Room
- SQLCipher encrypts the entire Room database file.
- Use android-database-sqlcipher dependency + SupportFactory.
- Pass encryption key via SupportFactory(passphrase).
- Store passphrase in Android Keystore — not hardcoded.
- Performance impact: ~5-15% slower than unencrypted Room.

## Android Keystore
- Hardware-backed key storage (TEE/StrongBox).
- Generate keys with KeyGenParameterSpec.
- Keys never leave the secure hardware.
- Use for: encrypting local secrets, biometric-bound operations.
- Keys are not exportable — use Keystore for crypto operations only.

## Best Practices
- Encrypt tokens, passwords, PII, health data, financial data.
- Do not encrypt non-sensitive data — unnecessary performance cost.
- Wipe decrypted data from memory after use (overwrite byte arrays).
- Handle KeyPermanentlyInvalidatedException when biometric enrollment changes.
- Test encryption on devices with and without hardware-backed Keystore.
