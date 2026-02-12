# GitHub Actions for Android

## Basic Workflow
- Trigger on: push to main, pull_request.
- Runner: ubuntu-latest (Linux — fastest for Android builds).
- Set up JDK: actions/setup-java with distribution: 'temurin' and java-version: '17'.
- Cache Gradle: actions/cache with ~/.gradle/caches and ~/.gradle/wrapper.
- Or use gradle/actions/setup-gradle for automatic caching.

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
