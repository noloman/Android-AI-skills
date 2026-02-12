# Testing with DI

## Unit Tests
- No Hilt needed — use constructor injection with fakes/mocks.
- Create fakes of interfaces defined in feature-api modules.
- Instantiate ViewModel/UseCase directly with fake dependencies.
- This is the primary reason to use constructor injection everywhere.

## Instrumented Tests
- @HiltAndroidTest on test class.
- Add HiltAndroidRule as a JUnit rule — must be ordered before other rules.
- Use hiltRule.inject() in @Before to trigger injection.
- Test Activity/Fragment with launchActivity or launchFragmentInHiltContainer.

## Replacing Bindings
- @UninstallModules(ProductionModule::class) removes production bindings.
- Provide test bindings in a @Module @InstallIn @TestInstallIn annotated class.
- Or use @BindValue to replace a single binding with a field in the test class.
- @TestInstallIn replaces globally — @UninstallModules + local @Module for per-test replacement.

## Custom Test Components
- Use @CustomTestApplication for tests that need a custom Application class.
- Combine with @HiltAndroidTest for full DI in custom app contexts.
- Use HiltTestApplication as the application class in test runner config.

## Robolectric
- Hilt works with Robolectric — use @HiltAndroidTest + @Config(application = HiltTestApplication::class).
- Combine with RobolectricTestRunner.
- Faster than instrumented tests — runs on JVM.
- Some Hilt features may require additional Robolectric configuration.

## Best Practices
- Test business logic without DI framework — pure unit tests.
- Use DI in tests only when testing integration points (Activity, Fragment, Service).
- Keep test modules simple — prefer @BindValue over full module replacement.
- Verify DI graph compiles in CI — Hilt catches missing bindings at compile time.
