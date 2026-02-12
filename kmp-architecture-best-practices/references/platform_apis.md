# Platform APIs in KMP

## expect/actual Pattern
- Declare `expect` in commonMain — implement `actual` in each platform source set.
- Keep expect declarations minimal (interfaces or top-level functions preferred).
- Use `expect`/`actual` for: file system access, platform logging, crypto, biometrics, device info.

## Common expect/actual Examples
```kotlin
// commonMain
expect fun platformName(): String
expect class PlatformLogger() {
    fun log(message: String)
}

// androidMain
actual fun platformName(): String = "Android ${Build.VERSION.SDK_INT}"
actual class PlatformLogger {
    actual fun log(message: String) = Log.d("App", message)
}

// iosMain
actual fun platformName(): String = UIDevice.currentDevice.systemName()
actual class PlatformLogger {
    actual fun log(message: String) = NSLog(message)
}
```

## Swift Interop Best Practices
- Use `@ObjCName` annotation to control exported Objective-C/Swift names.
- Prefer interfaces (`expect interface`) over classes for cleaner Swift protocols.
- Use `@HiddenFromObjC` to hide internal implementation details.
- Consider SKIE (by Touchlab) for better Swift interop: sealed class exhaustive enums, suspend->async, Flow->AsyncSequence.
- Consider KMP-NativeCoroutines for exposing `Flow` as Swift `AsyncSequence`.

## Avoid
- Direct JNI calls in commonMain — isolate in androidMain.
- Objective-C bridging headers in shared module — use `cinterop` for C libraries.
- Passing platform types across module boundaries — map to common types.
