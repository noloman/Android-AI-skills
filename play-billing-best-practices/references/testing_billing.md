# Testing Billing

## License Testers
- Add Gmail accounts as license testers in Play Console (Settings > License testing).
- License testers can make purchases without being charged.
- Subscription renewals are accelerated (5-minute periods instead of monthly).
- Test on real devices — billing does not work on emulators.
- Test with signed release builds uploaded to Play Console (internal testing track).

## Test Tracks
- Internal testing: up to 100 testers, no review required.
- Closed testing: invite-only, Play Console review may apply.
- Open testing: public access, review required.
- Use internal testing track for rapid billing iteration.
- Promote builds: internal → closed → open → production.

## Testing Scenarios
- Happy path: purchase → verify → acknowledge → entitlement granted.
- Cancellation: purchase → cancel in Play subscriptions → verify revocation.
- Pending purchases: test with slow payment method simulation.
- Restore: uninstall → reinstall → queryPurchasesAsync → entitlements restored.
- Network failure: purchase during offline → handle when connectivity returns.
- Upgrade/downgrade: switch between subscription plans.

## Static Responses
- Use reserved product IDs for basic flow testing: android.test.purchased, android.test.canceled, android.test.item_unavailable.
- Static responses don't go through server verification — limited to client flow testing.
- Always test with license testers for full end-to-end verification.

## Debugging
- Enable BillingClient logging: adb shell setprop log.tag.BillingClient VERBOSE.
- Check Play Store app version — billing requires recent Play Store.
- Verify google-services.json matches the build variant.
- Clear Play Store cache/data if billing flow gets stuck.

## Play Console Test Management
- Manage test purchases in Play Console > Order Management.
- Cancel, refund, or void test purchases directly from console.
- Clear purchase history for license testers when testing re-purchase flows.
- Test subscription renewal: license tester subscriptions renew every 5 minutes.
- Test grace period and account hold with shortened timelines for license testers.
