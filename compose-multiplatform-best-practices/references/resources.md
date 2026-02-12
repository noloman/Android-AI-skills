# Compose Resources

## Setup
- Add `org.jetbrains.compose.resources` to commonMain dependencies.
- Place resources in `commonMain/composeResources/` directory.
- Gradle generates `Res` accessor object automatically.

## Directory Structure
```
commonMain/composeResources/
  drawable/          -> Images (PNG, SVG, WebP, XML vector)
  values/
    strings.xml      -> String resources (Android-style format)
  font/              -> TTF/OTF font files
  files/             -> Raw files (JSON, TXT, etc.)
```

## Usage
```kotlin
// Images
Image(painterResource(Res.drawable.logo), contentDescription = "Logo")

// Strings
Text(stringResource(Res.string.welcome_message))
Text(stringResource(Res.string.greeting, userName)) // with args

// Fonts
val customFont = FontFamily(Font(Res.font.roboto_regular))
```

## Platform-Specific Resources
- Use `androidMain/composeResources/` for Android-only assets.
- Use `iosMain/composeResources/` for iOS-only assets.
- Common resources in `commonMain/` are available on all platforms.

## Best Practices
- Prefer SVG for icons — scales on all platforms.
- Use `painterResource` for Compose, not Android's `ContextCompat.getDrawable`.
- String localization follows Android resource qualifier format.
- Fonts load asynchronously — provide fallback FontFamily.

## Avoid
- `R.drawable` / `R.string` — Android-only, not accessible from commonMain.
- Loading resources via platform file APIs — use `Res` for cross-platform access.
