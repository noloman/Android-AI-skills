# Testing & Debugging

## Debug Logging
- Enable in debug builds: Purchases.logLevel = LogLevel.DEBUG.
- Logs show: configuration, offerings fetch, purchase flow, entitlement checks.
- Use logcat filter: "Purchases" tag for RevenueCat-specific logs.
- Disable debug logs in production — verbose output.

## Sandbox Testing
- Use Google Play license testers for sandbox purchases.
- Add test accounts in Play Console (Settings > License testing).
- Sandbox subscriptions have accelerated renewal (5-minute periods).
- Test on real device with signed build — sandbox doesn't work on emulator.
- Clear Play Store data if sandbox state gets stuck.

## RevenueCat Dashboard
- View customer timeline: purchases, renewals, cancellations per user.
- Search by appUserID or $RCAnonymousID.
- Verify entitlement status matches expected state.
- Check webhook delivery and server notifications.
- Use "Grant promotional entitlement" for testing premium features.

## Testing Scenarios
- Fresh install → purchase → verify entitlement → kill app → reopen → verify persisted.
- Purchase → cancel in Play subscriptions → wait for expiry → verify revoked.
- Purchase with account A → logout → login account B → verify no entitlement.
- Anonymous purchase → logIn → verify purchase transfers.
- Restore purchases: Purchases.sharedInstance.restorePurchasesWith().
- Offline purchase attempt → handle error → retry when online.

## Common Issues
- "Product not found": product not configured in Play Console or not linked in RevenueCat.
- "Receipt already in use": purchase associated with different RevenueCat user.
- Stale CustomerInfo: force refresh with getCustomerInfoWith(fetchPolicy = CacheFetchPolicy.FETCH_CURRENT).
- Offerings empty: check API key, product configuration, and Play Console setup.
- Sandbox not working: verify license tester email matches device Google account.

## Webhooks
- Configure server webhook URL in RevenueCat dashboard.
- Events: INITIAL_PURCHASE, RENEWAL, CANCELLATION, EXPIRATION, BILLING_ISSUE, etc.
- Process webhooks idempotently — they can be delivered multiple times.
- Use webhooks to sync subscription state with your backend.
- Verify webhook authenticity with the shared secret.
