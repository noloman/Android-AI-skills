# DataStore

## Preferences DataStore
- Replacement for SharedPreferences — coroutine and Flow-based.
- Create with preferencesDataStore(name = "settings") delegate.
- Read: dataStore.data.map { prefs -> prefs[KEY] }.
- Write: dataStore.edit { prefs -> prefs[KEY] = value }.
- Keys: stringPreferencesKey, intPreferencesKey, booleanPreferencesKey, etc.

## Proto DataStore
- Type-safe structured data — define schema with Protocol Buffers.
- Create .proto file in src/main/proto/.
- Implement Serializer<T> for read/write.
- Read/write are strongly typed — no string keys.
- Prefer Proto DataStore for complex settings or data with multiple fields.

## Migration from SharedPreferences
- Use SharedPreferencesMigration in DataStore builder.
- Migration runs once — old SharedPreferences deleted after migration.
- Handle migration failures — provide default values.
- Test migration with both old and new data formats.

## Best Practices
- Single DataStore instance per file — create at top level with delegate.
- Never create DataStore inside Activity/Fragment — use singleton pattern.
- Handle IOException in data.catch { } — file corruption is possible.
- Emit default value on error: .catch { emit(emptyPreferences()) }.
- DataStore writes are atomic — no partial writes.
- Do not use DataStore for large datasets — use Room instead.

## Thread Safety
- DataStore is thread-safe — concurrent reads and writes are safe.
- Writes are serialized — ordered by call sequence.
- Reads are non-blocking — observe via Flow.
- No need for synchronized blocks or mutexes.

## Multi-Process DataStore (1.1+)
- Use `MultiProcessDataStoreFactory` for DataStore shared across processes.
- Required when: app has multiple processes (e.g., foreground service in separate process).
- Regular DataStore may corrupt data when accessed from multiple processes.
- Configure: `MultiProcessDataStoreFactory.create(serializer, produceFile = { file })`.
- Same API as single-process DataStore — transparent to consumers.
- Slightly higher overhead than single-process — only use when needed.
