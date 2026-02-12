# GitHub Actions for Android

## Basic Workflow
- Trigger on: push to main, pull_request.
- Runner: ubuntu-latest (Linux — fastest for Android builds).
- Set up JDK: actions/setup-java with distribution: 'temurin' and java-version: '17'.
- Use gradle/actions/setup-gradle v4 — handles Gradle caching, wrapper download, and daemon lifecycle automatically.
- Replaces manual actions/cache for Gradle — better cache invalidation and smaller cache sizes.

## Build Steps
- Make gradlew executable: chmod +x gradlew.
- Lint: ./gradlew lint detekt ktlintCheck.
- Unit tests: ./gradlew testDebugUnitTest.
- Build: ./gradlew assembleRelease or bundleRelease.
- Upload artifacts: actions/upload-artifact for APK/AAB.

## Matrix Testing
- Use strategy.matrix for multiple API levels or configurations.
- Matrix dimensions: api-level [29, 33, 34], target [default, google_apis].
- Use reactivecircus/android-emulator-runner for instrumented tests.
- Cache AVD snapshots: force-avd-creation: false + avd-cache key.

## Instrumented Tests
- Use reactivecircus/android-emulator-runner action.
- Or use Firebase Test Lab via gcloud CLI.
- Set emulator-options: -no-snapshot-save -no-window -gpu swiftshader_indirect.
- Run with script: ./gradlew connectedCheck.
- Upload test reports as artifacts on failure.

## Security
- Pin action versions to SHA hashes: actions/checkout@<sha> (not @v4).
- Store secrets in GitHub Settings > Secrets: KEYSTORE_BASE64, KEY_PASSWORD, etc.
- Never echo secrets in workflow logs.
- Use OIDC for trusted publishing (npm, PyPI) — no long-lived tokens.
- Review third-party actions before adoption.

## Gradle Managed Devices for CI
- Define virtual devices in build.gradle.kts: `managedDevices { devices { ... } }`.
- CI runs `./gradlew pixelTabletApi34DebugAndroidTest` — Gradle provisions and manages the device.
- Advantages: deterministic device setup, no manual emulator configuration, cacheable.
- Use ATD (Automated Test Device) images for faster boot and less flakiness.
- Combine with matrix strategy for multi-API-level testing.

## Dependabot for Actions
- Enable Dependabot for GitHub Actions: `.github/dependabot.yml` with `package-ecosystem: "github-actions"`.
- Automatically creates PRs when action versions have security updates.
- Complement SHA pinning — Dependabot updates the pinned SHAs.
- Review Dependabot PRs for breaking changes before merging.
