# Network Security

## HTTPS Enforcement
- Set android:usesCleartextTraffic="false" in AndroidManifest.xml.
- Use Network Security Config (res/xml/network_security_config.xml) for fine-grained control.
- Debug-only cleartext: use <debug-overrides> in network_security_config.xml.
- Never allow cleartext in release builds.

## Network Security Config
- Define <domain-config> per domain for custom trust anchors.
- Use <pin-set> for certificate pinning with expiration dates.
- Always include a backup pin — pinning without backup risks bricking the app.
- Set pin expiration to force regular rotation.

## Certificate Pinning
- Pin the leaf certificate or intermediate CA — not the root.
- OkHttp CertificatePinner: pin SHA-256 hashes of the public key.
- Combine with Network Security Config for defense in depth.
- Test pin failures — ensure graceful degradation with clear error messages.
- Rotate pins before expiration — use multiple pins during transition.

## TLS Requirements
- Enforce TLS 1.2+ (default on API 20+, but verify older devices).
- Do not implement custom TrustManagers — breaks certificate validation.
- Do not use custom HostnameVerifiers — allows MITM attacks.
- Use OkHttp or Ktor with default security settings.

## Certificate Pinning Decision Matrix
- **Pin via Network Security Config**: recommended for most apps — declarative, easy to update, supports backup pins.
- **Pin via OkHttp CertificatePinner**: use when you need programmatic control or custom pin logic.
- **Don't pin at all**: acceptable for apps without high-security requirements — TLS + proper CA validation is sufficient.
- **When to pin**: banking apps, healthcare apps, apps handling financial data, apps communicating with known servers.
- **When NOT to pin**: apps using CDNs with rotating certificates, apps with many third-party API endpoints.
- **Rotation plan**: always have at least 2 pins (current + backup), rotate before expiration.
- **Failure mode**: pinning failure = network failure — must have clear error messaging and support path.
