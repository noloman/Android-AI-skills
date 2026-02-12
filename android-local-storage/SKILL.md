
---
name: android-local-storage
description: Local storage — Room, DataStore, offline-first architecture, caching, encryption.
user-invocable: true
---

# Android Local Storage

Cross-cutting skill — always activates alongside the project-type-specific skill.

## Hard Rules
- Use Room for structured relational data — not raw SQLite.
- Use DataStore (Preferences or Proto) for key-value data — not SharedPreferences.
- Export Room schemas (exportSchema = true) and test all migrations.
- Never perform database operations on the main thread.
- Use Flow or LiveData for reactive database queries — not one-shot reads for UI.
- Define a single source of truth (database) — network responses update the database, UI observes the database.
- Never store sensitive data (tokens, passwords) in Room or DataStore without encryption.
- Use transactions for multi-table write operations.
- Keep entities flat — avoid deeply nested objects in Room.
- Use TypeConverters sparingly — prefer normalized relational design.

## Core Patterns
- Repository pattern: database as the source of truth, network as the updater.
- Room DAOs return Flow<List<T>> for reactive UI updates.
- Use @Upsert for insert-or-update operations (Room 2.5+).
- DataStore with Proto for type-safe structured preferences.
- Implement cache expiry with timestamps — stale-while-revalidate pattern.
- Use database-backed pagination with RemoteMediator + Paging 3.

## References
- references/room_patterns.md
- references/datastore.md
- references/offline_first.md
- references/cache_strategies.md
- references/encryption.md
- references/migration_testing.md
