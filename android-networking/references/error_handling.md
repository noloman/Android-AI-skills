# Network Error Handling

## Error Types
- HttpException: non-2xx HTTP response (4xx, 5xx) — server returned an error.
- IOException: network failure (no connectivity, timeout, DNS failure).
- SerializationException: response body doesn't match expected format.
- CancellationException: coroutine was cancelled — do not catch.

## Result Wrapper
- Define a sealed class: sealed class NetworkResult<T> { data class Success, data class Error, data object Loading }.
- Map Retrofit responses to NetworkResult in the repository layer.
- UI layer observes NetworkResult — handles all states.
- Alternatively use kotlin.Result or Arrow's Either.

## Retry Strategy
- Retry on IOException (transient network failure).
- Retry on 429 (Too Many Requests) — respect Retry-After header.
- Retry on 503 (Service Unavailable) — server is temporarily down.
- Do not retry on 4xx (client errors) — request is wrong.
- Use exponential backoff with jitter: delay * 2^attempt + random jitter.

## Error Response Parsing
- Server may return structured error body: { "code": "INVALID_EMAIL", "message": "..." }.
- Parse error body from Response.errorBody() using the same serializer.
- Map server error codes to user-friendly messages.
- Never show raw server errors to users.

## Connectivity
- Check connectivity before requests: ConnectivityManager.getActiveNetwork().
- Use NetworkCallback for reactive connectivity monitoring.
- Show offline banner when network is unavailable.
- Queue requests for retry when connectivity returns (or use WorkManager).
