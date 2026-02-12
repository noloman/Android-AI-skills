# Digital Credentials API (Android 15+)

## Overview
- Android 15 introduces the Digital Credentials API for verifiable digital documents.
- Supports: mobile driver's licenses (mDL), digital IDs, age verification, insurance cards.
- Based on ISO 18013-5 (mDL) and W3C Verifiable Credentials standards.
- Stored in Google Wallet or OEM wallet apps.

## Use Cases
- **Age verification**: verify user is 18+ without revealing exact birthdate.
- **Identity verification**: KYC flows for financial services, healthcare.
- **Access control**: employee badges, student IDs for physical/digital access.
- **Ticketing**: event tickets with identity binding.

## Integration
- Use `CredentialManager` (same API as passkeys) with `DigitalCredentialOption`.
- Request specific credential type and claims needed.
- Response contains cryptographically signed credential data.
- Verify credential signature against issuer's public key on your server.

## Privacy by Design
- Selective disclosure: request only the claims you need (e.g., "over 21" not "date of birth").
- User consent: system prompts user to approve sharing specific attributes.
- No tracking: credentials don't enable cross-site/cross-app user tracking.
- Minimal data: always request the minimum set of claims needed for the use case.

## Limitations
- Android 15+ only — no backport available.
- Requires credential to be provisioned in a supported wallet app.
- Not widely adopted yet — plan for fallback verification methods.
- Issuer infrastructure needed — credentials must be issued by a trusted authority.
- Testing: use Android 15 emulator with test credentials from Google's sample app.
