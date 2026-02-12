# Room Patterns

## Database Setup
- Annotate with @Database(entities = [...], version = N, exportSchema = true).
- Use singleton pattern: companion object with @Volatile instance + synchronized.
- Or provide via Hilt @Singleton @Provides.
- Add fallbackToDestructiveMigration() only for cache databases — never for user data.
- Configure WAL mode (default on API 16+) for better concurrent read/write.

## Entities
- @Entity with @PrimaryKey — prefer autoGenerate = true for local IDs.
- Use @ColumnInfo for custom column names.
- @Embedded for flattening nested objects into the same table.
- @TypeConverter for complex types (Date, Enum, List) — register in @Database.
- Keep entities flat — deeply nested objects should be separate entities with relations.

## DAOs
- Return Flow<List<T>> for reactive queries — Room re-emits on table changes.
- Use suspend for write operations (insert, update, delete).
- @Upsert (Room 2.5+) for insert-or-update in one operation.
- @Transaction for multi-table operations.
- @RawQuery for dynamic queries — use sparingly, prefer type-safe DAO methods.

## Relations
- @Relation for one-to-many and many-to-many relationships.
- Use intermediary data classes with @Embedded parent + @Relation children.
- @Junction for many-to-many with a junction table.
- Always use @Transaction on queries with @Relation — ensures consistency.

## Migrations
- Provide Migration(oldVersion, newVersion) with SQL statements.
- Test every migration path with MigrationTestHelper.
- Use @AutoMigration for simple changes (add column, add table).
- Never use fallbackToDestructiveMigration for databases with user data.

## Room 2.6+ Features
- **Multi-map return types**: `@Query("SELECT * FROM users JOIN orders") fun getUserOrders(): Flow<Map<User, List<Order>>>`.
- **Improved KSP support**: faster builds, better error messages, full feature parity with KAPT.
- **Value classes**: Room supports Kotlin value classes as column types.
- **Paging 3 integration**: `@Query("SELECT * FROM items") fun pagingSource(): PagingSource<Int, Item>`.

## Full-Text Search (FTS)
- `@Fts4` annotation on entity for full-text search support.
- Use `MATCH` queries: `@Query("SELECT * FROM items_fts WHERE items_fts MATCH :query")`.
- FTS4 is recommended over FTS3 — better performance, more features.
- FTS5 available on API 24+ — use for advanced ranking and snippet support.
- Keep FTS table synced with main table using triggers or rebuild.
