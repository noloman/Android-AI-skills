# Compose Semantics

## Modifier.semantics
- Use Modifier.semantics { } to add accessibility information to composables.
- mergeDescendants = true: combines child semantics into a single TalkBack announcement.
- clearAndSetSemantics { }: removes all child semantics and sets custom ones.

## Roles
- Role.Button: announces as "button" (double-tap to activate).
- Role.Checkbox, Role.Switch, Role.RadioButton: announces toggle state.
- Role.Tab: announces as "tab" with position.
- Role.Image: announces as "image".
- Set via: Modifier.semantics { role = Role.Button }.

## State Description
- stateDescription: announces the current state (e.g., "Selected", "Expanded", "50%").
- toggleableState: ToggleableState.On, Off, Indeterminate.
- selected: Boolean for selectable items.
- Use for custom components that have states TalkBack should announce.

## Headings & Structure
- heading(): marks element as a heading for navigation.
- Modifier.semantics { heading() } — TalkBack users can jump between headings.
- Use for screen titles, section headers, group labels.

## Content & Actions
- contentDescription: text read by TalkBack.
- customActions: list of CustomAccessibilityAction for contextual actions.
- onClick(label = "action description") { }: labeled click action.
- disabled(): marks element as non-interactive.
- error("message"): announces error state.

## Password & Input
- password(): hides text from TalkBack, announces "password".
- editableText: programmatic text for text fields.
- textSelectionRange: cursor position information.
- imeAction: announces expected keyboard action.

## Live Regions
- liveRegion = LiveRegionMode.Polite: announce changes when idle.
- liveRegion = LiveRegionMode.Assertive: announce changes immediately.
- Use for: toast messages, loading states, live counters, error banners.

## Testing Semantics
- Use ComposeTestRule.onNodeWithText().assertHasClickAction().
- assert(SemanticsMatcher.keyIsDefined(SemanticsProperties.Heading)).
- printToLog() to dump the semantic tree for debugging.
- Verify role, state, and content description in tests.

## Font Scaling 200% (Android 14+)
- Android 14+ supports non-linear font scaling up to 200% (was capped at ~130%).
- Text at 200% can be 2x the normal size — layouts MUST handle this without clipping or overlap.
- Use `sp` for all text sizes (default in Compose) — never `dp` for text.
- Test at maximum font scale: Settings > Display > Font size > drag to max.
- Common issues: text overlapping buttons, text clipped in fixed-height containers, horizontal scrolling.
- Fix: use `wrapContentHeight()`, avoid fixed-height text containers, use scrollable layouts.
- `LocalDensity.current.fontScale` to detect current font scaling for adaptive layouts.
