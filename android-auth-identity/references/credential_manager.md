# Credential Manager

## Overview
- Credential Manager is the unified API for sign-in (replaces Smart Lock, FIDO2 APIs).
- Supports: passkeys (WebAuthn), passwords, federated sign-in (Google, etc.).
- Single API: getCredential() presents all available credentials.
- Available on API 28+ via Google Play Services, API 34+ natively.

## Passkeys (WebAuthn)
- Passkeys are FIDO2 credentials — phishing-resistant, no password needed.
- Create: createCredential(CreatePublicKeyCredentialRequest(requestJson)).
- Authenticate: getCredential(GetCredentialRequest(listOf(GetPublicKeyCredentialOption(requestJson)))).
- requestJson comes from your server (WebAuthn challenge).
- Passkeys sync across devices via Google Password Manager.

## Password Credentials
- GetPasswordOption() in GetCredentialRequest to offer saved passwords.
- CreatePasswordRequest(id, password) to save new passwords.
- Credential Manager auto-fills saved passwords.
- Encourage passkey adoption — offer passkey creation after password sign-in.

## Federated Sign-In
- Google Sign-In: GetGoogleIdOption with serverClientId.
- Returns GoogleIdTokenCredential — send ID token to your server.
- Configure in Google Cloud Console: OAuth 2.0 client ID.
- Filter by authorized accounts or allow any Google account.

## Implementation Pattern
- Call getCredential() on sign-in screen — shows bottom sheet with all options.
- Handle GetCredentialResponse — check credential type and extract data.
- Handle exceptions: NoCredentialException (no saved credentials), GetCredentialCancellationException (user dismissed).
- Call clearCredentialState() on logout — clears Credential Manager state.
