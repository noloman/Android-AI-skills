# Content Descriptions

## Required Elements
- All interactive non-text elements: IconButton, Image (clickable), FAB, custom icons.
- Compose: Image(contentDescription = "description") or Icon(contentDescription = "description").
- View system: android:contentDescription or setContentDescription().

## Decorative Elements
- Set contentDescription = null on decorative images (Compose).
- View system: android:importantForAccessibility="no".
- Decorative = adds no information beyond what's already visible as text.

## Writing Descriptions
- Describe the action, not the appearance: "Delete item" not "Red trash can icon".
- Keep it concise: 2–5 words is ideal.
- Avoid "button" or "image" — TalkBack announces the role automatically.
- Match the language of the UI locale.

## Dynamic Descriptions
- Update contentDescription when state changes (e.g., "Play" → "Pause").
- Use stateDescription for toggle states (e.g., "Selected", "Expanded").
- Compose: Modifier.semantics { stateDescription = "Expanded" }.

## Icon + Text Combinations
- If an icon is next to text that describes it, set icon contentDescription = null.
- TalkBack reads both — redundant descriptions cause confusion.
- Use mergeDescendants to group icon and text into one TalkBack announcement.

## Live Regions
- Use Modifier.semantics { liveRegion = LiveRegionMode.Polite } for dynamic updates.
- Polite: announces when TalkBack is idle. Assertive: interrupts immediately.
- Use for: snackbars, loading indicators, real-time counters.
