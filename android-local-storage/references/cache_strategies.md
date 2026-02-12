# Cache Strategies

## Time-Based Expiry
- Store cachedAt timestamp alongside cached data.
- Check freshness: if (now - cachedAt > maxAge) refresh from network.
- Different TTLs for different data: user profile (1 hour), feed (5 minutes), config (24 hours).
- Use stale-while-revalidate: show stale data immediately, refresh in background.

## LRU Cache
- In-memory LRU cache for frequently accessed data.
- Use LruCache from android.util or custom implementation.
- Size-based eviction — define max entries or max memory.
- Use as L1 cache (memory) backed by L2 cache (database).

## ETag / Conditional Requests
- Store ETag from server response alongside cached data.
- Send If-None-Match header on next request.
- 304 Not Modified: cache is still valid, no data transfer.
- Reduces bandwidth while keeping data fresh.

## Cache Invalidation
- User action: pull-to-refresh, data mutation, logout.
- Push notification: server signals data change via FCM.
- Time-based: automatic expiry after TTL.
- Event-based: invalidate related caches when a mutation occurs.
- Prefer explicit invalidation over time-based for user-facing data.

## Multi-Layer Cache
- L1: in-memory (fast, small, lost on process death).
- L2: database/disk (slower, persistent across process restarts).
- L3: network (slowest, always fresh).
- Read: check L1 → L2 → L3. Write: update all layers.
- Use for: image caching (Coil/Glide handle this), API response caching, computed results.
