# SDK Setup

## Installation
- Add com.revenuecat.purchases:purchases dependency.
- Add purchases-ui for RevenueCat Paywalls (optional).
- Use Firebase BoM-style versioning — check RevenueCat docs for latest version.
- Minimum Android API: 21 (Lollipop).

## Configuration
- Call Purchases.configure(PurchasesConfiguration.Builder(context, apiKey).build()) in Application.onCreate().
- Use the Google Play API key from RevenueCat dashboard (not the Play Console key).
- Configure only once per app lifecycle — never re-configure.
- Set debugLogsEnabled = true in debug builds for troubleshooting.
- Use appUserID parameter for identified users: PurchasesConfiguration.Builder(context, apiKey).appUserID(userId).

## Initialization Timing
- Configure before any UI that shows products or checks entitlements.
- App Startup library or Application.onCreate() — earliest possible.
- Do not configure lazily — RevenueCat needs time to sync with backend.
- If user is already logged in, pass appUserID at configure time.

## Hilt Integration
- Provide Purchases instance via @Module @InstallIn(SingletonComponent::class).
- @Provides @Singleton fun providePurchases(): Purchases = Purchases.sharedInstance.
- Or wrap in a BillingRepository interface for testability.
- Inject BillingRepository into ViewModels for product/entitlement access.

## Observer Mode
- Enable when migrating from existing Play Billing integration.
- PurchasesConfiguration.Builder(context, apiKey).observerMode(true).
- RevenueCat tracks purchases without taking over billing — no double-charging.
- Transition to full mode after migration is validated.
- Observer Mode does not make purchases — only observes.

## SDK v8 Compatibility
- RevenueCat SDK v8 requires Kotlin 1.9+ and minimum Android API 21.
- Major API changes: `PurchasesConfiguration` builder replaces many legacy config methods.
- `Purchases.configure()` is now the only entry point — static convenience methods removed.
- Kotlin coroutines support: all SDK methods have suspend function variants.
- Migration from v7: update configure call, replace callback-based APIs with suspend functions or Flow.
- Check RevenueCat migration guide for breaking changes before upgrading.
