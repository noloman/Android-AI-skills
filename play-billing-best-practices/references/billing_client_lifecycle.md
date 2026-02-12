# BillingClient Lifecycle

## Connection
- Create BillingClient with BillingClient.newBuilder(context).setListener(purchasesUpdatedListener).enablePendingPurchases().build().
- Call startConnection() in onResume() or when billing features are needed.
- Handle BillingClientStateListener.onBillingSetupFinished() — check responseCode == OK.
- Handle onBillingServiceDisconnected() — retry with exponential backoff.
- Connection can drop at any time — always check isReady before operations.

## Query Products
- Call queryProductDetailsAsync() with QueryProductDetailsParams.
- Build params with product IDs and type (INAPP or SUBS).
- Cache ProductDetails — avoid redundant network calls.
- Handle empty results gracefully — product may not be configured in Play Console.
- Map ProductDetails to your domain models for UI display.

## Launch Purchase Flow
- Call launchBillingFlow(activity, billingFlowParams) from an Activity context.
- Build BillingFlowParams with ProductDetails and offerToken (subscriptions).
- Returns BillingResult — check responseCode for immediate errors.
- Actual purchase result arrives in PurchasesUpdatedListener.
- Only one billing flow can be active at a time.

## Disconnect
- Call endConnection() when billing features are no longer needed.
- Typical pattern: connect in onResume, disconnect in onPause.
- For always-available billing, use a singleton wrapper with automatic reconnection.
- Do not hold BillingClient references beyond the Activity lifecycle.
