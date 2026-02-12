# Testing in KMP

## Test Source Sets
- `commonTest` — shared tests using `kotlin.test` assertions (`assertEquals`, `assertTrue`, `assertFailsWith`)
- `androidUnitTest` — Android-specific unit tests (Robolectric available)
- `iosTest` — runs on iOS simulator or device
- `jvmTest` — JVM-specific tests

## Frameworks
- `kotlin.test` — built-in multiplatform assertions, test annotations (`@Test`, `@BeforeTest`)
- `kotlinx-coroutines-test` — `runTest`, `TestDispatcher`, `advanceUntilIdle`
- Turbine — Flow testing (`test { }`, `awaitItem()`, `awaitComplete()`)

## Best Practices
- Write most tests in `commonTest` — they run on all targets automatically.
- Test StateHolder directly without ViewModel wrapper.
- Use `runTest` for coroutine-based tests in commonTest.
- Mock platform dependencies via interfaces + test doubles in commonTest.
- Platform-specific tests only when testing `actual` implementations.

## Running Tests
- `./gradlew :shared:allTests` — runs tests on all targets.
- `./gradlew :shared:iosSimulatorArm64Test` — iOS tests on Apple Silicon simulator.
- `./gradlew :shared:testDebugUnitTest` — Android unit tests only.
- CI must run tests on all declared targets — never skip iOS tests on CI.

## Common Pitfalls
- `runTest` requires `kotlinx-coroutines-test` in commonTest dependencies.
- iOS tests need a simulator runtime installed on CI (Xcode).
- Flaky tests on Native: check for unstructured concurrency or GlobalScope usage.
