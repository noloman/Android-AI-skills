# Screenshot Testing

## Paparazzi (JVM-Based)
- Runs on JVM — no emulator or device needed.
- Renders composables/views using layoutlib (same as Android Studio preview).
- Fast iteration — runs as regular unit tests.
- Use paparazzi.snapshot { MyComposable() } to capture.
- Compare mode: paparazzi.verify {} fails on visual differences.

## Roborazzi (Robolectric-Based)
- Runs on JVM with Robolectric — supports more Android APIs than Paparazzi.
- Integrates with Compose testing rules.
- captureRoboImage() to capture screenshots.
- Supports component-level and full-screen captures.

## Workflow
- Record: generate baseline golden images (store in VCS).
- Verify: compare current rendering against golden images.
- Update: re-record goldens when intentional UI changes are made.
- Review golden changes in pull requests — visual diff.

## Configuration
- Set a tolerance threshold for pixel differences (e.g., 0.1% for anti-aliasing).
- Use consistent font rendering and density settings across environments.
- Run on the same OS in CI to avoid platform rendering differences.
- Organize golden images by component/feature for easy review.

## CI Integration
- Record goldens in CI using a dedicated recording task.
- Verify goldens on every PR.
- Upload diff images as CI artifacts on failure for easy debugging.
- Consider separate golden directories per API level if testing multiple.
