# Firebase Auth

## Setup
- Add firebase-auth dependency via Firebase BoM.
- Use FirebaseAuth.getInstance() — singleton per FirebaseApp.
- Listen to auth state changes: addAuthStateListener or authStateFlow (coroutines).
- Handle configuration changes — auth state persists across Activity recreation.

## Sign-In Methods
- Email/password: createUserWithEmailAndPassword, signInWithEmailAndPassword.
- Google Sign-In: use Credential Manager + GoogleIdTokenCredential → signInWithCredential.
- Anonymous: signInAnonymously() for guest users, link to permanent account later.
- Phone: PhoneAuthProvider with SMS verification code.
- Multi-provider: link accounts with linkWithCredential.

## Token Management
- ID tokens expire after 1 hour — use getIdToken(forceRefresh) for fresh tokens.
- Pass ID token to your server for authenticated API calls.
- Server validates token with Firebase Admin SDK: verifyIdToken().
- currentUser can be null — always check before accessing user properties.
- Token refresh happens automatically, but getIdToken may fail if user is disabled/deleted.

## Account Management
- Email verification: sendEmailVerification() — check isEmailVerified.
- Password reset: sendPasswordResetEmail().
- Account deletion: currentUser.delete() — re-authenticate first if needed.
- Re-authentication: reauthenticateWithCredential() for sensitive operations.
- Update profile: updateProfile(UserProfileChangeRequest).

## Security
- Enable email enumeration protection in Firebase Console.
- Set password requirements in Firebase Console.
- Never store FirebaseUser references — always access via FirebaseAuth.currentUser.
- Handle FirebaseAuthException codes: ERROR_USER_NOT_FOUND, ERROR_WRONG_PASSWORD, etc.
