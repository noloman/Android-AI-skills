
---
name: android-networking
description: Android networking — Retrofit, OkHttp, Ktor, caching, error handling, resilience.
user-invocable: true
---

# Android Networking

Cross-cutting skill — always activates alongside the project-type-specific skill.

## Hard Rules
- Use Retrofit (Android-only) or Ktor (KMP) as the HTTP client — not raw HttpURLConnection.
- Define API interfaces with suspend functions — no blocking calls.
- Handle all HTTP error codes explicitly — do not swallow non-2xx responses.
- Use OkHttp interceptors for cross-cutting concerns (auth, logging, headers).
- Never log request/response bodies in production — sensitive data exposure risk.
- Set connect, read, and write timeouts explicitly — do not rely on defaults.
- Use kotlinx.serialization or Moshi for JSON — not Gson (reflection-based, slower).
- All network calls must happen off the main thread.
- Use HTTPS for all endpoints — no cleartext traffic.
- Implement token refresh in OkHttp Authenticator — not in individual API calls.

## Core Patterns
- Single OkHttpClient instance shared across Retrofit services.
- Logging interceptor for debug builds only (HttpLoggingInterceptor.Level.BODY).
- Auth interceptor adds Bearer token; Authenticator handles 401 refresh.
- Wrap API responses in Result or sealed class for error propagation.
- Use @Headers for static headers, @Header for dynamic per-request headers.
- Repository layer transforms API DTOs to domain models.

## References
- references/retrofit_setup.md
- references/okhttp_interceptors.md
- references/error_handling.md
- references/caching.md
- references/ktor_multiplatform.md
- references/advanced_patterns.md
- references/testing.md
