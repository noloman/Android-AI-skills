# Dependency Management

## Scope
- implementation: dependency is internal — not exposed to consumers.
- api: dependency is part of the module's public API — exposed to consumers.
- Default to implementation — use api only when types are in public signatures.
- compileOnly: needed at compile time but provided at runtime (e.g., annotation processors).

## Transitive Dependencies
- implementation scope hides transitive dependencies from consumers.
- api scope leaks transitive dependencies — increases coupling.
- Audit api-scoped dependencies regularly — minimize leakage.

## Dependency Analysis
- Use com.autonomousapps.dependency-analysis plugin.
- Detects: unused dependencies, misscoped dependencies (should be api/implementation), used-transitive (missing direct dependency).
- Run advice task to get actionable recommendations.
- Integrate into CI to prevent scope regression.

## Updates
- Use Renovate or Dependabot for automated version update PRs.
- Pin dependency versions in version catalog — no dynamic versions (e.g., 1.+).
- Review changelogs and migration guides before major version bumps.
- Run full test suite after dependency updates.

## Best Practices
- Keep dependency count minimal — fewer dependencies = less risk.
- Prefer official AndroidX libraries over third-party alternatives.
- Check library maintenance status before adopting — avoid abandoned projects.
- Use BOM (Bill of Materials) for library families (Compose BOM, Firebase BOM).
