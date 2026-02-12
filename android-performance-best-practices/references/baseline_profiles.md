# Baseline Profiles

## What They Do
- Ahead-of-time (AOT) compile critical code paths on install — avoids JIT compilation on first run.
- Reduces TTID and TTFD by 15–30% on typical apps.
- Reduces jank during first-use scrolling and navigation.
- Shipped inside the AAB/APK as baseline.prof.

## Generation
- Use Baseline Profile Gradle Plugin (androidx.baselineprofile).
- Write BaselineProfileRule tests that exercise critical user journeys.
- Use @BaselineProfileRule with a Macrobenchmark test module.
- Include: app startup, main screen load, primary navigation paths, key scrolling lists.
- Run on a physical device or emulator with userdebug build.

## Verification
- Verify profile with: adb shell cmd package dump-profiles <package>.
- Benchmark with and without profiles using Macrobenchmark.
- CompilationMode.Partial(baselineProfile) vs CompilationMode.None.
- Check profile size — very large profiles may exceed install-time budget.

## CI Integration
- Generate profiles in CI on a stable emulator image.
- Store generated profiles in version control (src/main/baseline-prof.txt).
- Regenerate after significant code changes to critical paths.
- Use Gradle Managed Devices for reproducible profile generation.

## CI Generation Improvements
- Use `baselineProfile` Gradle plugin task: `./gradlew :app:generateBaselineProfile`.
- Automatic profile merging: plugin merges profiles from all library modules.
- `filterPredicate`: filter which classes/methods are included in the profile.
- Dex layout optimization: profiles also optimize DEX file layout for faster class loading.
- Startup profiles: `@StartupProfileRule` for startup-specific profile generation.
- R8 integration: R8 uses profile data for optimization decisions (method inlining, class ordering).
