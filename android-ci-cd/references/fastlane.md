# Fastlane for Android

## Setup
- Install: gem install fastlane or add to Gemfile.
- Initialize: fastlane init in project root.
- Configure in fastlane/Fastfile with lanes.
- Use .env files for environment-specific config (never commit secrets).

## Common Lanes
- lane :test — run unit tests: gradle(task: "testDebugUnitTest").
- lane :build — build release: gradle(task: "bundleRelease").
- lane :deploy — upload to Play Store: upload_to_play_store.
- lane :screenshots — automated screenshots: capture_android_screenshots.
- Chain lanes: before_all, after_all, error blocks.

## Play Store Upload
- upload_to_play_store: uploads AAB to specified track.
- Tracks: internal, alpha, beta, production.
- Set rollout_percentage for staged rollout: rollout_percentage: "10".
- Include mapping.txt: mapping_paths: ["app/build/outputs/mapping/release/mapping.txt"].
- Manage metadata: supply action for descriptions, screenshots, changelogs.

## Screenshots
- Use screengrab for automated screenshot capture.
- Configure devices and locales in Screengrabfile.
- Requires instrumented test that navigates through screens.
- Upload screenshots to Play Store with supply.

## Best Practices
- Version lock fastlane in Gemfile — avoid CI surprises.
- Use fastlane match or manual key management for signing.
- Store Play Store JSON key in CI secrets — not in repo.
- Use --verbose flag for debugging CI failures.
- Run fastlane locally before pushing to CI.

## Modern Alternatives
- **Gradle Play Publisher**: native Gradle plugin for Play Store uploads — no Ruby/Fastlane dependency.
- **Triple-T/gradle-play-publisher**: `com.github.triplet.play` — publish AABs, manage listings, promote tracks.
- Fastlane usage is declining in Android — most teams prefer Gradle-native tooling.
- Keep Fastlane for: screenshot automation (screengrab), cross-platform iOS+Android workflows.
- New projects: prefer Gradle Play Publisher for deployment, skip Fastlane unless screenshots are needed.
