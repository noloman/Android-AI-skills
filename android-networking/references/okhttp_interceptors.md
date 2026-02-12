# OkHttp Interceptors

## Interceptor Types
- Application interceptors: called once, see application-level request/response.
- Network interceptors: called for each network request (including redirects).
- Application interceptors for: auth, logging, headers, retry.
- Network interceptors for: caching, compression, request rewriting.

## Auth Interceptor
- Add Authorization header to every request.
- Read token from secure storage (EncryptedSharedPreferences).
- Skip auth for public endpoints (check request URL or custom annotation).
- Pattern: chain.proceed(request.newBuilder().addHeader("Authorization", "Bearer $token").build()).

## Authenticator
- Implement Authenticator interface for automatic 401 handling.
- Called when server returns 401 Unauthorized.
- Refresh the token, then retry the request with the new token.
- Return null to give up (propagate 401 to caller).
- Synchronize token refresh — multiple concurrent 401s should share one refresh.

## Logging Interceptor
- Use HttpLoggingInterceptor from okhttp3.logging.
- Levels: NONE, BASIC (method + URL + status), HEADERS, BODY.
- BODY level in debug builds only — logs full request/response content.
- Never use BODY in production — sensitive data exposure.
- Add as the last interceptor to see the final request.

## Custom Interceptors
- Rate limiting: delay requests if approaching API rate limit.
- Request ID: add unique X-Request-ID header for tracing.
- User-Agent: add app version and device info for analytics.
- Retry: implement retry with backoff for specific error codes (429, 503).
- Do not retry POST/PUT requests blindly — they may not be idempotent.
