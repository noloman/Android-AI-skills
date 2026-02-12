# Build Variants

## Build Types
- debug: debuggable = true, minifyEnabled = false, default debug signing.
- release: debuggable = false, minifyEnabled = true, shrinkResources = true, release signing.
- staging: copy of release config with different base URL or feature flags for QA testing.
- Create staging: buildTypes { create("staging") { initFrom(getByName("release")) } }.

## Product Flavors
- Use for environment switching: dev, staging, prod.
- Define dimension: flavorDimensions += "environment".
- Each flavor can override: applicationIdSuffix, versionNameSuffix, buildConfigField, resValue.
- Combine with build types: devDebug, devRelease, prodDebug, prodRelease.

## Signing Configs
- Define per build type or per flavor.
- Debug: use default debug.keystore (auto-generated).
- Release: load from environment variables or local.properties (never hardcode).
- Staging: can use debug signing or a separate QA signing config.

## Build Config Fields
- buildConfigField("String", "BASE_URL", "\"https://api.example.com\"").
- Use per-flavor fields for API endpoints, feature flags, analytics keys.
- Access at runtime: BuildConfig.BASE_URL.
- Prefer build config over runtime environment detection.

## Flavor Dimensions
- Use multiple dimensions for orthogonal concerns (environment × tier).
- Keep dimensions minimal — variant count explodes with dimensions.
- Use variantFilter to exclude invalid combinations.
