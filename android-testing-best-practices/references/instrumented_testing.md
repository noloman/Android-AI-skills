# Instrumented Testing

## Runner
- Use AndroidJUnitRunner as the test instrumentation runner.
- Enable test orchestrator (clearPackageData) for isolated test execution.
- Use Hilt testing: @HiltAndroidTest + HiltAndroidRule for dependency injection.

## Device Management
- Use Gradle Managed Devices (GMD) — declarative emulator setup in build.gradle.kts.
- Define device groups for matrix testing (phone, tablet, different API levels).
- GMD handles emulator lifecycle — no manual AVD management needed.
- Use ATD (Automated Test Devices) images for faster CI execution.

## Firebase Test Lab
- Run instrumented tests on real devices in the cloud.
- Supports sharding across multiple devices for parallel execution.
- Use gcloud firebase test android run for CI integration.
- Review test results, video recordings, and logs in Firebase Console.

## Test Organization
- @SmallTest: unit-level, < 200ms, no I/O.
- @MediumTest: integration, may use real database/filesystem.
- @LargeTest: end-to-end, full app interaction.
- Use test filtering by annotation for CI stage separation.

## Best Practices
- Clear state between tests — use Orchestrator or manual cleanup.
- Use IdlingResource for async operation synchronization.
- Avoid hardcoded sleep — use waitUntil or idling resources.
- Test on minimum and maximum supported API levels.

## Test Orchestrator v2
- Android Test Orchestrator runs each test in its own Instrumentation instance.
- Benefits: full isolation (no shared state), crash recovery (one test crash doesn't kill suite).
- Enable: `testOptions { execution = "ANDROIDX_TEST_ORCHESTRATOR" }`.
- Use `clearPackageData` option to wipe app data between tests — cleanest isolation.
- Trade-off: slower execution due to process restart — use for flaky test suites or security-sensitive tests.
- Alternative: use Hilt test rules with `@UninstallModules` for DI-level isolation without full process restart.
