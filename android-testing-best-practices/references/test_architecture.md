# Test Architecture

## Test Pyramid
- Unit tests (70%): fast, JVM-only, test business logic and ViewModels.
- Integration tests (20%): test component interaction, database, API clients.
- E2E / UI tests (10%): full user flows, slow, run on device/emulator.
- Invert the pyramid and you get slow, fragile, expensive test suites.

## Fakes > Stubs > Mocks
- Fakes: lightweight implementations of interfaces (e.g., FakeUserRepository with in-memory list).
- Stubs: return canned responses, no behavior.
- Mocks: verify interactions — use sparingly, they couple tests to implementation.
- Prefer fakes for repositories, data sources, and external services.

## Test Naming
- Pattern: `methodName_condition_expectedResult` or `should_expectedBehavior_when_condition`.
- Be descriptive: `login_withInvalidEmail_showsError` not `test1`.
- Group related tests with @Nested classes (JUnit 5) or clear naming prefixes.

## AAA Structure
- Arrange: set up preconditions, test data, and dependencies.
- Act: execute the operation under test.
- Assert: verify the expected outcome.
- One concept per test — if multiple assertions, they should verify a single behavior.

## Test Data
- Use test data builders or factory functions — avoid inline object construction.
- Define defaults for all fields — override only what's relevant to the test.
- Use testFixtures source set for shared test utilities across modules.
- Keep test data realistic but minimal.
