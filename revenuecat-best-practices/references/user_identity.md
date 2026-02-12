# User Identity

## Anonymous Users
- By default, RevenueCat creates an anonymous $RCAnonymousID.
- Purchases are tracked against this anonymous ID.
- Anonymous IDs persist across app sessions but not across reinstalls.
- Use for apps without authentication or before user logs in.

## Identified Users
- Call Purchases.sharedInstance.logIn(appUserID) when user authenticates.
- appUserID should be your backend's stable user identifier.
- logIn merges anonymous purchases with the identified account.
- If the anonymous ID has purchases, they transfer to the identified account.
- If the identified account already exists with purchases, RevenueCat merges.

## User Switching
- On logout: Purchases.sharedInstance.logOut() — reverts to new anonymous ID.
- On login with different account: logIn(newUserID) — switches user context.
- Never call configure() again to switch users — use logIn/logOut.
- Handle logIn callback: (customerInfo, created) — created is true for new RevenueCat users.

## Merge Behavior
- New identified user + anonymous with purchases: purchases transfer to identified.
- Existing identified user + anonymous with purchases: anonymous purchases transfer.
- Two identified users: no automatic merge — handled by your backend.
- Configure transfer behavior in RevenueCat dashboard (transfer, keep, share).

## Best Practices
- Use stable, non-guessable user IDs — not email addresses.
- Call logIn as early as possible after authentication.
- Handle logIn errors — user may be offline.
- Do not use device-specific IDs (Android ID, IMEI) as appUserID.
- Test: create account, purchase, logout, login with different account, verify entitlements.
