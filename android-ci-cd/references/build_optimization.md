# Build Optimization for CI

## Gradle Caching
- Enable build cache: org.gradle.caching=true in gradle.properties.
- Enable configuration cache: org.gradle.configuration-cache=true.
- Cache Gradle wrapper, dependencies, and build outputs in CI.
- GitHub Actions: use gradle/actions/setup-gradle for automatic caching.
- Cache key should include: gradle-wrapper.properties, libs.versions.toml, build files.

## Parallel Execution
- Enable parallel builds: org.gradle.parallel=true.
- Set workers: org.gradle.workers.max=4 (match CI runner cores).
- Modularized projects benefit most — independent modules build concurrently.
- CI runners typically have 2-4 cores — adjust workers accordingly.

## Daemon & Memory
- Disable Gradle daemon in CI: org.gradle.daemon=false (CI runners are ephemeral).
- Or keep daemon with warm-start for multi-step workflows.
- Set JVM heap: org.gradle.jvmargs=-Xmx4g -XX:+UseParallelGC.
- Match to CI runner memory — OOM kills are silent and confusing.
- Use metaspace limit: -XX:MaxMetaspaceSize=512m.

## Incremental Builds
- Avoid clean builds in CI — leverage incremental compilation.
- Only clean when: Gradle version changes, build scripts change significantly.
- KSP/KAPT: incremental processing reduces annotation processing time.
- Use --no-rebuild to skip up-to-date tasks.

## Build Scans
- Enable Gradle build scans for CI debugging: --scan flag.
- Build scans show: task execution times, dependency resolution, cache hit rates.
- Identify slow tasks and optimize them.
- Use Develocity (Gradle Enterprise) for team-wide build analytics.

## CI-Specific Tips
- Use --stacktrace for debugging but --quiet for production CI (less log noise).
- Upload build reports (lint, test, scan) as CI artifacts.
- Set timeout on build steps — prevent hung builds from consuming runner time.
- Use self-hosted runners for faster builds with persistent caches.

## Gradle 8.6+ Configuration Cache
- Configuration cache is production-ready since Gradle 8.6.
- Caches the entire configuration phase — subsequent builds skip it entirely.
- Fix incompatible plugins: avoid `Project` references at execution time, use `Provider` API.
- Validate: `./gradlew --configuration-cache-problems=warn` to find issues.
- CI benefit: 10-30% faster builds after first run.

## Build Scan Integration
- Add `com.gradle.develocity` plugin for automatic build scans.
- CI publishes scans to Develocity or scans.gradle.com.
- Link scan URL in PR comments for build failure debugging.
- Track build time trends across CI runs — detect regressions early.
