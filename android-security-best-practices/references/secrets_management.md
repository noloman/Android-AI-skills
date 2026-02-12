# Secrets Management

## Local Development
- Store secrets in local.properties — must be in .gitignore.
- Use the Secrets Gradle Plugin (com.google.android.libraries.mapsplatform.secrets-gradle-plugin) to inject secrets as BuildConfig fields.
- Access via BuildConfig.API_KEY — never hardcode in source files.
- Alternatively use gradle.properties with local overrides.

## CI/CD
- Store secrets as CI environment variables (GitHub Secrets, GitLab CI variables).
- Inject into BuildConfig via environment variable reads in build.gradle.kts.
- Never print secrets in CI logs — mask them in CI configuration.
- Rotate secrets regularly — especially after team member departures.

## Audit
- Scan for leaked secrets: use tools like git-secrets, truffleHog, or GitHub secret scanning.
- Review BuildConfig fields — ensure no secrets ship in debug builds unintentionally.
- Check string resources and assets for accidentally committed secrets.
- Review third-party SDK initialization for hardcoded keys.

## Limitations
- String obfuscation (R8) only slows reverse engineering — determined attackers can still extract.
- Do not rely on client-side secret storage for security — server-side validation is the real boundary.
- API keys in APKs are extractable — use server-proxied requests for sensitive operations.
- Consider using Firebase Remote Config or server-side config for rotatable secrets.
