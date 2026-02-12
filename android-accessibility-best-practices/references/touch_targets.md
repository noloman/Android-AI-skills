# Touch Targets

## Minimum Size
- 48dp × 48dp minimum for all interactive elements (Material Design guideline).
- WCAG 2.5.8 requires at least 24×24 CSS px — Android's 48dp exceeds this.
- Applies to: buttons, icons, checkboxes, switches, list items, links.

## Compose
- Use Modifier.sizeIn(minWidth = 48.dp, minHeight = 48.dp) on interactive elements.
- Material components set minimumInteractiveComponentSize automatically.
- For custom composables, ensure the clickable area includes padding.
- Use Modifier.clickable with indication and correct hit area.

## Expanding Touch Area
- Add padding around small visual elements to expand the touch target.
- Compose: Modifier.padding() outside Modifier.clickable() expands the touch area.
- View system: use TouchDelegate to extend touch area beyond the view bounds.
- ViewCompat.setMinimumTouchTargetSize for backward-compatible touch targets.

## Spacing
- Maintain at least 8dp spacing between adjacent touch targets.
- Prevents accidental taps on the wrong element.
- Especially important for dense layouts: toolbars, bottom navigation, list actions.

## Verification
- Use Accessibility Scanner to detect targets smaller than 48dp.
- Enable "Show layout bounds" in Developer Options for visual verification.
- Test on actual devices — touch accuracy varies by device and user.
