# App Links

## Digital Asset Links
- Host assetlinks.json at: https://example.com/.well-known/assetlinks.json.
- File must be served over HTTPS with Content-Type: application/json.
- Contains: package_name and SHA-256 fingerprint of the signing key.
- Google's crawler verifies the file — verification can take hours.

## assetlinks.json Format
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.example.app",
    "sha256_cert_fingerprints": ["AA:BB:CC:..."]
  }
}]
```

## Intent Filter
- Add android:autoVerify="true" to the intent-filter.
- System verifies all domains with autoVerify at install time.
- If verification fails for any domain, the app is not set as default handler.

## Fingerprint
- Get SHA-256 from Play Console (App signing > App signing key certificate).
- For debug builds: keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey.
- Include both debug and release fingerprints during development.
- Update assetlinks.json when signing keys rotate.

## Multi-Domain Support
- Each domain needs its own assetlinks.json.
- All domains with autoVerify must pass verification.
- Use domain wildcards carefully — *.example.com requires specific assetlinks hosting.

## Fallback
- If App Link verification fails, the link opens as a Web Link (browser choice dialog).
- Users without the app installed go to the website — provide a smart banner or redirect.
- Use Play Install Referrer API for deferred deep linking (install then navigate).

## Debugging
- Use Android Studio App Links Assistant for setup validation.
- adb shell pm get-app-links com.example.app to check verification status.
- Verify: "verified" state for the domain. "none" means verification failed.
