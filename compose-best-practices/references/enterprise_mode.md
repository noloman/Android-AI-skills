# Enterprise Mode (Optional Strict Mode)

Enterprise Mode is OPTIONAL and should only be applied when:
- tooling is detected in the project root (detekt.yml/detekt.yaml, lint.xml, ktlint/spotless config), OR
- the user explicitly requests "enterprise mode".

If tooling is not confirmed:
- provide tool-agnostic best practices
- do NOT assume specific lint/detekt rules

## When active
- Prefer fixing over suppressing.
- Suppressions must be minimal, scoped, and justified.
- Avoid file-wide suppressions unless unavoidable.
