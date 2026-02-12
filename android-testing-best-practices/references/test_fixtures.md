# Test Fixtures

## testFixtures Source Set
- Gradle's `java-test-fixtures` plugin provides a `testFixtures` source set.
- Code in `testFixtures` is shared across `test` and `androidTest` source sets.
- Enable: `android { testFixtures { enable = true } }` in library modules.
- Other modules depend on fixtures: `testImplementation(testFixtures(project(":core")))`.

## Use Cases
- **Test data builders**: `UserBuilder().withName("Test").withEmail("test@test.com").build()`.
- **Fake implementations**: `FakeUserRepository`, `FakeAnalyticsTracker`.
- **Test utilities**: assertion helpers, custom matchers, setup functions.
- **Shared constants**: test API keys, mock URLs, test file paths.

## Organization
```
module/src/
  main/          → Production code
  test/          → Unit tests
  androidTest/   → Instrumented tests
  testFixtures/  → Shared test utilities (accessible by test + androidTest)
```

## Best Practices
- Keep fakes in `testFixtures`, not in `main` — prevents shipping test code.
- Name fakes consistently: `Fake` prefix (FakeUserRepo), not `Mock` (which implies Mockito).
- Test data builders should mirror the domain model — make it easy to create valid test objects.
- Don't put mocking framework setup in fixtures — keep them framework-agnostic.
- Version fixtures alongside the module they support — same PR, same review.

## Cross-Module Sharing
- Library module exposes `testFixtures` — consuming modules use them in tests.
- Example: `:core` module has `FakeUserRepository` → `:feature-profile` tests use it.
- Avoids duplicating test utilities across modules.
- Fixtures are not included in release builds — zero APK size impact.
