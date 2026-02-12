# TalkBack Navigation

## Default Traversal Order
- TalkBack reads nodes top-to-bottom, start-to-end (LTR/RTL aware).
- Order follows the semantic tree, which mirrors the composable tree by default.
- Ensure visual order matches semantic order — mismatches confuse users.

## Custom Ordering
- Compose: Modifier.semantics { traversalIndex = 1f } to reorder.
- Lower traversalIndex = announced earlier.
- Use sparingly — prefer restructuring the composable tree over overriding traversal.
- View system: android:accessibilityTraversalBefore / accessibilityTraversalAfter.

## Focus Management
- Use FocusRequester to programmatically move focus (e.g., after navigation).
- Announce screen changes to TalkBack — user needs context after navigation.
- Compose: LaunchedEffect to request focus on the first meaningful element.

## Headings
- Mark section headings: Modifier.semantics { heading() }.
- TalkBack users can navigate by headings (swipe up/down gesture).
- Use headings for screen titles, section dividers, list group headers.

## Dialogs and Modals
- Focus must be trapped inside dialogs — TalkBack should not escape to background.
- Compose Dialog and BottomSheet handle this automatically.
- On dismiss, return focus to the element that opened the dialog.

## Custom Actions
- Use Modifier.semantics { customActions = listOf(CustomAccessibilityAction("Delete") { ... }) }.
- Provides additional actions without visible UI controls.
- TalkBack users access via the actions menu.

## Testing
- Enable TalkBack (Settings > Accessibility > TalkBack) and navigate your app.
- Verify: every element is reachable, descriptions are meaningful, order is logical.
- Test with the screen off (TalkBack Braille mode) for additional confidence.
- Use Accessibility Scanner app for automated checks.
