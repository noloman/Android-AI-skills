# Automated Accessibility Testing

## Accessibility Testing Framework (ATF)
- Google's framework for automated accessibility checks.
- Integrated into Espresso and Compose testing.
- Checks: touch target size, contrast ratios, content descriptions, labeling.
- Add dependency: `com.google.android.apps.common.testing.accessibility.framework`.

## Espresso Integration
- Enable ATF checks globally: `AccessibilityChecks.enable()` in test setup.
- Checks run automatically on every Espresso `ViewAction`.
- Failures include: check name, severity, and suggested fix.
- Suppress specific checks only when false positive — document reason.

## Compose Testing
- Use `composeTestRule.onNode(matcher).assertHasClickAction()` for interactive elements.
- Check content descriptions: `assertContentDescriptionContains("description")`.
- Check semantics: `assert(hasAnyDescendant(isHeading()))` for structure.
- Dump semantics tree: `composeTestRule.onRoot().printToLog("SEMANTICS")`.

## Automated Checks
- **Touch target**: verify all clickable elements are ≥ 48dp.
- **Content description**: verify all images and icons have descriptions.
- **Contrast**: ATF checks contrast ratios against WCAG AA.
- **Labeling**: verify text fields have associated labels.
- **Traversal order**: verify logical reading order with `assertIsDisplayed()` in sequence.

## CI Integration
- Run accessibility tests as part of instrumented test suite.
- Fail CI on accessibility violations above WARNING severity.
- Track accessibility score over time — prevent regressions.
- Combine with Accessibility Scanner results for comprehensive coverage.

## Limitations
- Automated tests catch ~30% of accessibility issues — manual testing is still essential.
- TalkBack behavior testing requires manual verification.
- Dynamic content (animations, transitions) needs manual a11y review.
- Color-only information patterns are hard to detect automatically.
