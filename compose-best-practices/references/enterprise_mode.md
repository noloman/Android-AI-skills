# Enterprise Mode (Optional Strict Mode)

## Activation
Enterprise Mode is OPTIONAL and activates automatically when any of these files exist in the project root:
- `detekt.yml` / `detekt.yaml`
- `lint.xml`
- ktlint configuration (`.editorconfig` with ktlint rules, `ktlint.gradle.kts`)
- spotless configuration (`spotless.gradle.kts`)

The user can also explicitly request "enterprise mode".

## When Enterprise Mode Is NOT Active
- Do NOT assume lint/detekt/ktlint is used.
- Provide tool-agnostic best practices only.
- Do NOT suggest adding `@Suppress` annotations — there's nothing to suppress.
- Do NOT reference specific rule IDs (e.g., `MaxLineLength`, `MagicNumber`).

## When Enterprise Mode IS Active
- Treat new lint/detekt violations in touched code as **HIGH** severity.
- Prefer fixing issues over suppressing them.
- If suppression is necessary:
  - Scope it to the narrowest possible target (expression > function > file).
  - Add a justification comment explaining why suppression is needed.
  - Never use file-wide `@file:Suppress(...)` unless no alternative exists.

## How Enterprise Mode Changes Behavior
| Scenario | Without Enterprise Mode | With Enterprise Mode |
|---|---|---|
| New composable with long parameter list | Suggest extracting params to a data class | Flag as `LongParameterList` violation, suggest extraction |
| Hardcoded color value | Suggest using theme tokens | Flag as lint violation + suggest theme tokens |
| Unused parameter in composable | Suggest removing or prefixing with `_` | Flag as `UnusedParameter`, require removal |
| Complex conditional in composition | Suggest extracting to a function | Flag as `CyclomaticComplexity`, require extraction |
| Missing content description | Suggest adding one | Flag as accessibility lint error, treat as HIGH |

## Integration with CI
- When Enterprise Mode is active, assume violations block PRs.
- Suggest `baseline.xml` for existing violations during initial adoption.
- New code should always be clean — no adding to the baseline.
