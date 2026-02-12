# Room Migration Testing

## Schema Export
- Set exportSchema = true in @Database annotation.
- Configure schema export directory in build.gradle.kts: room { schemaDirectory("$projectDir/schemas") }.
- Schema JSON files are generated per database version — check into VCS.
- Add schema directory to androidTest source set assets.

## MigrationTestHelper
- Use MigrationTestHelper from room-testing artifact.
- Create helper with the instrumentation and database class.
- runMigrationsAndValidate(dbName, targetVersion, validateDroppedTables, migrations).
- Helper creates the database at the old version, then runs migration to validate.

## Auto-Migration
- Room auto-migration handles simple schema changes (add column, add table).
- Annotate with @AutoMigration(from = 1, to = 2).
- Use @AutoMigration spec class for column renames or deletes.
- Always test auto-migrations — they can fail on complex schema changes.

## Manual Migration
- Write Migration(fromVersion, toVersion) with SQL ALTER/CREATE statements.
- Test data integrity: insert data at old version, migrate, verify data at new version.
- Handle NOT NULL columns: add with default value, then update existing rows.
- Test both fresh install (latest version) and upgrade (each migration path).

## Best Practices
- Test every migration path: 1→2, 2→3, and 1→3 (sequential).
- Verify data integrity after migration — not just schema validity.
- Keep migration tests as instrumented tests (require SQLite).
- Use fallbackToDestructiveMigration() only for expendable caches, never for user data.
