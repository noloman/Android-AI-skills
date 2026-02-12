# Build Performance

## Configuration Cache
- Enable: `org.gradle.configuration-cache=true` in gradle.properties.
- Caches the build configuration phase — subsequent builds skip configuration.
- Configuration cache issues: avoid using `Project` reference at execution time.
- Fix common issues: replace `project.buildDir` with `layout.buildDirectory`.
- Incompatible plugins will fail with clear error messages — fix or exclude.

## Build Cache
- Enable: `org.gradle.caching=true` in gradle.properties.
- Local build cache: stores task outputs on disk — instant hits for unchanged tasks.
- Remote build cache: share task outputs across team/CI via Develocity or custom server.
- Cache key includes: inputs, outputs, task implementation — deterministic builds are key.
- Non-deterministic tasks (timestamps, random values) break caching — fix or exclude.

## Parallel Execution
- Enable: `org.gradle.parallel=true` in gradle.properties.
- Independent modules build concurrently — well-modularized projects benefit most.
- Set workers: `org.gradle.workers.max` to match available CPU cores.
- Avoid inter-module dependencies that force serial execution.

## Build Time Budgets
- Clean build: < 5 minutes for medium projects (target).
- Incremental build (single file change): < 30 seconds.
- Annotation processing (KSP): should complete in < 15% of total build time.
- Measure with `--profile` flag or Gradle build scans.

## Develocity / Build Scans
- Enable build scans: `--scan` flag or Develocity plugin.
- Analyze: task execution timeline, cache hit rates, dependency resolution.
- Identify bottlenecks: longest-running tasks, cache misses, configuration time.
- Team dashboards: aggregate build performance across developers and CI.

## Quick Wins
- Use `org.gradle.daemon=true` locally (default) — daemon startup is expensive.
- Use `org.gradle.jvmargs=-Xmx4g -XX:+UseParallelGC` — match to available RAM.
- Avoid `clean` builds unless necessary — leverage incremental compilation.
- Use file-system watching: `org.gradle.vfs.watch=true` — avoids redundant file checks.
