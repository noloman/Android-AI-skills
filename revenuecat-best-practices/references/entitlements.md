# Entitlements

## Concept
- Entitlements represent access levels — "premium", "pro", "gold".
- Map store products to entitlements in RevenueCat dashboard.
- Multiple products can unlock the same entitlement (monthly, annual, lifetime all unlock "premium").
- Check entitlements, not product IDs, in your app — decouples billing from features.

## Checking Access
- Get current customer info: Purchases.sharedInstance.getCustomerInfoWith({ customerInfo -> ... }).
- Check active entitlement: customerInfo.entitlements["premium"]?.isActive == true.
- entitlements.active contains all currently active entitlements.
- entitlements.all contains all entitlements, including expired.
- isActive handles: active subscriptions, grace periods, free trials, promotional access.

## Reactive Updates
- Set CustomerInfoUpdateListener for real-time entitlement changes.
- Purchases.sharedInstance.updatedCustomerInfoListener = UpdatedCustomerInfoListener { customerInfo -> ... }.
- Wrap in a Flow for Compose integration: callbackFlow { updatedCustomerInfoListener = ... }.
- Update UI immediately when entitlement status changes.
- Listener fires on: purchase, renewal, cancellation, expiry, restore.

## Feature Gating Pattern
- Define features per entitlement: Map<String, List<Feature>>.
- Check before feature access: if (customerInfo.entitlements["premium"]?.isActive == true) { showFeature() } else { showPaywall() }.
- Keep gating logic in a single repository — don't scatter entitlement checks.
- Use sealed class for access state: Granted, NotGranted, Loading.

## Expiration & Grace Period
- expirationDate: when the entitlement expires (null for lifetime).
- periodType: NORMAL, TRIAL, INTRO.
- willRenew: whether the subscription will auto-renew.
- Grace period: isActive remains true during billing retry period.
- Show renewal status in settings — let users know their subscription state.
