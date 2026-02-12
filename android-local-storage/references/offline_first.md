# Offline-First Architecture

## Single Source of Truth
- Database (Room) is the single source of truth — UI always reads from database.
- Network responses update the database — never displayed directly to UI.
- Flow: API → Repository → Database → UI observes database.
- Benefits: offline access, consistent state, no stale UI.

## Repository Pattern
- Repository exposes Flow<List<T>> from Room DAO.
- Repository has a refresh() suspend function that fetches from network and updates database.
- UI calls refresh() on pull-to-refresh or initial load.
- Database Flow automatically re-emits when data changes.

## NetworkBoundResource Pattern
- Observe database (cache).
- If cache is stale or empty, fetch from network.
- Save network response to database.
- Re-emit updated data from database.
- Handle loading, success, and error states.

## Paging with RemoteMediator
- Use Paging 3 + RemoteMediator for paginated offline-first lists.
- RemoteMediator fetches pages from network, stores in Room.
- PagingSource reads from Room for UI.
- Room PagingSource auto-invalidates when data changes.
- Handle PREPEND, APPEND, and REFRESH load types.

## Conflict Resolution
- Last-write-wins: server timestamp determines which version to keep.
- Client-wins: local changes always override server data.
- Server-wins: server data always overrides local changes.
- Choose based on data type — user-generated content needs careful resolution.

## Sync Strategy
- Eager: sync immediately when network is available.
- Lazy: sync on demand (user opens screen, pull-to-refresh).
- Periodic: sync on schedule using WorkManager.
- Push-triggered: sync when FCM notification arrives.
