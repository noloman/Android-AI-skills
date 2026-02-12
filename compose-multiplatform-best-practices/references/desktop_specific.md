# Desktop-Specific Compose Multiplatform

## Window Management
```kotlin
fun main() = application {
    Window(
        onCloseRequest = ::exitApplication,
        title = "My App",
        state = rememberWindowState(width = 900.dp, height = 600.dp)
    ) {
        App() // Shared composable
    }
}
```

## Desktop-Only Features
- `Window` — top-level window with title, size, position, icon.
- `DialogWindow` — modal dialogs.
- `Tray` — system tray icon with menu.
- `MenuBar` — native menu bar (File, Edit, View menus).
- `Notification` — system notifications.
- Keyboard shortcuts — `Modifier.onKeyEvent`, `Modifier.onPreviewKeyEvent`.

## File System Access
- Use `java.io.File` in `desktopMain` (JVM target).
- File dialogs: `javax.swing.JFileChooser` or `java.awt.FileDialog` wrapped in Compose.
- For cross-platform file access, define `expect`/`actual` in commonMain.

## Platform Detection
```kotlin
// commonMain
expect val currentPlatform: Platform
enum class Platform { ANDROID, IOS, DESKTOP }

// desktopMain
actual val currentPlatform = Platform.DESKTOP
```

## Desktop Considerations
- Mouse hover states: `Modifier.pointerMoveFilter` for hover effects.
- Right-click context menus: `ContextMenuArea` composable.
- Window resizing: layouts should be responsive — test at various window sizes.
- DPI scaling: Compose handles HiDPI automatically — use `dp` not `px`.
- Packaging: use `compose.desktop.application` Gradle plugin for native installers (.dmg, .msi, .deb).

## Common Pitfalls
- Swing interop can cause threading issues — always use `SwingUtilities.invokeLater` for Swing code.
- Desktop has no concept of Activity or Fragment — lifecycle is Window-based.
- Some Material3 components assume touch input — test keyboard/mouse navigation.
