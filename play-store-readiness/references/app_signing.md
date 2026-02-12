# App Signing

## Play App Signing
- Enroll in Play App Signing — Google manages the app signing key securely.
- You retain an upload key for signing builds before uploading to Play Console.
- The upload key can be reset if compromised — the app signing key cannot.
- Enrollment is irreversible — once opted in, you cannot opt out.

## Key Management
- Never store signing keys in source control.
- Use CI secrets (GitHub Secrets, etc.) to inject keystore path and passwords.
- Separate debug and release signing configurations.
- Use a unique upload key per app — do not share across apps.

## Key Rotation
- Play App Signing supports key upgrade (API 28+) for the app signing key.
- Upload key rotation: request in Play Console if compromised.
- Plan for rotation — do not hardcode signing key fingerprints in client code.

## Fingerprints
- Obtain SHA-256 fingerprint from Play Console (App signing key certificate).
- Use fingerprint for: Digital Asset Links (App Links), Google Sign-In, Firebase.
- Verify fingerprint matches: keytool -list -v -keystore <keystore>.
- Update all dependent services when keys rotate.
