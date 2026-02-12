# One-Time Purchases

## Consumable Products
- Consumable: can be purchased multiple times (coins, credits, extra lives).
- After delivery, call consumeAsync(ConsumeParams) to allow re-purchase.
- Unconsumed purchases block re-purchase of the same product.
- Verify delivery on server before consuming — prevents losing purchase on failure.
- Handle consumption failure — retry or let the user trigger re-delivery.

## Non-Consumable Products
- Non-consumable: purchased once, permanent (premium unlock, ad removal).
- Acknowledge with acknowledgePurchase() — do not consume.
- Unacknowledged purchases are refunded after 3 days.
- Query with queryPurchasesAsync(INAPP) to check ownership.
- Handle across devices — use server-side record linked to user account.

## Purchase Flow
- Launch with launchBillingFlow() — same as subscriptions but type = INAPP.
- PurchasesUpdatedListener receives Purchase objects.
- Check purchaseState: PURCHASED (complete), PENDING (slow payment).
- For PURCHASED: verify server-side → deliver → acknowledge/consume.
- For PENDING: do not deliver yet — wait for PURCHASED state.

## Pending Purchases
- Enabled via enablePendingPurchases(PendingPurchasesParams) on BillingClient.
- Slow payment methods (cash, bank transfer) result in PENDING state.
- Query purchases periodically or on app resume to detect state change.
- Show "purchase pending" UI — do not grant entitlement until PURCHASED.
- Handle PENDING → PURCHASED transition in PurchasesUpdatedListener.
