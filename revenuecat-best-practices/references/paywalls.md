# RevenueCat Paywalls

## Overview
- Server-configurable paywall UI — change design without app update.
- Use purchases-ui dependency for pre-built paywall composables.
- Configure paywall templates and content in RevenueCat dashboard.
- Supports A/B testing different paywall designs.

## Compose Integration
- PaywallDialog(PaywallDialogOptions.Builder().build()) for modal paywall.
- Paywall(PaywallOptions.Builder().build()) for inline paywall composable.
- PaywallFooter for a compact footer-style paywall.
- Set onDismiss, onError, onPurchaseCompleted callbacks.
- Paywall automatically displays current offering's products.

## Customization
- Select template in RevenueCat dashboard — multiple pre-built layouts.
- Customize: colors, text, images, product ordering, CTA text.
- Localization: configure per-locale text in dashboard.
- Variable substitution: {{ price }}, {{ sub_period }}, {{ intro_duration }} in templates.
- Preview in RevenueCat dashboard before publishing.

## Custom Paywalls
- If pre-built templates don't fit, build custom paywall using Offerings data.
- Fetch offerings → display products → call purchaseWith on selection.
- Use RevenueCat's product metadata (price, period, intro offer) for display.
- Combine custom UI with RevenueCat purchase logic.
- Track paywall impressions and conversions for analytics.

## Best Practices
- Show paywall at natural conversion points — not immediately on launch.
- Always include a restore purchases button (required by App Store, good practice for Play).
- Handle loading state while offerings load — show skeleton or spinner.
- Test paywall on multiple screen sizes and locales.
- Use A/B testing to optimize conversion rates.
- Respect user dismissal — don't show paywall again immediately.

## Customer Center
- RevenueCat Customer Center provides pre-built subscription management UI.
- Includes: current subscription status, plan details, cancel/manage links, restore purchases.
- Reduces support tickets — users can self-serve subscription management.
- Configure in RevenueCat dashboard: customize appearance and available actions.
- Integration: `CustomerCenter(CustomerCenterOptions.Builder().build())` composable.
- Shows: active subscriptions, billing dates, management actions (cancel, change plan).
- Fallback: deep links to Google Play subscription management for unsupported actions.
