# CI Testing

## Gradle Managed Devices
- Define devices in build.gradle.kts: managedDevices { devices { ... } }.
- Use ATD (Automated Test Device) images — stripped-down, faster boot.
- Define device groups for matrix testing: different API levels, screen sizes.
- Use sharding to split tests across multiple emulator instances.

## CI Strategy
- Unit tests: run on every PR, fast feedback (< 5 minutes).
- Instrumented tests: run nightly or on merge to main (slower, more expensive).
- Screenshot tests: run on every PR (JVM-based, fast).
- E2E tests: run on release branch or nightly.

## Caching
- Cache Gradle build outputs (~/.gradle/caches).
- Cache emulator snapshots for faster boot in CI.
- Cache Gradle Managed Device images to avoid re-downloading.
- Use --build-cache and --configuration-cache flags.

## Flaky Test Management
- Quarantine flaky tests — move to a separate test suite that doesn't block CI.
- Track flaky tests with a retry mechanism + reporting.
- Fix or remove quarantined tests within a defined time window.
- Never disable flaky tests silently — track them explicitly.

## Reporting
- Publish JUnit XML reports for CI dashboards.
- Use JaCoCo for code coverage measurement.
- Set coverage thresholds per module — fail CI on regression.
- Upload test artifacts (screenshots, logs) on failure for debugging.
- Track test execution time trends — detect slowdowns early.
