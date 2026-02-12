
---
name: android-accessibility-best-practices
description: Android accessibility — content descriptions, TalkBack, touch targets, contrast, Compose semantics.
user-invocable: true
---

# Android Accessibility Best Practices

Cross-cutting skill — always activates alongside the project-type-specific skill.

## Hard Rules
- Provide contentDescription on all interactive non-text elements.
- Set contentDescription = null on purely decorative images.
- Minimum touch target size: 48dp × 48dp.
- Meet WCAG AA contrast ratios: 4.5:1 for normal text, 3:1 for large text.
- Never convey information by color alone — add icons, patterns, or labels.
- Ensure logical TalkBack reading order matches visual layout.
- Apply correct semantics (Role, stateDescription) on custom composables.
- Time-based content must be pausable or extendable.
- All form fields must have associated labels.
- Use sp (not dp) for text sizes to respect user font scaling.

## Core Patterns
- Use Modifier.semantics {} to expose custom component meaning.
- Use mergeDescendants to group related elements for TalkBack.
- Test with TalkBack enabled on a real device.
- Run Accessibility Scanner for automated checks.
- Support dynamic font sizes — test at maximum font scale.
- Verify dark theme meets contrast requirements separately.

## References
- references/content_descriptions.md
- references/talkback_navigation.md
- references/touch_targets.md
- references/color_contrast.md
- references/compose_semantics.md
- references/automated_testing.md
