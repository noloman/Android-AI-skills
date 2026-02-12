# Compose UI Testing

## Setup
- Use createComposeRule() for pure Compose tests (no Activity).
- Use createAndroidComposeRule<Activity>() when Activity context is needed.
- Set content with rule.setContent { MyComposable() }.
- Tests run on the instrumented device/emulator.

## Finding Nodes
- onNodeWithText("label") — find by displayed text.
- onNodeWithTag("tag") — find by Modifier.testTag("tag").
- onNodeWithContentDescription("desc") — find by accessibility description.
- onAllNodesWithText("label") — find multiple matching nodes.
- Use Modifier.testTag for nodes without visible text or content description.

## Assertions
- assertIsDisplayed() — node is visible on screen.
- assertTextEquals("expected") — exact text match.
- assertIsEnabled() / assertIsNotEnabled().
- assertHasClickAction().
- assertExists() / assertDoesNotExist() — node presence in the tree.

## Actions
- performClick() — tap the node.
- performTextInput("text") — type into text fields.
- performScrollTo() — scroll until the node is visible.
- performTouchInput { swipeUp() } — gesture simulation.

## Best Practices
- Test all composable states: loading, content, error, empty.
- Isolate composables — test one composable per test, pass state as parameters.
- Use waitForIdle() or waitUntil {} for async content.
- Avoid testing internal state — assert on visible behavior only.
- Prefer testTag over text for stable selectors in multi-locale apps.

## Espresso-Compose Interop (Hybrid Apps)
- For apps mixing View-based UI and Compose, use `createAndroidComposeRule<Activity>()`.
- Access Espresso from Compose tests: regular Espresso `onView()` calls work alongside `onNode()`.
- Access Compose from Espresso tests: use `composeTestRule.onNodeWithText()` within Espresso test class.
- Synchronization: Compose idle is separate from Espresso idle — both must be idle for assertions.
- `composeTestRule.waitForIdle()` waits for Compose recomposition; Espresso's `onView` waits for View idle.
- For mixed screens: assert View parts with Espresso, Compose parts with ComposeTestRule.
