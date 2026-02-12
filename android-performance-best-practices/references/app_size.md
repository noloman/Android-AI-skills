# App Size Optimization

## R8 and Resource Shrinking
- Enable minifyEnabled = true to remove unused code.
- Enable shrinkResources = true to strip unused resources.
- Verify removed resources with APK Analyzer — check for false positives.
- Use tools:keep in res/raw/keep.xml for dynamically-loaded resources.

## Image Optimization
- Use WebP instead of PNG/JPEG — 25–30% smaller with same quality.
- Use vector drawables (VectorDrawable) for simple icons and illustrations.
- Avoid shipping multiple density assets when vectors suffice.
- Use Android Studio's image asset tool for WebP conversion.

## APK Analysis
- Run APK Analyzer (Build > Analyze APK) to identify size hotspots.
- Check: dex file size, native libraries, assets, resources, META-INF.
- Compare APK sizes between releases to catch regressions.
- Set a size budget and alert on CI if exceeded.

## App Bundles
- Ship AAB — Play Store generates per-device APKs (language, density, ABI splits).
- Average 15–20% size reduction vs universal APK.
- Use bundletool to test local splits before publishing.
- Review Play Console size metrics for per-device download sizes.

## Further Reductions
- Remove unused third-party libraries — run dependency analysis.
- Use dynamic feature modules for rarely-used features (on-demand delivery).
- Strip debug symbols from native libraries for release builds.
- Avoid embedding fonts if the system font suffices — or subset custom fonts.
