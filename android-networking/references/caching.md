# HTTP Caching

## OkHttp Cache
- Set up disk cache: OkHttpClient.Builder().cache(Cache(cacheDir, maxSize)).
- Default max size: 10-50 MB depending on app needs.
- Respects standard HTTP cache headers: Cache-Control, ETag, Last-Modified.
- Works automatically if server sends proper cache headers.

## Cache-Control
- Server: Cache-Control: max-age=3600 — cache for 1 hour.
- Client force-cache: CacheControl.FORCE_CACHE — use cache even if stale.
- Client force-network: CacheControl.FORCE_NETWORK — bypass cache.
- Use stale-while-revalidate for background refresh while showing cached data.

## Conditional Requests
- ETag: server returns ETag header, client sends If-None-Match on next request.
- 304 Not Modified: server confirms cache is still valid — no body transferred.
- Last-Modified / If-Modified-Since: time-based conditional requests.
- OkHttp handles conditional requests automatically when cache is configured.

## Application-Level Caching
- For APIs without cache headers, implement caching in the repository layer.
- Store responses in Room or DataStore with timestamps.
- Check cache freshness: if (now - cachedAt < maxAge) return cached.
- Pattern: emit(cachedData); val fresh = api.fetch(); save(fresh); emit(fresh).

## Cache Invalidation
- Invalidate on user actions (pull-to-refresh, data mutation).
- Invalidate on push notifications (server signals new data).
- Time-based expiry: re-fetch after configurable TTL.
- Never cache sensitive data (tokens, payment info) — or encrypt cache.
