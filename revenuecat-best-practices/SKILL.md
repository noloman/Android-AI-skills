
---
name: revenuecat-best-practices
description: RevenueCat — subscriptions, entitlements, offerings, paywalls, testing, migration.
---

# RevenueCat Best Practices

Cross-cutting skill — always activates alongside the project-type-specific skill.

## Hard Rules
- Configure Purchases once in Application.onCreate() — single initialization.
- Use entitlements (not product IDs) to gate features — decouple store products from access.
- Always check entitlement status from CustomerInfo — never cache purchase state manually.
- Identify users with appUserID when they log in — anonymous IDs for logged-out users.
- Never call configure() more than once — use logIn/logOut for user switching.
- Use Offerings to manage products remotely — do not hardcode product IDs in the app.
- Handle all PurchasesError codes — not just success.
- Test with sandbox/test accounts on real devices — not emulators.
- Use Observer Mode when migrating from existing billing — avoids double-charging.
- Never store CustomerInfo persistently — always fetch fresh from RevenueCat SDK.

## Core Patterns
- Wrap Purchases in a repository with Flow-based API for reactive entitlement state.
- Use getOfferings() to fetch current product configuration — display from Offerings, not hardcoded.
- Check CustomerInfo.entitlements.active for feature gating.
- Listen to CustomerInfoUpdateListener for real-time subscription changes.
- Use logIn(appUserID) on authentication, logOut() on sign-out.
- Use RevenueCat Paywalls for server-configurable paywall UI.

## References
- references/sdk_setup.md
- references/offerings_products.md
- references/entitlements.md
- references/paywalls.md
- references/user_identity.md
- references/testing_debugging.md
