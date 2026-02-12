# Offerings & Products

## Offerings
- Offerings are server-side product configurations — change without app update.
- Fetch with Purchases.sharedInstance.getOfferingsWith({ offerings -> ... }).
- Current offering: offerings.current — the default offering for all users.
- Named offerings: offerings["premium_annual"] — for A/B testing or targeting.
- Always handle null/empty offerings — configuration might not be ready.

## Packages
- Each offering contains packages — a package wraps a store product with metadata.
- Package types: MONTHLY, ANNUAL, LIFETIME, SIX_MONTH, THREE_MONTH, TWO_MONTH, WEEKLY, CUSTOM.
- Access: offering.monthly, offering.annual, offering.lifetime.
- Display package price: package.product.price (localized PriceInfo).
- Use package identifiers in UI — not raw product IDs.

## Product Display
- Show localized prices from StoreProduct.price — never hardcode prices.
- Show subscription period from StoreProduct.period.
- Calculate price per month for annual plans: annualPrice / 12 for comparison.
- Show introductory offers: StoreProduct.introductoryPrice (free trial, intro pricing).
- Display savings: "Save X%" by comparing monthly vs annual.

## Making Purchases
- Call Purchases.sharedInstance.purchaseWith(PurchaseParams.Builder(activity, package).build(), onError, onSuccess).
- Pass the Package object from Offerings — not a raw product ID.
- Handle success: onSuccess receives StoreTransaction and CustomerInfo.
- Handle error: check PurchasesError.code for specific error types.
- Handle user cancellation: PurchasesErrorCode.PurchaseCancelledError.

## Remote Configuration
- Change offerings in RevenueCat dashboard — no app update needed.
- A/B test pricing by creating multiple offerings and targeting by audience.
- Add new products to existing offerings server-side.
- Remove discontinued products without breaking the app.
