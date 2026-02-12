# Color & Contrast

## WCAG AA Requirements
- Normal text (< 18sp or < 14sp bold): contrast ratio ≥ 4.5:1.
- Large text (≥ 18sp or ≥ 14sp bold): contrast ratio ≥ 3:1.
- Non-text elements (icons, borders, form fields): contrast ratio ≥ 3:1.
- WCAG AAA (optional, stricter): 7:1 for normal text, 4.5:1 for large text.

## Exceptions
- Disabled/inactive elements: no contrast requirement (but consider usability).
- Logos and decorative elements: no contrast requirement.
- Text within images: same contrast requirements as regular text.

## Color Independence
- Never use color alone to convey information (e.g., red=error, green=success).
- Add icons, patterns, underlines, or labels alongside color indicators.
- Error states: use error icon + red color + descriptive text.
- Charts/graphs: use patterns, labels, or shapes in addition to color.

## Dark Theme
- Verify contrast ratios for both light and dark themes separately.
- Dark theme surfaces use lighter text — ensure sufficient contrast.
- Surface color hierarchy matters: surface, surfaceVariant, surfaceContainer.
- Test dynamic theming (Material You) — user-generated colors may fail contrast.

## Tools
- Accessibility Scanner (Android): scans visible UI for contrast issues.
- WebAIM Contrast Checker: manual ratio calculation.
- Colour Contrast Analyser (desktop): eyedropper-based tool.
- Android Studio Layout Inspector: check rendered colors.

## WCAG 2.2 Updates
- **Non-text contrast (1.4.11)**: UI components and graphical objects need ≥ 3:1 contrast against adjacent colors.
- Applies to: form field borders, icon-only buttons, chart elements, custom controls.
- **Focus appearance (2.4.13 - AAA)**: focus indicator must have ≥ 3:1 contrast and sufficient size.
- Material3 default focus indicators generally meet this requirement.
- Audit custom focus indicators — ensure they're visible on all surface colors.
