# Server-Side Verification

## Why Server Verification
- Client-side purchase state can be spoofed — always verify on your server.
- Use Google Play Developer API (purchases.products.get / purchases.subscriptions.get).
- Server verifies: purchase token validity, order ID, product ID, purchase state.
- Only grant entitlements after successful server verification.

## Verification Flow
1. Client completes purchase → receives Purchase object with purchaseToken.
2. Client sends purchaseToken + productId to your server.
3. Server calls Google Play Developer API to verify.
4. Server grants entitlement and stores purchase record.
5. Server responds to client → client acknowledges/consumes.

## Google Play Developer API
- Use a service account with appropriate Play Console permissions.
- purchases.products.get: verify one-time purchases.
- purchases.subscriptions.get: verify subscription purchases.
- Response includes: orderId, purchaseState, acknowledgementState, expiryTimeMillis (subs).
- Cache verification results — don't re-verify on every app start.

## Real-Time Developer Notifications (RTDN)
- Set up Cloud Pub/Sub topic in Play Console for real-time purchase events.
- Events: SUBSCRIPTION_RENEWED, SUBSCRIPTION_CANCELED, SUBSCRIPTION_EXPIRED, etc.
- Process notifications idempotently — they can be delivered multiple times.
- Use RTDN to keep server state in sync without polling.
- Always re-verify via API on RTDN receipt — don't trust notification alone.

## Security
- Validate purchaseToken on server — don't accept client-reported state.
- Link purchases to authenticated user accounts.
- Detect duplicate tokens — prevent purchase token reuse attacks.
- Log all verification results for audit and debugging.
