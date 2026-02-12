# Token Management

## Token Types
- Access token: short-lived (15-60 minutes), authorizes API requests.
- Refresh token: long-lived (days-months), used to obtain new access tokens.
- ID token (JWT): contains user identity claims, used for user info.
- Never use refresh tokens for API authorization — only for token renewal.

## Storage
- Store tokens in EncryptedSharedPreferences — not plain SharedPreferences.
- Never store tokens in: Room database, DataStore, files, or logs.
- Clear all tokens on logout.
- Handle storage errors gracefully — force re-authentication if token storage fails.

## Refresh Flow
- Implement in OkHttp Authenticator for transparent refresh.
- On 401: use refresh token to get new access token → retry original request.
- Synchronize refresh: multiple concurrent 401s should trigger only one refresh.
- If refresh fails (refresh token expired): clear tokens, navigate to login.
- Use mutex or synchronized block to prevent concurrent refresh requests.

## JWT Validation
- Validate ID tokens on your server — not just on the client.
- Check: issuer (iss), audience (aud), expiration (exp), signature.
- Client-side: only check expiration for UX purposes (show login screen).
- Never trust client-side JWT validation as the sole security measure.

## Security
- Rotate refresh tokens on each use (refresh token rotation).
- Detect token theft: if a used refresh token is reused, revoke all tokens.
- Set reasonable token lifetimes: access (15 min), refresh (7-30 days).
- Bind tokens to device if possible (device attestation).
- Handle token revocation from server (user changed password, admin action).
