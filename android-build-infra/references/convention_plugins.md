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
