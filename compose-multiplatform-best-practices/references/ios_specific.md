# iOS-Specific Compose Multiplatform

## ComposeUIViewController
- Entry point for Compose UI in iOS apps.
- Returns a `UIViewController` that hosts the Compose hierarchy.
```kotlin
// iosMain
fun MainViewController(): UIViewController =
    ComposeUIViewController { App() }
```
- Called from SwiftUI via `UIViewControllerRepresentable` or from UIKit directly.

## SwiftUI Integration
```swift
struct ComposeView: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> UIViewController {
        MainViewControllerKt.MainViewController()
    }
    func updateUIViewController(_ uiViewController: UIViewController, context: Context) {}
}

struct ContentView: View {
    var body: some View {
        ComposeView().ignoresSafeArea()
    }
}
```

## Safe Area Handling
- Compose Multiplatform provides `WindowInsets` API for safe areas.
- Use `WindowInsets.safeArea` for iOS notch/Dynamic Island padding.
- Apply `Modifier.windowInsetsPadding(WindowInsets.safeArea)` on root layout.

## iOS-Specific Considerations
- Scrolling: iOS bounce/elastic scroll differs — Compose uses Android-style overscroll by default.
- Text selection: Uses iOS-native selection handles.
- Keyboard: `WindowInsets.ime` works for keyboard avoidance.
- Performance: Initial composition may be slower than SwiftUI — use baseline profiles equivalent (startup tracing).
- Dark mode: Reads system setting automatically via `isSystemInDarkTheme()`.

## Accessibility on iOS
- Compose semantics map to UIAccessibility automatically.
- `contentDescription` -> `accessibilityLabel`.
- `Role.Button` -> `UIAccessibilityTraits.button`.
- Test with VoiceOver on device/simulator.

## Common Pitfalls
- Forgetting `.ignoresSafeArea()` in SwiftUI wrapper causes double safe area padding.
- iOS 15 minimum deployment target required for Compose Multiplatform.
- Memory: watch for retain cycles when passing closures from Swift to Kotlin.
