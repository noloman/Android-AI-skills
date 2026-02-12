# Design Tokens

## Color Tokens
- Always use `MaterialTheme.colorScheme.*` — never hardcode `Color(0xFF...)`.
- Map semantic roles: `primary`, `onPrimary`, `surface`, `onSurface`, `error`, `onError`.
- For custom colors beyond Material, define them in a `CompositionLocal` extension on the theme.
- Use `contentColorFor()` to auto-resolve text/icon color against a background.

## Typography Tokens
- Always use `MaterialTheme.typography.*` — never create inline `TextStyle(...)`.
- Map text roles: `headlineLarge`, `bodyMedium`, `labelSmall`, etc.
- Customize fonts in `Typography()` constructor — do not override per-composable.

## Spacing & Sizing Tokens
- Extract repeated spacing values into a `Spacing` object exposed via `CompositionLocal`.
- Avoid magic numbers like `Modifier.padding(16.dp)` scattered everywhere — use `MaterialTheme.spacing.medium`.
- Define a spacing scale: `extraSmall = 4.dp`, `small = 8.dp`, `medium = 16.dp`, `large = 24.dp`, `extraLarge = 32.dp`.

## Shape Tokens
- Use `MaterialTheme.shapes.*` — `small`, `medium`, `large`, `extraLarge`.
- Do not hardcode `RoundedCornerShape(12.dp)` — map to shape tokens.

## Custom Theme Extensions
```kotlin
// Define custom tokens
data class ExtendedColors(val success: Color, val warning: Color)
val LocalExtendedColors = staticCompositionLocalOf { ExtendedColors(...) }

// Access via extension
val MaterialTheme.extendedColors: ExtendedColors
    @Composable @ReadOnlyComposable get() = LocalExtendedColors.current
```
