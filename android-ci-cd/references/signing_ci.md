# Signing in CI

## Keystore Management
- Never commit keystore files to the repository.
- Encode keystore as base64: base64 -i release.keystore | pbcopy.
- Store base64 string as CI secret: KEYSTORE_BASE64.
- Decode in CI: echo $KEYSTORE_BASE64 | base64 --decode > release.keystore.
- Delete keystore after build completes — don't leave on CI runner.

## Secret Configuration
- Required secrets: KEYSTORE_BASE64, KEYSTORE_PASSWORD, KEY_ALIAS, KEY_PASSWORD.
- Reference in build.gradle.kts via System.getenv().
- signingConfigs.release { storeFile = file(keystorePath); storePassword = System.getenv("KEYSTORE_PASSWORD") }.
- Never hardcode fallback values — fail the build if secrets are missing.

## GitHub Actions Example
```yaml
- name: Decode keystore
  run: echo "${{ secrets.KEYSTORE_BASE64 }}" | base64 --decode > app/release.keystore
- name: Build release
  env:
    KEYSTORE_PASSWORD: ${{ secrets.KEYSTORE_PASSWORD }}
    KEY_ALIAS: ${{ secrets.KEY_ALIAS }}
    KEY_PASSWORD: ${{ secrets.KEY_PASSWORD }}
  run: ./gradlew bundleRelease
```

## Play App Signing
- Upload key (your key) signs the AAB before uploading.
- Google re-signs with the app signing key for distribution.
- If upload key is compromised: request reset in Play Console.
- Upload key can be different from the app signing key.

## Best Practices
- Use separate upload key from app signing key.
- Rotate upload key periodically (Play Console allows reset).
- Audit CI secrets access — limit to deployment workflows only.
- Use environment-specific signing: debug (auto), staging (shared), release (CI secret).
- Test signed builds locally before relying on CI: ./gradlew bundleRelease.
