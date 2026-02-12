
---
name: play-billing-best-practices
description: Play Billing — in-app purchases, subscriptions, server verification, testing.
user-invocable: true
---

# Play Billing Best Practices

Cross-cutting skill — always activates alongside the project-type-specific skill.

## Hard Rules
- Use Google Play Billing Library 7+ (com.android.billingclient:billing).
- Always verify purchases server-side — never trust client-side purchase state.
- Acknowledge all purchases within 3 days or they are refunded automatically.
- Consume consumable purchases after delivery — non-consumed purchases block re-purchase.
- Connect BillingClient in onResume, disconnect in onPause — match lifecycle.
- Handle all BillingResponseCode values — not just OK.
- Never hardcode product IDs as the sole source of truth — query from Play Console.
- Test with license testers on real devices, not emulators.
- Use PurchasesUpdatedListener for real-time updates, queryPurchasesAsync for restoration.
- Handle pending purchases (PENDING state) for slow payment methods.
- Support prepaid plans for subscriptions — not all users want auto-renewal.
- Implement User Choice Billing where required by regulation (alternative billing).

## Core Patterns
- Wrap BillingClient in a repository with Flow-based API.
- Retry connection with exponential backoff on SERVICE_DISCONNECTED.
- Use queryProductDetailsAsync before launchBillingFlow — cache results.
- Implement purchase restoration on every app start (queryPurchasesAsync).
- Use subscription replacement (SubscriptionUpdateParams) for plan changes.
- Log billing events for debugging — obfuscate order IDs in production logs.

## References
- references/billing_client_lifecycle.md
- references/subscriptions.md
- references/one_time_purchases.md
- references/server_verification.md
- references/testing_billing.md
