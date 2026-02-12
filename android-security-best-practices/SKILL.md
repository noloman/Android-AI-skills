
---
name: android-security-best-practices
description: Android security best practices — secrets, storage, network, components, WebView, R8.
user-invocable: true
---

# Android Security Best Practices

Cross-cutting skill — always activates alongside the project-type-specific skill.

## Hard Rules
- No hardcoded secrets (API keys, tokens, passwords) in source code.
- Use EncryptedSharedPreferences or Android Keystore for sensitive data at rest.
- Enforce HTTPS for all network traffic — no cleartext permitted.
- Set android:exported="false" on all components unless explicitly needed.
- Use PendingIntent.FLAG_IMMUTABLE for all PendingIntents (or FLAG_MUTABLE only when required).
- Disable WebView file access — setAllowFileAccess(false).
- Validate all incoming Intent data before use.
- Enable R8 (minifyEnabled true) for release builds.
- Never log sensitive data (tokens, passwords, PII) — not even at DEBUG level.
- Use network_security_config.xml in production.

## Core Patterns
- Store secrets in local.properties (gitignored) or CI environment variables.
- Use Secrets Gradle Plugin to inject secrets as BuildConfig fields.
- Pin certificates for critical API endpoints.
- Prefer explicit intents over implicit for internal communication.
- Restrict ContentProvider access with read/write permissions.
- Use Play Integrity API for device attestation — SafetyNet is deprecated and shut down.

## References
- references/secure_storage.md
- references/network_security.md
- references/webview_security.md
- references/intent_component_security.md
- references/r8_proguard.md
- references/secrets_management.md
- references/play_integrity.md
