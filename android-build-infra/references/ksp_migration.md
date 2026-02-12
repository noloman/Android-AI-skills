# KAPT to KSP Migration

## Why Migrate
- KAPT is deprecated — no longer maintained, does not support K2 compiler.
- KSP is 2-3x faster than KAPT — no Java stub generation step.
- KSP supports Kotlin Multiplatform — KAPT is JVM-only.

## Library Migration Status
- **Room**: Full KSP support — `ksp(libs.room.compiler)` replaces `kapt(libs.room.compiler)`.
- **Hilt**: Full KSP support since Dagger 2.48+ — `ksp(libs.hilt.compiler)` replaces `kapt(libs.hilt.compiler)`.
- **Moshi**: Full KSP support — `ksp(libs.moshi.codegen)` replaces `kapt(libs.moshi.codegen)`.
- **Glide**: KSP support available — `ksp(libs.glide.ksp)`.
- **kotlin-inject**: KSP-native — always use KSP.

## Migration Steps
1. Add KSP plugin: `id("com.google.devtools.ksp")` in build.gradle.kts.
2. Replace `kapt(...)` with `ksp(...)` in dependencies block.
3. Move `kapt { ... }` configuration to `ksp { ... }` block.
4. Room: `ksp { arg("room.schemaLocation", "$projectDir/schemas") }`.
5. Remove `kotlin("kapt")` plugin when all processors are migrated.
6. Verify build — KSP errors may differ from KAPT errors.

## Common Gotchas
- Room + KSP requires `room.schemaLocation` in `ksp` block (not `kapt` block).
- Hilt + KSP: use `dagger.hilt.android.internal.disableAndroidSuperclassValidation=true` if needed.
- Mixed KAPT/KSP: possible during migration, but aim to fully remove KAPT.
- KSP incremental processing: enabled by default — faster rebuilds.
- KSP 2.x: required for Kotlin 2.0 K2 compiler — KSP 1.x only works with K1.
