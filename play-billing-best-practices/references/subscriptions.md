# Subscriptions

## Offer Structure
- Base plan: defines billing period (monthly, annually) and pricing.
- Offers: free trial, introductory price, developer-determined offers.
- Each offer has an offerToken — pass to BillingFlowParams.
- A single subscription product can have multiple base plans and offers.
- Use ProductDetails.subscriptionOfferDetails to enumerate available offers.

## Plan Changes
- Upgrade/downgrade with SubscriptionUpdateParams in BillingFlowParams.
- Set replacement mode: CHARGE_PRORATED_PRICE, CHARGE_FULL_PRICE, WITHOUT_PRORATION, DEFERRED.
- Pass the old purchase token to link the subscription replacement.
- Server receives SUBSCRIPTION_REPLACED notification via RTDN.
- Test all replacement modes — proration behavior varies.

## Grace Period & Account Hold
- Grace period: subscription billing fails, user retains access while Google retries.
- Account hold: grace period expires, access should be revoked, subscription is suspended.
- Check subscription state via Google Play Developer API server-side.
- Show in-app messaging for payment issues — deep link to Play subscription management.
- Re-grant access immediately when payment succeeds.

## Cancellation
- User can cancel anytime — access continues until period end.
- Check expiryTimeMillis from server-side API for actual end date.
- Offer win-back (pause, downgrade) before cancellation completes.
- Handle SUBSCRIPTION_CANCELED RTDN on your server.
- Never revoke access immediately on cancellation — honor paid period.
