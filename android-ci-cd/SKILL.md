
---
name: android-ci-cd
description: Android CI/CD — GitHub Actions, Fastlane, signing, Play Store deployment, build optimization.
user-invocable: true
---

# Android CI/CD

Cross-cutting skill — always activates alongside the project-type-specific skill.

## Hard Rules
- Never store signing keys or passwords in the repository — use CI secrets.
- Run unit tests on every pull request — block merge on failure.
- Build release AAB in CI — not on developer machines.
- Upload mapping.txt and native symbols with every release build.
- Use Gradle build cache and configuration cache in CI.
- Pin all CI action versions to SHA hashes — not tags (supply chain security).
- Separate CI stages: lint → unit test → build → instrumented test → deploy.
- Never skip CI checks for hotfixes — no --no-verify equivalent.
- Cache Gradle dependencies and build outputs between runs.
- Use Gradle Managed Devices or Firebase Test Lab for instrumented tests in CI.

## Core Patterns
- GitHub Actions with matrix strategy for testing on multiple API levels.
- Fastlane for automated screenshots, metadata management, and deployment.
- Decode signing keystore from base64 CI secret at build time.
- Use semantic-release or Gradle Play Publisher for automated releases.
- Run lint checks (detekt, ktlint, Android Lint) as CI gates.
- Separate pipelines: PR validation (fast) vs release (thorough).
- Use gradle/actions/setup-gradle instead of manual Gradle caching — handles cache, wrapper, and daemon automatically.

## References
- references/github_actions.md
- references/fastlane.md
- references/signing_ci.md
- references/play_store_deployment.md
- references/build_optimization.md
