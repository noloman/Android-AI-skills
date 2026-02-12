# Convention Plugins

## Structure
- Create a build-logic/ directory at the project root as an included build.
- Include in settings.gradle.kts: pluginManagement { includeBuild("build-logic") }.
- build-logic has its own build.gradle.kts with kotlin-dsl plugin.
- Convention plugins are Kotlin classes implementing Plugin<Project>.

## Common Plugins
- AndroidApplicationConventionPlugin: compileSdk, minSdk, JVM target, common android{} config.
- AndroidLibraryConventionPlugin: shared config for library modules.
- ComposeConventionPlugin: buildFeatures.compose, compiler options, compose dependencies.
- AndroidTestConventionPlugin: test runner, orchestrator, managed devices.

## Best Practices
- Keep plugins focused — one concern per plugin (don't mix compose + testing).
- Never hardcode versionCode or applicationId/namespace in convention plugins.
- Access version catalog in plugins: val libs = project.extensions.getByType<VersionCatalogsExtension>().named("libs").
- Use plugins to enforce consistent compileSdk, minSdk, and JVM target across modules.

## Version Catalog Access
- Convention plugins can read from the version catalog for dependency versions.
- Apply Gradle plugins from the catalog: project.pluginManager.apply(libs.findPlugin("compose-compiler").get().get().pluginId).
- Share compile options (Java/Kotlin version) consistently across all modules.

## Avoiding Pitfalls
- Don't use convention plugins to set versionName/versionCode — these are app-specific.
- Don't apply application-specific config (signing) in library convention plugins.
- Test convention plugin changes across the entire project — they affect every module.

## Compose Compiler Plugin (Kotlin 2.0+)
- Since Compose 1.5+ / Kotlin 2.0, the Compose Compiler is a separate Gradle plugin: `org.jetbrains.kotlin.plugin.compose`.
- Apply in convention plugin: `pluginManager.apply("org.jetbrains.kotlin.plugin.compose")`.
- Remove old `composeOptions { kotlinCompilerExtensionVersion = "..." }` — no longer needed.
- Compose Compiler version is now tied to the Kotlin version — no separate version management.
- Configure stability in `composeCompiler { stabilityConfigurationFile.set(project.layout.projectDirectory.file("compose_stability.conf")) }`.

## Kotlin 2.0 / K2 Compiler
- K2 is default since Kotlin 2.0 — faster compilation, better type inference.
- Verify all plugins are K2-compatible before upgrading.
- KSP 2.x is required for K2 — KSP 1.x and KAPT don't support K2.
- Set `kotlin.compilerOptions.languageVersion.set(KotlinVersion.KOTLIN_2_0)` in convention plugins.
