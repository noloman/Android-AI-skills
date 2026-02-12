# CameraX Camera Extensions

## Overview
- CameraX Extensions expose OEM-optimized camera features via a simple API.
- Available since CameraX 1.1, significant improvements in 1.4+.
- Works on top of CameraX — same lifecycle-aware binding, same use cases.
- Requires `androidx.camera:camera-extensions` dependency.

## Available Extensions
- **NIGHT**: enhanced low-light photography, multi-frame noise reduction.
- **HDR**: high dynamic range capture, combines multiple exposures.
- **BOKEH**: portrait mode with background blur (depth-of-field simulation).
- **FACE_RETOUCH**: skin smoothing and facial enhancement.
- **AUTO**: device selects the best mode automatically.

## Usage
```kotlin
val extensionsManager = ExtensionsManager.getInstanceAsync(context, cameraProvider).await()

if (extensionsManager.isExtensionAvailable(cameraSelector, ExtensionMode.NIGHT)) {
    val nightCameraSelector = extensionsManager.getExtensionEnabledCameraSelector(
        cameraSelector, ExtensionMode.NIGHT
    )
    cameraProvider.bindToLifecycle(lifecycleOwner, nightCameraSelector, preview, imageCapture)
}
```

## Device Compatibility
- Extension availability depends on OEM implementation — not all devices support all modes.
- Pixel devices: NIGHT, HDR supported.
- Samsung: NIGHT, HDR, BOKEH, FACE_RETOUCH supported on flagship models.
- Always check `isExtensionAvailable()` — show/hide UI controls accordingly.
- Provide fallback to standard capture when extensions unavailable.

## Limitations
- Cannot combine extensions with `ImageAnalysis` — choose one or the other.
- Extension capture may be slower than standard (multi-frame processing).
- Preview may look different from final capture (HDR tone mapping applied only on capture).
- Not available in video recording — extensions are image-capture only.

## Best Practices
- Let users toggle extensions via UI buttons — don't enable by default.
- Show a processing indicator for extension captures (can take 1-3 seconds).
- Fall back gracefully: if extension fails, retry with standard capture.
- Test on real devices — emulators don't support camera extensions.
