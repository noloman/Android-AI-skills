# Database Migration Testing

## MigrationTestHelper
- Use `MigrationTestHelper` from `androidx.room:room-testing` for migration tests.
- Creates database at old version, runs migration, validates schema at new version.
- Runs as instrumented tests — needs real database engine.

## Setup
```kotlin
@get:Rule
val helper = MigrationTestHelper(
    InstrumentationRegistry.getInstrumentation(),
    AppDatabase::class.java
)

@Test
fun migrate1To2() {
    // Create database at version 1
    helper.createDatabase("test-db", 1).apply {
        execSQL("INSERT INTO users (id, name) VALUES (1, 'Test')")
        close()
    }
    // Run migration and validate
    helper.runMigrationsAndValidate("test-db", 2, true, MIGRATION_1_2)
}
```

## Test All Paths
- Test every sequential migration: 1->2, 2->3, 3->4, etc.
- Test skip migrations: 1->3, 1->4 (if supporting direct upgrade paths).
- Test data preservation: insert data before migration, verify after.
- Test with real data patterns — empty tables, max-size rows, null columns.

## CI Schema Validation
- Export Room schemas: `ksp { arg("room.schemaLocation", "$projectDir/schemas") }`.
- Commit schema JSON files to version control — track changes per version.
- CI validates: schema files exist for current version, no uncommitted schema changes.
- Use `exportSchema = true` in `@Database` annotation — never set to false for production databases.

## Common Pitfalls
- `@AutoMigration` handles simple changes (add column, add table) — use it when possible.
- Manual migration SQL must be exact — wrong column type or constraint causes crash.
- `fallbackToDestructiveMigration()` deletes all data — never use for user data databases.
- Room validates schema on open — mismatches cause `IllegalStateException` at runtime.
- Test on minimum API level — SQLite version differences can cause migration failures.
