# Google Sign-In

## Credential Manager Approach (Modern)
- Use GetGoogleIdOption in Credential Manager — replaces legacy GoogleSignInClient.
- Set serverClientId to your OAuth 2.0 Web client ID (from Google Cloud Console).
- Set filterByAuthorizedAccounts(true) for returning users, false for new sign-up.
- Returns GoogleIdTokenCredential with ID token and basic profile info.

## OAuth Configuration
- Create OAuth 2.0 client IDs in Google Cloud Console.
- Web client ID: used as serverClientId in Android app.
- Android client ID: configured with package name + SHA-1 fingerprint.
- Add both debug and release SHA-1 fingerprints.
- Update fingerprints when signing keys rotate.

## Sign-In Flow
1. Create GetGoogleIdOption with serverClientId.
2. Build GetCredentialRequest with the option.
3. Call credentialManager.getCredential(context, request).
4. Extract GoogleIdTokenCredential from response.
5. Send ID token to your server for verification.
6. Server verifies token and creates/updates user account.

## Server Verification
- Verify ID token using Google's tokeninfo endpoint or client library.
- Check: aud matches your client ID, iss is accounts.google.com, exp is not past.
- Extract: sub (unique Google user ID), email, name, picture.
- Use sub as the stable identifier — email can change.

## One Tap Sign-In
- Credential Manager shows One Tap UI automatically.
- Returns user selection without full-screen flow.
- Falls back to full sign-in if One Tap is dismissed.
- Rate-limited: Google may suppress One Tap if dismissed repeatedly.

## Sign-Out
- Call credentialManager.clearCredentialState(ClearCredentialStateRequest()).
- Also sign out from your backend (revoke tokens).
- Clear local user data and cached credentials.
