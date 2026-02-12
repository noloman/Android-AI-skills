# Dispatchers

## Built-in Dispatchers
- Dispatchers.Main: UI thread only — use for UI updates, state emissions.
- Dispatchers.IO: blocking I/O (network, disk, database) — backed by ~64 threads.
- Dispatchers.Default: CPU-intensive work (sorting, parsing, serialization) — thread count = CPU cores.
- Dispatchers.Unconfined: avoid — runs in caller's thread until first suspension, then resumes in whatever thread.

## Switching
- withContext(Dispatchers.IO) { ... } — switch dispatcher for a block, return result.
- Never nest withContext with the same dispatcher — no-op overhead.
- flowOn(Dispatchers.IO) — changes upstream flow dispatcher.

## Injection
- Accept CoroutineDispatcher as constructor parameter.
- Provide via DI (Hilt @Qualifier annotations: @IoDispatcher, @DefaultDispatcher, @MainDispatcher).
- Never hardcode Dispatchers.Main in commonMain (KMP) — Main is Android-specific.
- In KMP shared code, inject all dispatchers.

## Advanced
- limitedParallelism(n): create a view limiting concurrent coroutines.
- Use limitedParallelism(1) for single-threaded access (replaces Mutex in some cases).
- IO.limitedParallelism(4) for rate-limiting external API calls.
- Default.limitedParallelism(2) for CPU-bound tasks that shouldn't starve others.
