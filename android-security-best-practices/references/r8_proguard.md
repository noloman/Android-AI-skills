# R8 / ProGuard

## Basic Configuration
- Set minifyEnabled = true and shrinkResources = true for release builds.
- R8 replaces ProGuard — same rule syntax, better optimization.
- Default rules from Android Gradle Plugin handle most framework classes.
- Add proguard-rules.pro for project-specific keep rules.

## Keep Rules
- Keep rules for reflection: -keep class com.example.Model { *; } — or use @Keep annotation.
- Keep rules for serialization (Gson, Moshi, kotlinx.serialization): keep data class fields.
- Keep rules for JNI: -keepclassmembers with native methods.
- Use -keepnames when only the name matters (e.g., enum valueOf).

## Library Rules
- Libraries publish consumer-rules.txt (consumer ProGuard rules) — these apply automatically.
- If a library lacks consumer rules and breaks with R8, add keep rules in your proguard-rules.pro.
- Use -dontwarn for known benign missing classes (e.g., optional dependencies).

## Verification
- Test the release build thoroughly — R8 can strip code that's only used via reflection.
- Use APK Analyzer to verify R8 removed expected code.
- Upload mapping.txt to Play Console and crash reporting tools for symbolication.
- Run R8 in full mode (android.enableR8.fullMode=true) for maximum optimization.
